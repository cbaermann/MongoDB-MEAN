const home = require("../controllers/home");

module.exports = function(app){
    app.get("/", (req, res)=>{
        home.index(req, res);
    });

    app.get("/new/:name", (req, res)=>{
        home.addPerson(req, res);
    });

    app.get("/remove/:name", (req, res)=>{
        home.removePerson(req, res);
    });

    app.get("/:name", (req, res)=>{
        home.displayPerson(req, res);
    });
}