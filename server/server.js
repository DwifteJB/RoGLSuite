function GetLastKey(Obj) { 
    var val = Object.keys(Obj)[Object.keys(Obj).length-1]
    var key = Obj[Object.keys(Obj)[Object.keys(Obj).length-1]]
   return {key,val}
} 
const DiscordWH = require("./lib/DiscordWebhook.js")
const LL = require("./lib/LocalLogging.js")
const Logger = new LL.Logger()

const path = require("path");

const cookie = require('cookie')
const {Server} = require("socket.io")
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const Setup = require("../setup.json")
const axios = require("axios")
const { URLSearchParams } = require('url')
const LoggedInUsers = {}

const fs = require("fs")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(cors())
app.use(express.static('build'));

const server = app.listen(80,()=> {
    console.log(`RoGL Suite is running! Created by DwifteJB\n\nServer is hosted at: ${Setup.SiteURL}`)
})

const io = new Server(server);

app.post("/api/discord/getDetails", (req, res) => {
    console.log("holy shit lois, im coming.")
    console.log(LoggedInUsers)
    console.log(req.cookies)
    const UserData = LoggedInUsers[req.cookies["_ROGL_ACCESS"]]
    console.log(UserData)
    if (UserData) {

        const Parsed = {
            "ID": UserData.id,
            "Username": UserData.username,
            "Discriminator": UserData.discriminator,
            "Avatar": UserData.avatar,
        }
        console.log(Parsed)
        res.json(Parsed)
    } else {
        res.json({error: 1})
    }
})
app.get("/api/discord", async (req, res) => {
    let ip = (req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();

    const params = new URLSearchParams();

    params.append('client_id', Setup.DiscordOAuth.ClientID);
    params.append('client_secret', Setup.DiscordOAuth.ClientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', req.query.code);
    params.append('redirect_uri', Setup.SiteURL + "/api/discord");
    
    try{
        const response = await axios.post('https://discord.com/api/oauth2/token',params)
        const UserData = await axios.get('https://discord.com/api/users/@me',{
            headers:{
                authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        })
        UserData.data.IP = ip
        Logger.Login(UserData.data)
        DiscordWH.SendLogin(UserData.data)

        res.cookie("_ROGL_ACCESS",req.query.code,{ maxAge: 900000, httpOnly: true })
        LoggedInUsers[req.query.code] = UserData.data

    }catch(error){
        return res.send("some error seemed to occur, go back and try again")
    }
    res.redirect(Setup.SiteURL + "/app")
});
app.post("/api/SendPlayerPositions", (req, res) => {
    const Body = req.body;
    /*
        Example Body:
        {
            "Key": "whatKey",
            "Players": {
                "Player": {
                    "Position": {
                        "X": 0,
                        "Y": 0,
                        "Z": 0
                    },
                    "Rotation": {
                        "X": 0,
                        "Y": 0,
                        "Z": 0
                    },
                    "PlayerName": "aaa",
                }
            }

        }
    */

    if (Body.Key == Setup.Server_Key) {
        const timeSent = Date.now();
        // key is correct. adding data :)
        const Positions = fs.readFileSync("./src/Positions.json") ;
        const PositionsJSON = JSON.parse(Positions);
        const Robs = PositionsJSON[321313211]
        console.log(GetLastKey(Robs))
        for (var PlayerID in Body.Players) {
            var PlayerData = Body.Players[PlayerID];
            console.log(PlayerID)
            console.log(PlayerData)
            if (!PositionsJSON[PlayerID]) {
                PositionsJSON[PlayerID] = {}
            }
            PositionsJSON[PlayerID][timeSent] = PlayerData;
        }
        DiscordWH.SendPosition(Body)
        Logger.PositionUpdate(Body)
        fs.writeFileSync("./src/Positions.json", JSON.stringify(PositionsJSON,null,4));
        res.json({message: "Success"});
        return;
    }
    res.json({message: "Failed"});
    return;

})
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));



// Socket Stuff

io.on("connection", (socket) => {
    console.log("New Connection from " + socket.id)
    socket.emit('connection', null);
    console.log(socket.request.headers.cookie)
    console.log(cookie.parse(socket.request.headers.cookie))
    socket.on("GetPlayerInfo", (data) => {
        const Cookie = socket.request.headers.cookie["_ROGL_ACCESS"]
        const Search = data.Search
        const SearchParam = data.SearchParams // ID or Username

        const UserData = LoggedInUsers[Cookie]
        if (UserData) {
            if (Search == "ID") {
                socket.emit("test")
            }
        } else {
            socket.emit("SignOut", true)
        }
    })
    socket.on("disconnect", (reason) => {
        console.log("A user disconnected")
    })
})

