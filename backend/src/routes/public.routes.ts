import { Router, Request, Response } from 'express';
import { statusCalculator } from '../services/status-calculator.service.js';
import { syntheticDataService } from '../services/synthetic-data.service.js';
import { ErrorHandler } from '../middleware/error-handler.middleware.js';

const router = Router();

router.get('/status', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const status = statusCalculator.getPublicStatus();
  res.json({
    success: true,
    data: {
      overallRisk: {
        index: status.overallRisk.index,
        level: status.overallRisk.level,
        description: status.overallRisk.description,
        timestamp: status.overallRisk.timestamp,
      },
      chemicals: status.chemicals.map((chem) =>
        statusCalculator.formatChemicalReading(chem)
      ),
      healthAdvisory: status.healthAdvisory,
      lastUpdated: status.lastUpdated,
    },
  });
}));

router.get('/risk-index', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const riskIndex = syntheticDataService.getWaterRiskIndex();
  res.json({
    success: true,
    data: {
      index: riskIndex.index,
      level: riskIndex.level,
      description: riskIndex.description,
      timestamp: riskIndex.timestamp,
      color: statusCalculator.getRiskLevelColor(riskIndex.level),
      badgeText: statusCalculator.getStatusBadgeText(riskIndex.level),
    },
  });
}));

router.get('/chemicals', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const currentState = syntheticDataService.getCurrentState();
  res.json({
    success: true,
    data: currentState.chemicals.map((chem) =>
      statusCalculator.formatChemicalReading(chem)
    ),
  });
}));

router.get('/health-advisory', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const status = statusCalculator.getPublicStatus();
  res.json({
    success: true,
    data: status.healthAdvisory,
  });
}));

router.post('/demo/attack', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const { scenarioId } = req.body;
  
  if (!scenarioId) {
    return res.status(400).json({
      success: false,
      error: 'scenarioId is required',
    });
  }

  const success = syntheticDataService.triggerAttack(scenarioId);
  
  if (!success) {
    return res.status(404).json({
      success: false,
      error: 'Attack scenario not found',
    });
  }

  res.json({
    success: true,
    message: `Attack scenario '${scenarioId}' triggered`,
  });
}));

router.post('/demo/reset', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  syntheticDataService.resetToBaseline();
  res.json({
    success: true,
    message: 'System reset to normal baseline',
  });
}));

router.get('/demo/scenarios', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const scenarios = syntheticDataService.getAttackScenarios();
  res.json({
    success: true,
    data: scenarios,
  });
}));

export default router;

