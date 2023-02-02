import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import authRouter from './routes/authRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.json());
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
