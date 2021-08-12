const mongoose = require("mongoose");

const DB =
  "mongodb+srv://adarsh:adarsh@cluster0.kqypx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful!");
  })
  .catch((e) => {
    console.log("No connection!");
  });
