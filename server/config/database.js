var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/friends", function (err){
  if (err){
    console.log(err);
  }else{
    console.log("Connected to Mongoose")
  }
});
require("../models/friend");
