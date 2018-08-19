const regrest = require("./regrest");
const AT = require("./ATHelper");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const route = [{ stopNumber: "1919", stopName: "15 View Rd" }];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/routes", (req, res) => res.send(route));

app.get("/search", (req, res) =>
  AT.searchStopsWithQuery(req.query.query).then(data => res.send(data))
);

app.get("/stopInfo", (req, res) =>
  AT.getStopInfoById(req.query.stopId).then(data => res.send(data))
);

app.get("/delays", (req, res) => AT.getDelays().then(data => res.send(data)));

app.post("/newStop", (req, res) => {
  route.push({
    stopNumber: req.query.stopNumber,
    stopName: req.query.stopName
  });
  res.send("done");
});

app.delete("/route", (req, res) => {
  route.splice(route.findIndex(e => e.stopNumber == req.query.stopNumber));
  res.send("success");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Example app listening on port 3000!"));
