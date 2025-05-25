import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs-extra';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import logger from './utils/logger.js';

// Load environment variables early
dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;
const API_PREFIX = '/api/v1';
const EXPORTS_DIR = path.join(process.cwd(), 'exports');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Ensure necessary directories exist
fs.ensureDirSync(EXPORTS_DIR);

// Initialize Express
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(EXPORTS_DIR));
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(`${API_PREFIX}/`, apiLimiter);

// Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/courses`, courseRoutes);

// Add root API health endpoints for HEAD and GET
app.route('/api')
  .get((req: Request, res: Response) => res.sendStatus(200))
  .head((req: Request, res: Response) => res.sendStatus(200));
app.route('/api/v1')
  .get((req: Request, res: Response) => res.sendStatus(200))
  .head((req: Request, res: Response) => res.sendStatus(200));


// Error handler
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection:', reason);
  // Close server & exit process
  httpServer.close(() => process.exit(1));
});

// Socket.IO
io.on('connection', (socket) => {
  logger.info('🔌 New client connected');
  socket.on('disconnect', () => {
    logger.info('❌ Client disconnected');
  });
});

// Graceful shutdown
const shutdown = (reason: string, err?: unknown) => {
  logger.error(`💥 ${reason}`);
  if (err instanceof Error) {
    logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  } else if (typeof err === 'object' && err !== null) {
    logger.error('Error object: ' + JSON.stringify(err));
  } else if (typeof err === 'string') {
    logger.error('Error string: ' + err);
  } else {
    logger.error('Unknown error');
  }
  httpServer.close(() => {
    logger.info('🔒 Server closed.');
    process.exit(1);
  });
};

process.on('unhandledRejection', (err) => shutdown('Unhandled Promise Rejection', err));
process.on('uncaughtException', (err) => shutdown('Uncaught Exception', err));
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received.');
  httpServer.close(() => {
    logger.info('💥 Process terminated.');
  });
});

// Start server only after DB is connected
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      logger.info(`🚀 CourseCraft API running on http://localhost:${PORT}`);
      logger.info(`📚 Health check: http://localhost:${PORT}${API_PREFIX}/health`);
    });
  } catch (err: any) {
    shutdown('Failed to start server', err);
  }
};

startServer();

export { app, httpServer, io };

