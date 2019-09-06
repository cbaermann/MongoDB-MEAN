const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HelloMongoose', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    email: String, 
    state: String,
    hobby: String,
})
const User = mongoose.model('User', UserSchema);

app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (request, response) => {
    User.find()
        .then(datav=> response.render("index", {users: data}))
        .catch(err => response.json(err));
    response.render("index");
});

app.post('/result', (request, response)=> {
    const user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;
    user.state = req.body.state;
    user.hobby = req.body.hobby;
    user.save()
        .then(newUserData => console.log('user created: ', newUserData))
        .catch(err => console.log(err));
    response.redirect("/");
})

app.get('/result', (request, response)=> {
    response.render("results", {results:request.session.results});
})








app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));