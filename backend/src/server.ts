import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { waterDataService } from './services/water-data.service.js';
import { notificationMonitorService } from './services/notification-monitor.service.js';
import { notificationsService } from './services/notifications.service.js';
import { emailService } from './services/email.service.js';
import { ErrorHandler } from './middleware/error-handler.middleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5175', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'jetsetters-backend',
  });
});

app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use(ErrorHandler.handle);

const updateInterval = parseInt(process.env.DATA_UPDATE_INTERVAL_MS || '60000', 10);
waterDataService.startDataGeneration(updateInterval);

const enableDemoChecks = !!process.env.TRIGGER_CRITICAL_DELAY;
notificationMonitorService.startMonitoring(updateInterval, enableDemoChecks);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Public API: http://localhost:${PORT}/api/public`);
  console.log(`Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`Health check: http://localhost:${PORT}/health`);

  if (process.env.TRIGGER_CRITICAL_DELAY) {
    const delaySeconds = parseInt(process.env.TRIGGER_CRITICAL_DELAY) || 20;
    
    setTimeout(() => {
      waterDataService.forceCriticalState();
      
      setTimeout(() => {
        waterDataService.forceStableState();
      }, 15000);
    }, delaySeconds * 1000);
  }
});

process.on('SIGTERM', () => {
  waterDataService.stopDataGeneration();
  notificationMonitorService.stopMonitoring();
  process.exit(0);
});

process.on('SIGINT', () => {
  waterDataService.stopDataGeneration();
  notificationMonitorService.stopMonitoring();
  process.exit(0);
});

