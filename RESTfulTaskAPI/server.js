const express = require('express')


const app = express();
app.use(express.static(__dirname + '/public/dist/public'));
app.use(express.json());


require('./server/routes')(app);

app.listen(8000, (err) => {
    console.log("Listening on port 8000")
})