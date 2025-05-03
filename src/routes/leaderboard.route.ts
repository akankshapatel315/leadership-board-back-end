import { Router } from 'express';
import { getLeaderboard } from '../controllers/leadership.controller';

const router = Router();

// Get all leaderboard entries
router.get('/', getLeaderboard);



export default router;