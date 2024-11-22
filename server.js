const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactions");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://singpriyanshu22:OEhsjwcy1MN6e7nY@mernstackdb.mxc81.mongodb.net/?retryWrites=true&w=majority&appName=mernstackdb/transactions", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
