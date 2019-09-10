const express = require("express");
const app = express();
const session = require('express-session');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MessageBoard', {useNewUrlParser: true});
const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    comment: {type: String, required: true, minlength: 3},
    
}, {timestamps: true});

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    message: {type: String, required: true, minlength: 2},
    comments: [CommentSchema],
},{timestamps: true});

const Message = mongoose.model("message", MessageSchema);
const Comment = mongoose.model("comment", CommentSchema);


app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (request, response) => {
    Message.find()
        .then((messages)=>{
            return response.render("index", {messages: messages});
        })
        .catch((error)=> {
            console.log(error);
            return response.render("index")
        });
   
});

app.post("/createMessage", (request, response)=> {
    let newMessage = new Message();
    newMessage.name = request.body.name;
    newMessage.message = request.body.message;
    newMessage.save()
        .then(()=> {
            return response.redirect("/");
        })
        .catch((error)=> {
            for(let err in error.errors){
                request.flash("errors", error.errors[err].message);
            }
            return response.redirect("/");
        })
})

app.post("/createComment/:messageId", (request, response)=> {
    let newComment = new Comment;
    newComment.name = request.body.name;
    newComment.comment = request.body.comment;
    newComment.save()
        .then(()=> {
            Message.updateOne({_id: request.params.messageId}, {
                $push: {comments: newComment}
            })
                .then(()=> {
                    return response.redirect("/")
                });
        });
});











app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));