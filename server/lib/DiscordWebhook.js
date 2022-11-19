const fetch = require('node-fetch');
const DiscordSettings = require("../setup.json").Logging.Discord
const Permissions = require("../Permissions.json")
function SendLogin(data) {
    if (DiscordSettings.Settings.Logins == true) {
        let IP = "Not Shown"
        let Permission = "Denied"
        if (Permissions.Users[data.id]) {
            Permission = Permissions.Users[data.id]
        }
        if (DiscordSettings.ShowIPAddress == true) {
            IP = data.IP
        }
        const embed = {
            "username": "RoGL Suite",
            "content": null,
            "embeds": [
              {
                "title": "New SignIn",
                "color": 11923696,
                "fields": [
                  {
                    "name": "User",
                    "value": `${data.username}#${data.discriminator}`,
                    "inline": true
                  },
                  {
                    "name": "Discord ID",
                    "value": data.id
                  },
                  {
                    "name": "IP Address",
                    "value": IP,
                  },
                  {
                    "name": "Permission",
                    "value": Permission,
                  },
                ],
                "footer": {
                  "text": "RoGL Suite"
                },
                "thumbnail": {
                  "url": `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
                }
              }
            ],
            "attachments": []
        }
        fetch(DiscordSettings.WebhookURL, {
            "method":"POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(embed)
       
        })
    }
 
}
async function SendPosition(data) {
  let PlrList = []
  let count = 0
  for (var playerID in data.Players) {
    PlrList.push(data.Players[playerID].PlayerName)
    count++
  }
  const embed = {
    "username": "RoGL Suite",
    "content": null,
    "embeds": [
      {
        "title": "Positions Updated",
        "description": "Players Updated: " + PlrList.join(", "),
        "color": 7070758,
        "fields": [
          {
            "name": "Amount of Players",
            "value": count,
            "inline": true
          }
        ],
        "footer": {
          "text": "RoGL Suite"
        }
      }
    ],
    "attachments": []
  }

  fetch(DiscordSettings.WebhookURL, {
    "method":"POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(embed)
  })

}
module.exports = {
    SendLogin, SendPosition
}