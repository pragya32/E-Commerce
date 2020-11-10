const User = require("../models/user"); //name the variable same as you exported in database
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var jwte = require("express-jwt");
exports.signup = (req, res) => {
  // console.log("REQ BODY", req.body) //bodyparser middleware

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body); //creating a new user
  user.save((err, user) => {
    //if it is not able to save the user
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in db", //if we will do this json thing then it would be better for frontend to find error
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    //it will return you the very first data
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not found",
      });
    }
    if (!user.authenticate(password)) {
      //we are returning this becoz we dont want any further execution
      return res.status(401).json({
        error: "password does not match",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET); //PUT TOKEN IN THE COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send respond to frontend
    const { id, name, email, role } = user;
    return res.json({ token, user: { id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token"); //thus will clear the cookie created a ove name as token through cokkie parser
  res.json({
    message: "user signout",
  });
};
//protected routes

exports.isSignedin = jwte({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middleware (auth: the user change things in his own account)
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "access denied",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "not an admin role",
    });
  }
  next();
};
