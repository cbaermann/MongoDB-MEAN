const express = require("express");
const app = express();
const session = require('express-session');
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FoxDashboard', {useNewUrlParser: true});
const FoxSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    size: {type: String, required: true, minlength: 2},
    color: {type: String, required: true, minlength: 1},
    disposition: {type: String, required: true, minlength: 1},
    cuteness: {type: Number, required: true, minlength: 1},
},{timestamps: true});
const Fox = mongoose.model("Fox", FoxSchema);


app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (request, response) => {
    Fox.find()
        .then((foxes) => {
            return response.render("index", {foxes: foxes});
        })
        .catch((error)=> {
            console.log(error);
            return response.render("Index")
        });
   
});

app.get('/foxes/new', (request, response)=> {
    return response.render("newFox");
})

app.post('/createFox', (request, response)=> {
    let new_fox = new Fox({
        name: request.body.name,
        size: request.body.size,
        color: request.body.color,
        disposition: request.body.disposition,
        cuteness: request.body.cuteness,
    });
    new_fox.save()
        .then(()=>{
            return response.redirect("/");
        })
        .catch((error)=>{
            for(let err in error.errors){
                request.flash("errors", error.errors[err].message);
            }
        });
})

app.get('/foxes/:id', (request, response)=> {
    Fox.findOne({_id: request.params.id})
        .then((fox)=>{
            return response.render("showFox", {fox: fox});
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/');
        });
})

app.get('/foxes/edit/:id', (request, response)=> {
    Fox.findOne({_id: request.params.id})
        .then((fox)=>{
            return response.render("editFox", {fox:fox});
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/')
        })
})

app.post('/updateFox/:id', (request, response)=>{
    Fox.updateOne({_id: request.params.id}, {
        name: request.body.name,
        size: request.body.size,
        color: request.body.color,
        disposition: request.body.disposition,
        cuteness: request.body.cuteness,
    })
    .then((fox) => {
        console.log(fox);
        return response.redirect("/foxes/"+request.params.id);
    })
    .catch((error)=>{
        for(let err in error.errors){
            request.flash("errors", error.errors[err].message);
        }
        return response.redirect("foxes/"+request.params.id);
    });
});

app.get('/foxes/delete/:id', (request, response) => {
    id=request.params.id
    Fox.findByIdAndDelete(id, (err) =>{
        return response.redirect('/');
    })
});










app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));