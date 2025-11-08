import { Router, Request, Response } from 'express';
import { communityIssuesService } from '../services/community-issues.service.js';
import { ErrorHandler } from '../middleware/error-handler.middleware.js';
import { IssueStatus } from '../types/index.js';

const router = Router();

router.get('/issues', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const status = req.query.status as IssueStatus | undefined;
  const priority = req.query.priority as string | undefined;

  const issues = communityIssuesService.getAllIssues(status, priority);

  res.json({
    success: true,
    data: issues,
    count: issues.length,
  });
}));

router.get('/issues/unread-count', ErrorHandler.asyncHandler(async (_req: Request, res: Response) => {
  const count = communityIssuesService.getUnreadCount();

  res.json({
    success: true,
    data: { count },
  });
}));

router.get('/issues/:id', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid issue ID',
    });
    return;
  }

  try {
    const issue = communityIssuesService.getIssueById(id);
    res.json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error instanceof Error ? error.message : 'Issue not found',
    });
  }
}));

router.patch('/issues/:id/status', ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      error: 'Invalid issue ID',
    });
    return;
  }

  const validStatuses: IssueStatus[] = ['new', 'acknowledged', 'resolved'];
  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
    return;
  }

  try {
    const updatedIssue = communityIssuesService.updateIssueStatus(id, status);
    res.json({
      success: true,
      data: updatedIssue,
      message: `Issue status updated to ${status}`,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error instanceof Error ? error.message : 'Issue not found',
    });
  }
}));

export default router;

