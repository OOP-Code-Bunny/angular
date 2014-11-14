var express = require('express');
var app = express();
app.use(express.static(__dirname+''));

var data = 'angularjs中的$http.get';

app.get('/api/user',function(req,res){
    res.send(data)
});

app.listen(3000);
