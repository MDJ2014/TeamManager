var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);





// var Player = require('./models/playerModel');
// var Game = require('./models/gameModel');
// var Payment = require('./models/paymentModel');
// var User = require('./models/userModel');
// var Schedule = require('./models/scheduleModel');
// var TeamMessage = require('./models/teamMessages');
// var Team = require('./models/teamModel');





var index = require('./routes/index');
var users = require('./routes/users');
var teams = require('./routes/teams');
var players = require('./routes/players');
var fees = require('./routes/fees');
var pay = require('./routes/pay');
var messages = require('./routes/messages');
var games = require('./routes/games');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"], scriptSrc: ["'self'", "trusted-cdn.com","/users/profile"]}}));






app.use(express.static(path.join(__dirname, 'public')));




var dbName = "teammanager";



mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://localhost:27017/" + dbName);
const db = mongoose.connection;

db.on("error", function(err){
  console.error("Error connecting to database");
});

db.once('open', function(){
  console.error("Connection to " + dbName + " database successful");
})




app.use(session({
  secret: 'We are number one',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
  mongooseConnection: db
  })
}));

app.use(function(req,res,next){
res.locals.currentUser = req.session.userId;
next();
});



app.use('/', index);
app.use('/users', users);
app.use('/teams', teams);
app.use('/players', players);
app.use('/fees',fees);
app.use('/pay',pay);
app.use('/messages',messages);
app.use('/games', games);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.json({"error": res.locals.message })
  res.render('error');


});

module.exports = app;
