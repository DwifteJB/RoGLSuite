const Setup = require("../setup.json")
const bodyParser = require('body-parser');
const fs = require("fs")
const express = require("express");
const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors())
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!"});
});
app.listen(5000,()=> {
    console.log("Server is running on port 5000");
})
function GetLastKey(Obj) { 
    var val = Object.keys(Obj)[Object.keys(Obj).length-1]
    var key = Obj[Object.keys(Obj)[Object.keys(Obj).length-1]]
   return {key,val}
} 
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