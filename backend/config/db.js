const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the MONGODB_URI from environment variables.
 * Retries once on failure and logs useful status messages.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

  } catch (error) {
    console.error('❌ MongoDB connection FAILED:', error.message);
    console.error('   Make sure MongoDB Compass (or mongod service) is running on port 27017');
    console.error('   MONGODB_URI:', process.env.MONGODB_URI);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
