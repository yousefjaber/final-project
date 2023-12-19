const mongoose = require ("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`${err}`.red);
  }
};

module.exports = connectDB;