/*
      INIT
*/

// PRIV KEYS

const express = require('express')

const app = express()
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// express config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set("views", path.join(__dirname, "src/views"))
app.set('view engine', 'hbs');
app.use(cors());
app.use('/src', express.static('src/web'))
/*
      START SERVER
*/
app.listen(8080, () => {
  console.log(`Stranded is running on localhost:8080 !`)
})
app.get("/", (req, res) => {
    res.render("index")
})