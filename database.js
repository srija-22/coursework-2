const { MongoClient, ServerApiVersion } = require('mongodb')

let dbConnection;

const databaseUri =
  "mongodb+srv://Srija:mimo2002@web-coursework-2.k7tkejv.mongodb.net/?retryWrites=true&w=majority";

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
  return dbConnection.db("coursework-2");
};

module.exports = { establishDbConnection, accessDb };
