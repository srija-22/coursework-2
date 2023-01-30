const express = require("express");
const { ObjectId } = require("mongodb");
const parser = require("body-parser");
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

// body-parser middleware to parse incoming request bodies in JSON format
app.use(parser.json());

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
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port: ${process.env.PORT || 3000}`)
  );
});

const decrementSpaces = async (lessonId, spacesAmount) => {
  const database = await accessDb();
  const lessons = database.collection("lesson");

  try {
    const result = await lessons.findOneAndUpdate(
      { _id: ObjectId(lessonId) },
      { $inc: { spaces: -spacesAmount } }
    );
  } catch (err) {
    console.error("Error while decrementing spaces:", err);
  }
};

// GET route that returns all the lessons
app.get("/all-lessons", async (req, res, next) => {
  try {
    const searchTerm = req.query.search || "";
    const query = searchTerm
      ? {
          $or: [
            { subject: { $regex: searchTerm, $options: "i" } },
            { location: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const db = await accessDb();
    const lessons = db.collection("lesson");
    const lessonList = await lessons.find(query).toArray();

    res.send(lessonList);
  } catch (err) {
    next(err);
  }
});

// POST route that saves a new order to the ‘order’ collection
app.post("/create-order", async (req, res, next) => {
  try {
    const orderData = req.body;
    const database = await accessDb();
    const orders = database.collection("order");

    const newOrder = await orders.insertOne(orderData);

    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

// PUT route that updates the number of available spaces in the ‘lesson’ collection after an order is submitted
app.put("/update-lesson/:id", async (req, res) => {
  const lessonId = req.params.id;
  const spacesAmount = req.body.spaces;

  await decrementSpaces(lessonId, spacesAmount);

  res.send("lesson spaces has been updated");
});
