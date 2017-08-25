var express = require("express");
//import jsonfileservice'  This is for servering a user data file for testing;
let router = express.Router();
let list = [];
class UserService {
  constructor() {
    let userlog = (req, res, next) => {
      if (list.length === 0) {
        loadlistfromJsonServer();
      }
      console.log('Request URL:', req.originalUrl)
      next()
    }
    //private method
    let loadlistfromJsonServer = () => {
      let jsfileservice = new jsonfileservice();
      let result = jsfileservice.getFile('/../../data/' + 'user.json');
      list = result.users
      return true;
    }
    //Begin Router Middleware Functions
    let checkForSecretKey = (req, res, next) => {
      //checkForSecretKey function
      let secret = req.query['secret'];
      if (secret !== 'fishtacos') {
        res.status(401).send('You are not authorized!');
      } else {
        next();
      }
    }
    let userlist = (req, res) => {
      console.log(list.length);
      res.send(list);
    };
    // GET count of users.
    let count = (req, res) => {
      if (list.length === 0) {
        loadlistfromJsonServer();
      }
      res.send(`<h3>Users = ${list.length.toString()}</h3>`);
    };
    //Add addtional Methods here




    // End Router Middleware Functions

    //object to be returned will expose the middleware functions we need
    let userrouter = {
      userlog: userlog,
      checkForSecretKey: checkForSecretKey,
      userlist: userlist,
      length: count
    };
    return userrouter;
  }

}
// all code above this point could be moved out to a different file
//Below is where all the magic happens
let userRouter = new UserService();

router.use(userRouter.userlog);

router.use(userRouter.checkForSecretKey);

router.get('/', userRouter.userlist);

router.get('/count', userRouter.length);

router.get('/:id', userRouter.getUser);

//we only export
export default router;
