const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB connection URI is missing');
  process.exit(1); 
}
mongoose.connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
