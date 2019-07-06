// ***************** Variables *********************

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/groceries');

// ***************** DB Variabls **********************
var Food = require('../model/food');
var Drink = require('../model/drinks');

// groceryList = ['carrots', 'oranges'];

// *****************  Body Parser ********************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// ******************* Food ******************

// ******************* GET **********************
app.get('/food', function(req, res) {
  Food.find({}).populate({
    path: 'food',
    model: 'Food'
  }).exec(function(err, foodList) {
    if (err) {
      res.status(500).send({
        error: "cant list foods"
      });
    } else {
      res.send(foodList);
    }
  });

  // res.send(groceryList);
});

// *******************  POST  **************
app.post('/food', function(req, res) {
  var food = new Food();
  food.name = req.body.name;
  food.price = req.body.price;
  food.category = req.body.category;
  food.save(function(err, newFood) {

    if (err) {
      res.status(500).send({
        error: "Unable to save new food"
      });
    } else {
      res.send(newFood);
    }
  });
});
// groceryList.push(name);
// res.send(groceryList);

app.put('/:foodName', function(req, res) {
  var foodName = req.param.foodName;
  groceryList.push(foodName);
  res.send(groceryList);
});

// **************** DRINK ****************

app.get('/drink',function(req,res) {
    Drink.find({}).populate({path:'drinks', model:'Drink'}).exec(function(err,drinkList) {
if (err) {
  res.status(500).send({error:"unable to get drink list"});
} else {
  res.send(drinkList);
}

    });
});

// **************** POST ****************
app.post('/drink', function(req, res) {
  var drink = new Drink();
  drink.name = req.body.name;
  drink.price = req.body.price;
  drink.category = req.body.category;
  drink.save(function(err, newDrink) {
    if (err) {
      res.status(500).send({
        error: "Failes to create new Drink"
      });
    } else {
      res.send(newDrink);
    }
  });

});


// *************** Start Server **************
app.listen(3000, function() {
  console.log('this worked yall');
});
