var mongoose = require("mongoose");
var Friend = mongoose.model("Friend");


module.exports.index = function (request, response)
{
  Friend.find({}, function (err, friends){
    if (err){
      console.log(err);
    }else{
      response.json({ message: "Friends Index", friends: friends});
    }
  });
}
module.exports.show = function (request, response)
{
  Friend.findOne({ _id: request.params.id }, function (err, friend){
    if(err){
      console.log(err);
    }else{
      response.json({ message: "Friend" + friend._id, friend: friend});
    }
  });
}
module.exports.create = function (request, response)
{
  var friend = new Friend({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    birthDay: request.body.birthDay
  });
  friend.save(function (err){
    if (err){
      console.log(err);
    }else{
      response.json({ message: "Successfully Created Item", friend: friend });
    }
  });
}
module.exports.update = function (request, response)
{
  console.log("request", request)
  Friend.findOne({ _id: request.params.id}, function(err, friend){
    console.log("request.params", request.params);
    if(err){
      console.log(err);
    }else{
      friend.firstName = request.body.firstName;
      friend.lastName = request.body.lastName;
      friend.birthDay = request.body.birthDay;
      friend.save(function(err, friendUpdate){
        if(err){
          console.log(err);
        }else{
          response.json(friendUpdate);
        }
      })
    }
  });
}
module.exports.delete = function (request, response)
{
  Friend.remove({ _id: request.params.id}, function (err, friend){
    if(err){
      console.log(err);
    }else{
      response.json({ message: "Friend deleted"});
    }
  })
}
