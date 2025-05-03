import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import config from './config';
import leaderboardRoutes from './routes/leaderboard.route';
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/leaderboard', leaderboardRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    ...(config.nodeEnv === 'development' && { error: err.message }),
  });
});

export default app;