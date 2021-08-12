const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from server!");
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Enter All Fields" });
  }
  try {
    const emailexist = await User.findOne({ email: email });
    if (emailexist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({ name, email, password, cpassword });
    if(password !== cpassword) {
      return res.status(422).json({ error: "didn't match" });
    }
    await user.save();
    res.status(201).json({ message: "Registered Successfully" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "plz fill tha data" });
    }
    const login = await User.findOne({ email: email });
    if (login && password === login.password) {
      return res.status(201).json({ message: "Login success" });
    } else {
      return res.status(422).json({ message: "wrong" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
