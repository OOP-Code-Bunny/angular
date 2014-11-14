var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname+''));

app.post('/api/user',function(req,res){
    res.send(req.body.name)
});

app.listen(3000);
