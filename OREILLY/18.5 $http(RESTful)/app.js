var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname));


var cards = [
    {
        id:1,
        name:'建设银行'
    },
    {
        id:2,
        name:'中国银行'
    },
    {
        id:3,
        name:'上海银行'
    }
];

app.get('/card/user/123/:id',function(req,res){
    var data = cards[req.params.id-1];
    res.send(data['name'])
});
app.get('/card/user/123',function(req,res){
    var data=[];
    for(var i in cards){
        data.push(cards[i]['name'])
    }
    res.send(data)
});

app.post('/card/user/123/:id',function(req,res){
    var index = req.params.id-1;
    cards[index] = req.body;
    res.send(cards[index]);
});
app.post('/card/user/123',function(req,res){
    var index = cards.length;
    cards[index] = req.body;
    cards[index].id = index;
    res.send(cards[index]);
});
app.delete('/card/user/123/:id',function(req,res){
    var index = req.params.id-1;
    cards[index] = null;
    console.log(cards);
    res.send(cards[index])
});

app.listen(3000);
