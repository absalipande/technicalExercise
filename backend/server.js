import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';

import authRouter from './routes/authRouter.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(corsMiddleware)
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'random-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'strict' },
  })
);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on Port: ${PORT}`);
});
