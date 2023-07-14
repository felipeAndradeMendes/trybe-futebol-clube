import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidation from '../middlewares/LoginValidation';

const loginController = new LoginController();
const router = Router();

router.post(
  '/',
  LoginValidation.validateEmail,
  LoginValidation.validatePassword,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
