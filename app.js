var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var uploadRouter = require('./routes/upload');
var profileRouter = require('./routes/profile');
var dashboardRouter = require('./routes/dashboard');
var personalRecipeRouter = require('./routes/personalRecipe');
var recipeRouter = require('./routes/recipe');
var favoritesRouter = require('./routes/favorites');
const util = require('util');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow Cross Origin Resource Sharing
const corsOptions = {
  origin: (origin, callback) => {
    if (origin != process.env.REACT_ENDPOINT && origin != null) {
      callback(new Error(util.format('Not allowed by CORS, endpoint=[%s]', origin)))
    } else {
      callback(null, true)
    }
  }
}
app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/signup', signupRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/profile', profileRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/personalRecipe', personalRecipeRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/favorites', favoritesRouter);

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

app.listen(process.env.PORT || 3001, function () {
  console.log(util.format('Listening on port %s!', process.env.PORT || 3001))
})

module.exports = app;
