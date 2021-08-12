const express = require("express");
const app = express();
require("./db/conn");
//const User = require('./model/userSchema');
app.use(express.json());
app.use(require("./router/auth"));
app.get("/chap", (req, res) => {
  res.send("Hello from CHAP!");
});

app.listen(5000, () => {
  console.log("hello from 5000");
});
