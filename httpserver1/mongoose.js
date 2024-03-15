const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:sevenel11@cluster0.ib8izhj.mongodb.net/userappnew");

const app = express;
app.use(express.json());

const User = mongoose.model("Users", {
  name: String,
  username: String,
  password: String,
});


app.post("/signup", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser= User.findOne({username: username});
    if (existingUser){
        return res.status(400).send("Username already exists.")
    }

    const user = new User({
        name: name,
        username: username,
        password: password,
      });

      user.save();
      res.json({
        "msg":"User created successfully."
      })

})
