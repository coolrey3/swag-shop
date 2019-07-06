var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drink = new Schema({

  name: String,
  price: {type:Number,default:0},
  category: String,



});

module.exports = mongoose.model('Drink',drink);
