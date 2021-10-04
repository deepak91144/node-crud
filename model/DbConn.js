const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/merncrud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });
