import express from 'express';
import {
  loginController,
  territoryController,
} from '../controller/authController.js';

const router = express.Router();

router.post('login', loginController);
router.get('home', territoryController);

export default router;
