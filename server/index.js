const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB Successfully!");

  app.get("/", (req, res) => {
    res.send("Culinary Art server is running:!");
  });

  //routes
  const UserRoutes = require("./src/routes/UserRoutes");
  const RecipeRoutes = require("./src/routes/RecipeRoutes");
  //   const ProductsRoutes = require("./src/routes/productRoute");

  app.use("/api/users", UserRoutes);
  app.use("/api/recipes", RecipeRoutes);
  //   app.use("/api/minimart", ProductsRoutes);

  app.listen(port, () => {
    console.log(`Culinary Art server listening on port ${port}`);
  });
}

main().catch((err) => console.log(err));
