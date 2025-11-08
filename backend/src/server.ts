import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.routes.js';
import { waterDataService } from './services/water-data.service.js';
import { ErrorHandler } from './middleware/error-handler.middleware.js';

dotenv.config();

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
app.use(ErrorHandler.handle);

const updateInterval = parseInt(process.env.DATA_UPDATE_INTERVAL_MS || '60000', 10);
waterDataService.startDataGeneration(updateInterval);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Public API: http://localhost:${PORT}/api/public`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  waterDataService.stopDataGeneration();
  process.exit(0);
});

process.on('SIGINT', () => {
  waterDataService.stopDataGeneration();
  process.exit(0);
});

