var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exercise = new Schema({
  name: String,
  difficulty: Number,
});

module.exports = mongoose.model("exercise", exerciseSchema);
