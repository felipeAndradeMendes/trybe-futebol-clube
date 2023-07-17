import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
// import LoginValidation from '../middlewares/LoginValidation';

const leaderBoardController = new LeaderBoardController();
const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeLeaderBoard(req, res),
);

export default router;
