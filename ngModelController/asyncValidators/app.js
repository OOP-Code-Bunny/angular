var express = require('express');
var app = express();

app.use(express.static(__dirname+''));
app.use(express.bodyParser());
app.use(express.methodOverride());

var names = [
    'code_bunny','mi_bunny','hua_bunny'
];

app.get('/api/users/:name',function(req,res){
    setTimeout(function(){
        var name = req.params.name;
        names.forEach(function(list){
            if(name==list) {
                res.send(list);
            }
            else {
                res.end()
            }
        });
    },1000);
});

app.listen(9000);

