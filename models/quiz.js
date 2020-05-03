var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  title:  {type: String, required: true},
  vote: {type: Number, required: true, defaul: 0}
});

module.exports=mongoose.model('Quiz', quizSchema)