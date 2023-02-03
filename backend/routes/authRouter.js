import express from 'express';
import {
  logInController,
  homePageController,
} from '../controller/authController.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();

router.post('login', logInController);
router.get('home', checkAuth,homePageController);

export default router;
