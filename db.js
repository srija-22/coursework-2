import { MongoClient, ServerApiVersion } from 'mongodb'

let dbConnection;

const databaseUri =
  "mongodb+srv://Srija:rnMTZNM8utuTKB-@web-coursework-2.vjqikya.mongodb.net/?retryWrites=true&w=majority";

const establishDbConnection = async function () {
  try {
    dbConnection = await MongoClient.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {
    console.log("Failed to connect to MongoDB Atlas: ", error);
    throw error;
  }
};

const accessDb = function () {
  if (!dbConnection) {
    throw new Error(
      "Please call establishDbConnection() before accessing the database"
    );
  }
  return dbConnection.db("srija-coursework");
};

module.exports = { establishDbConnection, accessDb };
