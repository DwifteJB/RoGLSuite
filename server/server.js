function GetLastKey(Obj) { 
    var val = Object.keys(Obj)[Object.keys(Obj).length-1]
    var key = Obj[Object.keys(Obj)[Object.keys(Obj).length-1]]
   return {key,val}
} 

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const Setup = require("../setup.json")
const axios = require("axios")
const { URLSearchParams } = require('url')

const fs = require("fs")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.text());

app.use(cors())
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!"});
});
app.listen(5000,()=> {
    console.log("Server is running on port 5000");
})

app.get("/api/discord", async (req, res) => {
    console.log(req.query)
    const params = new URLSearchParams();

    params.append('client_id', Setup.DiscordLogin.ClientID);
    params.append('client_secret', Setup.DiscordLogin.ClientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', req.query.code);
    params.append('redirect_uri', "http://31.51.20.136:5000/api/discord");
    try{
        const response = await axios.post('https://discord.com/api/oauth2/token',params)
        const { access_token,token_type}=response.data;
        const userDataResponse=await axios.get('https://discord.com/api/users/@me',{
            headers:{
                authorization: `${token_type} ${access_token}`
            }
        })
        console.log(userDataResponse.data)
    }catch(error){
        console.log('Error',error)
        return res.send('Some error occurred! ')
    }
    res.redirect("../App")
});
app.post("/api/SendPlayerPositions", (req, res) => {
    const Body = req.body;
    console.log(Body.Key)


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
                    "UserId": "UserId",
                }
            }

        }
    */
    console.log(Setup.Server_Key)
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
        fs.writeFileSync("./src/Positions.json", JSON.stringify(PositionsJSON,null,4));
        res.json({message: "Success"});
        return;
    }
    res.json({message: "Failed"});
    return;

})