const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load env vars FIRST
dotenv.config();

const app = require('./app');

// ✅ CRITICAL: Render port binding
const PORT = process.env.PORT || 5000;

// Connect to database THEN start server
const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);
    
    await connectDB();
    console.log('✅ MongoDB Connected!');
    
    // ✅ RENDER: Bind to 0.0.0.0 + dynamic PORT
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'production'} mode`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌐 Bind: 0.0.0.0`);
    });

    // Handle graceful shutdown
    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (err) {
    console.error('❌ Server Error:', err.message);
    console.error('💡 Check: MongoDB whitelist, MONGODB_URI');
    process.exit(1);
  }
};

// Start server
startServer();