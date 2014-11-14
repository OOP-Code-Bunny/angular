var express = require('express');
var app = express();

app.use(express.static(__dirname+''));
app.use(express.bodyParser());
app.use(express.methodOverride());

var notes = {
    '1':{id:1,title:'lalala',content:'1de neirong'},
    '2':{id:2,title:'lalala',content:'2de neirong'},
    '3':{id:3,title:'lalala',content:'3de neirong'}
};

var noteLength = 4;

app.get('/notes',function(req,res){
    res.send(notes)
});
app.get('/notes/:id',function(req,res){
    var noteId = req.params.id;
    res.send(notes[noteId])
});
app.post('/notes/:id',function(req,res){
    var noteId = req.params.id;
    notes[noteId] = req.body;
    res.send(notes)
});
app.delete('/notes/:id',function(req,res){
    var noteId = req.params.id;
    delete notes[noteId];
    res.send(notes)
});
app.post('/notes',function(req,res){
    notes[noteLength] = req.body;
    notes[noteLength]['id'] = noteLength;
    ++noteLength;
    res.send(notes)
});

app.listen(9000);
