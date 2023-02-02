import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './routes/authRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

const corsOption = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'random-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on Port: ${PORT}`);
});
