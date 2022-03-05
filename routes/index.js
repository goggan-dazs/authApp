var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  // Setting the auth token in cookies
  res.cookie('AuthToken', "Test Cookie");
  res.render('index', { title: 'Express' });
});


/* GET Register Page */
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register Your Account"});
});

router.get('/login', (req, res) => {
  console.log("testing log-in route");
  res.render('login');
});


const isVerified = (req, res, next) =>{
  const authtoken = req.cookies['token'];
  console.log("cookies", req.cookies);
  next();
    jwt.verify(authtoken, secretKey, function(err, decoded) {
     console.log("Decoded", decoded);
    });
  }
/* GET protected page */

// Middleware helper function example

  // User logs in
  // When user logs in, create JWT, save as cookie
  // When user accesses a protected route
  // Use middleware to validate JWT
  // If valid, render router or next()
  // else throw error, redirect to login
  const isValidUser = (req, res, next) => {

  const token = req.cookie;
    console.log(token);
  next();
};

// jwt.verify(
//   token,
//   secretKey,
//   function (err, decoded) {
//     console.log("Decoded", decoded); //bar
//   }
// );

router.get("/protected", isVerified, (req, res, next) => {
  res.send("Authorized user, protected route");

});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/Offramp', (req, res, next) => {
  res.render('Offramp');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;


