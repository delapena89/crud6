var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Exercise = new Schema({
  name: String,
  difficulty: Number,
});

module.exports = mongoose.model("exercise", Exercise);
