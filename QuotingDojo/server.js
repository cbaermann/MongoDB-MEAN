const express = require("express");
const app = express();
const session = require('express-session');
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QuotingDojo', {useNewUrlParser: true});
const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    message: {type: String, required: true, minlength: 5}
},{timestamps: true});
const Quote = mongoose.model("Quote", QuoteSchema);


app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (request, response) => {
    console.log("Home Route *******************************************")
    response.render("index");
});

app.post('/quotes', (request, response)=> {
    const quote = new Quote();
    quote.name = request.body.name;
    quote.message = request.body.message;
    quote.save()
        .then(newQuoteData => response.render('quote created: ', newQuoteData))
        .catch(err => response.json(err));

    response.redirect("quotes");
})

app.get('/quotes', (request, response)=> {
    Quote.find()
        .then(data => response.render("quotes", {quotes: data}))
        .catch(err => console.log(err))
        
        
})








app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));