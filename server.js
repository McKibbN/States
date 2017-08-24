var express = require("express");
var lessMiddleware = require('less-middleware');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var states = require("./states.json");

app.use(lessMiddleware(path));
app.use(express.static(path));
app.use("/",router);

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get('/states', function(req,res) {
  res.send(states);
});

app.get('/states/:id', function(req,res) {
  let stateId = req.params['id'];
  let matches = states.filter(s => s._id == stateId);
  if (!matches.length) {
    res.status(404).send(`No matching state for id ${stateId} there are ${state.length}`);
  } else {
    res.locals.state = matches[0];
  }
  res.send("${states.population} Million.");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
