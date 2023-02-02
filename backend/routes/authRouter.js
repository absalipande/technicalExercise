import express from 'express';
import {
  logInController,
  homePageController,
} from '../controller/authController.js';

const router = express.Router();

router.post('login', logInController);
router.get('home', homePageController);

export default router;
