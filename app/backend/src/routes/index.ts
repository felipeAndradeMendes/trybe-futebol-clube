import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';
import matchRouter from './match.routes';
import leaderBoardRouter from './leaderBoard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
