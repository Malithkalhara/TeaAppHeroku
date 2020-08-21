var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var usersRouter = require('./routes/users');
var shopRouter = require("./routes/shops")
var orderRouter = require("./routes/order")

var bodyParser = require('body-parser')
var app = express();

var metrics = require('./routes/Metrics');
var articalCategory = require('./routes/ArticalCategory');
var artical  = require('./routes/Artical');
var product = require('./routes/Product');
var suppler = require('./routes/Suppler');
var warehouse = require('./routes/Warehouse');
var supplerInvoice = require('./routes/SupplerInvoice');

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", usersRouter);
app.use("/shops",shopRouter)
app.use("/orders",orderRouter)

//Metrics
app.use('/metrics',metrics);

//Artical Category
app.use('/ArticalCategory',articalCategory);

//Artical 
app.use('/Artical',artical);

//Product 
app.use('/Product',product);

//suppler
app.use('/Suppler',suppler);

//Warehouse
app.use('/Warehouse',warehouse);

//suppler Invoice
app.use('/SupplerInvoice',supplerInvoice)

//Database connection mongoDB mLab on heroku
mongoose.connect("mongodb://malith:password@123@ds039115.mlab.com:39115/heroku_qvmb57jc");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection esteblished successfully");
});

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
