var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  title:  {type: String, required: true},
  vote: {type: Number, required: true, defaul: 0}
});

module.exports=mongoose.model('Quiz', quizSchema)
// teraz na koniec utowrzymy endpoint dla api czyli cała przestzrea pi a beda one do ponbeirania filtronwiani i wyswietlania danego artykułu