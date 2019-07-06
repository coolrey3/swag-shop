var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var food = new Schema ({

  name: String,
  price: {type:Number,default:0},
  category: {type:String,default:"Snack"}

});

module.exports = mongoose.model('Food', food);
