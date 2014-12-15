var express = require('express');
var app = express();

app.use(express.static(__dirname+''));
app.use(express.bodyParser());
app.use(express.methodOverride());

var names = ['bunny','cat','dog'];

app.get('/contacts/name',function(req,res){
    res.send(names)
});

app.listen(9000);
