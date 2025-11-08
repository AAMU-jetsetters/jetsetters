import { Router, Request, Response } from 'express';
import { statusCalculator } from '../services/status-calculator.service.js';
import { waterDataService } from '../services/water-data.service.js';
import { communityIssuesService } from '../services/community-issues.service.js';
import { ErrorHandler } from '../middleware/error-handler.middleware.js';

const router = Router();

router.get('/status', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
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

router.get('/risk-index', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  const riskIndex = waterDataService.getWaterRiskIndex();
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

router.get('/chemicals', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  const currentState = waterDataService.getCurrentState();
  res.json({
    success: true,
    data: currentState.chemicals.map((chem) =>
      statusCalculator.formatChemicalReading(chem)
    ),
  });
}));

router.get('/health-advisory', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  const status = statusCalculator.getPublicStatus();
  res.json({
    success: true,
    data: status.healthAdvisory,
  });
}));

router.post('/demo/attack', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const { scenarioId } = req.body;
  
  if (!scenarioId) {
    res.status(400).json({
      success: false,
      error: 'scenarioId is required',
    });
    return;
  }

  const success = waterDataService.triggerAttack(scenarioId);
  
  if (!success) {
    res.status(404).json({
      success: false,
      error: 'Attack scenario not found',
    });
    return;
  }

  res.json({
    success: true,
    message: `Attack scenario '${scenarioId}' triggered`,
  });
}));

router.post('/demo/reset', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  waterDataService.resetToBaseline();
  res.json({
    success: true,
    message: 'System reset to normal baseline',
  });
}));

router.get('/demo/scenarios', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  const scenarios = waterDataService.getAttackScenarios();
  res.json({
    success: true,
    data: scenarios,
  });
}));

router.get('/history', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const days = parseInt(req.query.days as string) || 7;
  const limit = days * 24;
  const history = waterDataService.getHistory(limit);
  
  const formattedHistory = history.map((point) => ({
    timestamp: point.timestamp,
    riskIndex: point.riskIndex,
    chemicals: point.chemicals.map((chem) => ({
      parameter: chem.parameter,
      value: chem.value,
      unit: chem.unit,
      status: chem.status,
    })),
  }));
  
  res.json({
    success: true,
    data: formattedHistory,
  });
}));

router.post('/report-issue', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const { issueType, description, location, priority, contactEmail, contactPhone } = req.body;

  if (!issueType || !description || !location || !priority) {
    res.status(400).json({
      success: false,
      error: 'Missing required fields: issueType, description, location, priority',
    });
    return;
  }

  const validPriorities = ['Low', 'Medium', 'High', 'Urgent'];
  if (!validPriorities.includes(priority)) {
    res.status(400).json({
      success: false,
      error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}`,
    });
    return;
  }

  const issue = communityIssuesService.submitIssue({
    issueType,
    description,
    location,
    priority,
    contactEmail,
    contactPhone,
  });

  res.status(201).json({
    success: true,
    data: issue,
    message: 'Issue reported successfully',
  });
}));

export default router;

