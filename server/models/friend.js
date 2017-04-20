var mongoose = require("mongoose");
var friendSchema = mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  birthDay: { type: Date, required: true},
});
mongoose.model("Friend", friendSchema);
