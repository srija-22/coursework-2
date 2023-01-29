const express = require("express");
const { establishDbConnection, accessDb } = require("./database");

// start app
const app = express();

// access control headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// logger middleware
app.use((req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
    status: res.statusCode,
  });

  next();
});

// images middleware
app.use(express.static("public"));

establishDbConnection().then(() => {
  app.listen(process.env.APP_PORT || 3000, () =>
    console.log(`Server running on port: ${process.env.APP_PORT || 3000}`)
  );
});
