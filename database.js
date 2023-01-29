const { MongoClient, ServerApiVersion } = require('mongodb')

let dbConnection;

const databaseUri =
  "mongodb+srv://Srija:rnMTZNM8utuTKB-@web-coursework-2.vjqikya.mongodb.net/?retryWrites=true&w=majority";

const establishDbConnection = async function () {
  dbConnection = await MongoClient.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
};

const accessDb = function () {
  if (!dbConnection) {
    return
  }
  return dbConnection.db("srija-coursework");
};

module.exports = { establishDbConnection, accessDb };
