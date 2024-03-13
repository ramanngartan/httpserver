const express = require('express');
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";

const app = express();
const port = 3001;

app.use(express.json());

const ALL_USERS = [
  {
    username: "ramangartan@gmail.com",
    password: "123",
    name: "raman gartan"
  },
  {
    username: "arpitbassi@gmail.com",
    password: "456",
    name: "arpit bassi"
  },
  {
    username: "rohitgujjar@gmail.com",
    password: "789",
    name: "rohit gujjar"
  }
];

function userExists(username, password){
  // logic to return true or false if user exists
  // in ALL_USERS array
  
  let userExists = false;
  for (let i=0; i<ALL_USERS.length; i++) {
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      userExists = true;
    }
  }
  return userExists;

}

app.post("/signin", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if(!userExists(username, password)) {
    return res.status(403).json({
      msg: "Input Invalid"
    });
  };

  var token = jwt.sign({username: username}, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function(req, res) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const username = decoded.username;
  // returns a list of userother than this username

  res.json({
    users: ALL_USERS
  })

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})