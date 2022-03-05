var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const Sequelize = require('sequelize');
const saltRounds = Number(process.env.SALT_ROUNDS);
var jwt = require('jsonwebtoken');

console.log("user.js salt rounds are:", saltRounds);

/* GET users listing. */
router.get('/', async (req, res, next) => {
  //res.send('respond with a resource');
  //const users = await User.findAll();
  res.render('index');
  // res.json(users);
});




router.post('/login', async (req, res, next) => {
  
  const {username, password} = req.body
  const users = await User.findOne({
    where: {
      username: username
    }
  })
  
  const dbPassword = users.password
  console.log("db password", dbPassword)
  
  const comparePass = bcrypt.compareSync(password, dbPassword); //boolean
  
  console.log("compare", comparePass);

  if (comparePass) {
    const secretKey = process.env.SECRET_KEY;

const token = jwt.sign({
  data: users.username,
},
 secretKey,
  { expiresIn: '1h' });
    res.cookie('token', token);
    res.redirect('/profile');
  } else {
    res.send("NOT AUTHORIZED");
    res.redirect('/Offramp');
  }

});


router.post('/register', async (req, res, next) => {
  // req.body contains an Object with firstName, lastName, email
  
  console.log("registerRoute", req.body);
  let { username, password } = req.body;
  password = bcrypt.hashSync(password, saltRounds);
  const newUser = await User.create({
      username,
      password
  
  });
  res.redirect('/profile');
  
  // Send back the new user's ID in the response:
  // res.json({
  //     id: newUser.id
  // });
  res.send("register post request")
});


module.exports = router;
