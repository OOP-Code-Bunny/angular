var express = require('express');
var url = require('url');
var app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname));


var cards = [
    {
        id:1,
        name:'建设银行',
        amount:0
    },
    {
        id:2,
        name:'中国银行',
        amount:0
    },
    {
        id:3,
        name:'上海银行',
        amount:0
    }
];

app.get('/card/user/123/:id',function(req,res){
    var data = cards[req.params.id-1];
    setTimeout(function(){res.send(data)},2000)
});
app.get('/card/user/123',function(req,res){
    res.send(cards)
});
app.post('/card/user/123/:id',function(req,res){
    var index = req.params.id-1;
    var query = url.parse(req.url,true)['query'];
    if (query.charge){
        cards[index]['amount']+= Number(query['amount'])
    }
    else {
        cards[index] = req.body;
    }
    res.send(cards[index]);
});
app.post('/card/user/123',function(req,res){
    var index = cards.length;
    cards[index] = req.body;
    res.send(cards[index]);
});
app.delete('/card/user/123/:id',function(req,res){
    var index = req.params.id-1;
    cards[index] = null;
    res.send({})
});
app.listen(3000);
