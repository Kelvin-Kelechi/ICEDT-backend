const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db();

      await db.collection("photos").createIndex({ id: 1 }, { unique: true });

      console.log("MongoDB connected successfully!");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }
  return db;
}

module.exports = { connectDB };
