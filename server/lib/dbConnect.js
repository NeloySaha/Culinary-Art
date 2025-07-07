// lib/dbConnect.js
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
}

module.exports = dbConnect;
