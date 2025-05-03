import app from './app';
import config from './config';
import { connectDB } from './config/database';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Environment: ${config.nodeEnv}`)
    })
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err)
    process.exit(1)
  })
