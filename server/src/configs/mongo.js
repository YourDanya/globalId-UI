import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path: './src/.env'})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true
    });
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB
