const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("express-flash");

const app = express();

mongoose.connect("mongodb://localhost/1955", {useNewUrlParser: true});

app.use(session({
    secret: "somesortofsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(express.json());
app.use(express.static(__dirname + "/client/static"));
app.use(flash());
app.set("view engine", "ejs");
app.set("views", __dirname + "/client/views");

require("./server/config/routes.js")(app);

const port = 8000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));