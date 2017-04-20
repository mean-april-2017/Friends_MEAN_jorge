var friends = require("../controllers/friends");
module.exports = function (app)
{
  app.get("/api/friends", friends.index);
  app.get("/api/friends/:id", friends.show);
  app.post("/api/friends", friends.create);
  app.put('/api/friends/update/:id', friends.update);
  app.delete('/api/friends/:id', friends.delete);
}
