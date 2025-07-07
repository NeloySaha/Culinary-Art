// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();
// const port = process.env.PORT;

// app.use(express.json());
// app.use(cors());
// app.use(express.static("public")); //for serving images from the public folder
// app.use(express.static(path.join(__dirname, "public")));

// async function main() {
//   await mongoose.connect(process.env.MONGODB_URI);

//   console.log("Connected to MongoDB Successfully!");

//   app.get("/", (req, res) => {
//     res.send("Culinary Art server is running:!");
//   });

//   //routes
//   const UserRoutes = require("../src/routes/UserRoutes");
//   const RecipeRoutes = require("../src/routes/RecipeRoutes");
//   const ProductRoutes = require("../src/routes/ProductRoutes");
//   const OrderRoutes = require("../src/routes/OrderRoutes");
//   //   const ProductsRoutes = require("./src/routes/productRoute");

//   app.use("/api/users", UserRoutes);
//   app.use("/api/recipes", RecipeRoutes);
//   app.use("/api/products", ProductRoutes);
//   app.use("/api/orders", OrderRoutes);
//   //   app.use("/api/minimart", ProductsRoutes);

//   app.listen(port, () => {
//     console.log(`Culinary Art server listening on port ${port}`);
//   });
// }

// main().catch((err) => console.log(err));

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./lib/dbConnect");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  await dbConnect();
  next();
});

app.get("/", (req, res) => {
  res.send("Culinary Art server is running (serverless)!");
});

app.use("/api/users", require("./src/routes/UserRoutes"));
app.use("/api/recipes", require("./src/routes/RecipeRoutes"));
app.use("/api/products", require("./src/routes/ProductRoutes"));
app.use("/api/orders", require("./src/routes/OrderRoutes"));

module.exports = {
  handler: serverless(app),
};
