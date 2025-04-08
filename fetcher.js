const fetch = require("node-fetch");
const { connectDB } = require("./db");

const PHOTO_API = "https://jsonplaceholder.typicode.com/photos";

async function fetchAndStorePhotos() {
  try {
    const res = await fetch(PHOTO_API);
    const photos = await res.json();
    const db = await connectDB();
    const collection = db.collection("photos");

    for (const photo of photos) {
      try {
        await collection.updateOne(
          { id: photo.id },
          { $setOnInsert: photo },
          { upsert: true }
        );
      } catch (err) {
        console.error(`Error inserting photo ${photo.id}:`, err.message);
      }
    }

    console.log(`Fetched and upserted ${photos.length} photos`);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

setInterval(fetchAndStorePhotos, 60 * 1000);

fetchAndStorePhotos();

module.exports = { fetchAndStorePhotos };
