const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_DB = process.env.MONGO_DB;

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})