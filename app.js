var createError = require('http-errors');
var cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');// doponierania sciezek a w tym przyapdku do poprania puvblic assety?
var cookieParser = require('cookie-parser');
var logger = require('morgan');// loger z biblioteki morgan słuzy do zrzucnaia logów w trybie developerskim
var config=require('./config')
var mongoose = require('mongoose');
// baza danych !!
mongoose.connect(config.db, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('polaczylismy sie');
  // on tutaj usunał informacje o poprawnym połączniu
  // co znacyz db.once()?
});

var indexRouter = require('./routes/index');// ta sa imorty podstawowoch storn głownej i uzytkownika
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');

var app = express();// uruchamia nasz server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// tutaj chce aby te opcje były ladowane z poziomu pliku konfiguracyjnego
app.use(cookieSession({
  name: 'session',
  keys: config.keySession, // klucz ktory bedzie podpisyawał sesje
  maxAge: config.maxAgeSession// maksymalny cza przechowywania ciasatka
}))


app.use(function(req,res,next)
{
  // trzbe asie posłużyc globalnymi zmiennymi
  // na ta chile jest w naszej zmiennej globalnej locals
  res.locals.path=req.path // mozmy to wysiweltic w layout.pug
  console.log(req.path);
  // nie wiem jeszcze dokąłdniej ale next() służy do teog zeby sie nam nei zawiesił server !!
  next();
})
// tutaj jest wywoaływane to co wczensiej zaimportowalem
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);

// kiedy ktos bedzie chiał wejsc na jakas stornie niezadeklarowana!!
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// co to jest cluster?
//haslo  ZtkTSR6XMV5Q1cjP
//mongodb+srv://admin:ZtkTSR6XMV5Q1cjP@cluster0-ofbud.mongodb.net/test?retryWrites=true&w=majority
