const express = require("express");
const app = express();
// const port = 3000;

// app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );
const port = 8000;
app.get("/", (req, res) => {
  return res.send("hello!");
});
app.get("/hites", (req, res) => {
  return res.send("hey your are on hitesh insta account!!!!");
});
app.get("/login", (req, res) => {
  return res.send("hello you are logged in!!!!");
});
app.get("/signup", (req, res) => {
  return res.send("hye you are signed up!!!!");
});
app.listen(port, () => {
  console.log("server is up and running....");
});
const admin = (req, res) => {
  return res.send("this is admin");
};
const isAdmin = (req, res, next) => {
  console.log("isAdmin running");
  next();
};
const isloggedin = (req, res, next) => {
  console.log("is logged in!!");
  next();
};
app.get("/admin", isloggedin, isAdmin, admin);
