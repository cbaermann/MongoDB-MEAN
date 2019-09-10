const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/FoxDashboard', {useNewUrlParser: true});

const PeopleSchema = new mongoose.Schema({
    name: {type: String, required: [true, "you must enter a name"], minlength: 2},
    age: {type: Number, required: true, minlength: 1},
}, {timestamps: true})

moduel.exports = mongoose.model("people", PeopleSchema)