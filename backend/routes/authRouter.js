import express from 'express';
import {
  logInController,
  territoryController,
} from '../controller/authController.js';

const router = express.Router();

router.post('login', logInController);
router.get('home', territoryController);

export default router;
