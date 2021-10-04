const express = require("express");
const app = express();
const allRoutes = require("./routes/AllRoutes");
const userRoutes = require("./routes/UserRoutes");
require("./model/DbConn");
const port = 3000;
app.use("/api", allRoutes);
app.use("/api", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.log(err);
    res.status(401).json(err);
  }
});
app.listen(port, () => console.log(`Example app listening on port port!`));
