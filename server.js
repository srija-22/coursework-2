const express = require('express');
const { establishDbConnection, accessDb } = require('./database')

const app = express();

establishDbConnection()
  .then(() => {
    app.listen(process.env.APP_PORT || 3000, () =>
      console.log(`Server running on port: ${process.env.APP_PORT || 3000}`)
    );
  })