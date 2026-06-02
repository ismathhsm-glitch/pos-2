const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/pos_db';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
};

module.exports = connectDB;
