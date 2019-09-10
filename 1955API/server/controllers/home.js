const mongoose = require("mongoose");
const Person = require("../models/person");

module.exports = {
    index: (req, res)=>{
        Person.find()
            .then((person)=>{
                return res.json(person);
            });
    },

    addPerson: (req, res)=>{
        let person = new Person();
        person.name = req.params.name;
        person.save()
            .then((newPerson)=>{
                return res.redirect("/");
            });
    },

    removePerson: (req, res)=>{
        Person.remove({name: req.params.name})
            .then(()=>{
                return res.redirect("/");
            });
    },

    displayPerson: (req, res)=>{
        Person.findOne({name: req.params.name})
            .then((person)=>{
                return res.json(person);
            });
    }
}