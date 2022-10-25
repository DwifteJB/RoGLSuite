const LoggingSettings = require('../../setup.json').Logging;
const fs = require("fs")

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function getDateYearMonthDay(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-'))
}
function formatDate(date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-') +
        '-' +
        [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
        ].join('-')
    );
}

class Logger {
    constructor() {
        this.Time = getDateYearMonthDay(new Date())
        this.SetupLogFolder = LoggingSettings.Local.Settings.LogDirectory
        if (LoggingSettings.Local.Settings.Logins == true || LoggingSettings.Local.Settings.PositionUpdates == true) {

            if (!fs.existsSync(this.SetupLogFolder)) {
                fs.mkdirSync(this.SetupLogFolder)
            } 
            if (!fs.existsSync(this.SetupLogFolder + `/${this.Time}`)) {
                fs.mkdirSync(this.SetupLogFolder + `/${this.Time}`)
            }
            this.LogFolder = this.SetupLogFolder + `/${this.Time}`

            if (LoggingSettings.Local.Settings.Logins == true) {
                if (!fs.existsSync(this.LogFolder + '/Logins.json')) {
                    fs.writeFileSync( this.LogFolder + '/Logins.json', "{}")
                }
                this.LoginLog = this.LogFolder + '/Logins.json'
            }
            if (LoggingSettings.Local.Settings.PositionUpdates == true) {
                if (!fs.existsSync(this.LogFolder + '/Positions.json')) {
                    fs.writeFileSync( this.LogFolder + '/Positions.json', "{}")
                }
                this.PositionLog = this.LogFolder + '/Positions.json'
            }

        }
    }
    Login(data) {
        if (this.LoginLog) {
            const LoginLog = fs.readFileSync(this.LoginLog)
            const LoginLogJSON = JSON.parse(LoginLog)
            LoginLogJSON[formatDate(new Date())] = {
                "Username": data.username,
                "Discriminator": data.discriminator,
                "ID": data.id,
                "IP": data.IP
            }
            fs.writeFileSync(this.LoginLog, JSON.stringify(LoginLogJSON,null,4))
        }
    }
    PositionUpdate(data) {
        if (this.PositionLog) {
            const PositionLog = fs.readFileSync(this.PositionLog)
            const PositionLogJSON = JSON.parse(PositionLog)
            PositionLogJSON[formatDate(new Date())] = data
            fs.writeFileSync(this.PositionLog, JSON.stringify(PositionLogJSON,null,4))
        }
    }
}
module.exports = {Logger}