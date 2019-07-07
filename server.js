var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// ****************** WishList Get **************
app.get('/wishlist', function(req, res) {
  Wishlist.find({}).populate({
    path: 'products',
    model: 'Product'
  }).exec(function(err, wishLists) {

    if (err) {
      res.status(500).send({
        error: "Could not fetch wishlists"
      });
    } else {
      res.send(wishLists);
    }

  });

  // Wishlist.find{};
});

// ****************** Wishlist Post **************


app.post("/wishlist", function(req, res) {
  var wishList = new Wishlist();
  wishList.title = req.body.title;
  wishList.save(function(err, newWishList) {
    if (err) {
      res.status(500).send({
        error: "Could not create new wishlist"
      });
    } else {
      res.send(newWishList);
    }
  });
});

// ****************** Wishlist Put **************



app.put('/wishlist/product/add', function(req, res) {
  Product.findOne({
    _id: req.body.productId
  }, function(err, product) {
    if (err) {
      res.status(500).send({
        error: "Could not add item to wishlist"
      });
    } else {
      Wishlist.update({
          _id: req.body.wishListId
        }, {
          $addToSet: {
            products: product._id
          }
        },
        function(err, wishList) {
          if (err) {
            res.status(500).send({
              error: "Could not add item to wishlist"
            });
          } else {
            res.send("Successfully added product to wishlist!");
          }

        });

    }
  });

});


// ****************** Product Get **************

app.get("/product", function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send({
        error: "Could not fetch products"
      });
    } else {
      res.send(products);
    }
  });
});

// ****************** Product Post **************

app.post("/product", function(req, res) {
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.save(function(err, savedProduct) {

    if (err) {
      res.status(500).send({
        error: "could not save product"
      });
    } else {
      res.send(savedProduct);
    }
  });
});

// ****************** Start Server **************


app.listen(3000, function() {
  console.log("Swag shop api running on port 3000");
});
