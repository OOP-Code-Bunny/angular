var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname+''));

var data = "name=code_bunny&age=3";

app.post('/api/user',function(req,res){
    console.log(req.body.name);
    setTimeout(function(){
    	res.send(data)
    },2000)
});

app.listen(3000);


