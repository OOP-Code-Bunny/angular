var express = require('express');
var url = require('url');
var app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname));

/*app.get('/name',function(req,res){
    setTimeout(function(){res.send('code_bunny')},1000)
});*/

app.listen(3000);
