import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidation from '../middlewares/LoginValidation';

const matchController = new MatchController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  LoginValidation.validateJWT,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
