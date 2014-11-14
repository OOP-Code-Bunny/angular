var express = require("express");
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.bodyParser());
app.use(express.methodOverride());

var recipes = {
    '1': {
        "id": "1",
        "title": "柠檬冰冻",
        "description": "柠檬口味的饮料,冰冰的,很好喝哈~",
        "ingredients": [
            {
                "amount": "300",
                "amountUnits": "ml",
                "ingredientName": "水"
            },
            {
                "amount": "20",
                "amountUnits": "ml",
                "ingredientName": "冰"
            },
            {
                "amount": "10",
                "amountUnits": "ml",
                "ingredientName": "糖"
            }
        ],
        "instructions": "1. 加冰水\n2. 加柠檬汁搅拌\n3. 加糖\n4. 加柠檬片"
    },
    '2': {
        id: 2,
        'title': '抹茶拿铁',
        'description': '抹茶味道很浓郁,很香',
        'instructions': '1. 加热水\n2. 加抹茶粉搅拌\n3. 加牛奶\n4. 加糖',
        ingredients: [
            {amount: 13, amountUnits: 'pounds', ingredientName: 'Awesomeness'}
        ]
    },
    '3': {
        id: 3,
        'title': '西瓜汁',
        'description': '新鲜西瓜鲜榨果汁,原汁原味',
        'instructions': '1. 西瓜榨汁\n',
        ingredients: [
            {amount: 13, amountUnits: 'pounds', ingredientName: 'Awesomeness'}
        ]
    }
};

var Recipelength = 3;

//获取所有的菜单
app.get('/recipe',function(req,res){
    res.send(recipes)
});

//获取指定id的菜单,用于显示某个菜单的路由
app.get('/recipe/:id',function(req,res){
    var recipe = recipes[req.params.id];
    res.send(recipe)
});

//更新指定id的菜单,用于保存修改的菜单
app.post('/recipe/:id',function(req,res){
    var recipeId = req.params.id;
    recipes[recipeId] = req.body;
    res.send(recipes[recipeId])
});

//提交新的菜单,用于保存新建的菜单
app.post('/recipe',function(req,res){
    var recipeId = ++Recipelength;
    recipes[recipeId] = req.body;
    recipes[recipeId].id = recipeId;
    res.send(recipes[recipeId])
});

//删除指定id的菜单,用于删除某个菜单
app.delete('/recipe/:id',function(req,res){
    var recipeId = req.params.id;
    res.send(recipes[recipeId]);
    delete recipes[recipeId];
});


app.listen(9000);

