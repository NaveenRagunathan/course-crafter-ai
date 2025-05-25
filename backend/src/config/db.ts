import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coursecraft';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Connected to MongoDB:', conn.connection.host);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error; // Let the caller handle the error
  }
};

export default connectDB;
