var express = require("express");
var lessMiddleware = require('less-middleware');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var states = [
{id:"CA", state_name:"California", population:38.8},
{id:"TX", state_name:"Texas", population:27},
{id:"FL", state_name:"Florida", population:19.9},
{id:"NY", state_name:"New York", population:19.8},
{id:"IL", state_name:"Illinois", population:12.9},
{id:"PA", state_name:"Pennsylvania", population:12.8},
{id:"OH", state_name:"Ohio", population:11.6},
{id:"GA", state_name:"Georgia", population:10.1},
{id:"NC", state_name:"North Carolina", population:10},
{id:"MI", state_name:"Michigan", population:9.9},
];
console.log(states);

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
  let matches = states.filter(s => s.id == stateId);
  console.log(matches);
  if (!matches.length) {
    res.status(404).send(`No matching state for id ${stateId} there are ${state.length}`);
  } else {
    res.locals.state = matches[0];
    res.send(`${matches[0].population} Million.`);
  }
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
