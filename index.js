const http = require("http");
const url = require("url");
const { connectDB } = require("./db");
const { getSortObject } = require("./utils");
require("dotenv").config();
require("./fetcher");

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === "/photos" && req.method === "GET") {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const orderBy = query.orderBy || "id";
    const order = query.order || "asc";

    try {
      const db = await connectDB();
      const collection = db.collection("photos");

      const cursor = collection
        .find({})
        .sort(getSortObject(orderBy, order))
        .skip((page - 1) * limit)
        .limit(limit);

      const data = await cursor.toArray();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ page, limit, orderBy, order, data }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
