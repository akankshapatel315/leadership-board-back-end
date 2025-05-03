import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongo: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/leader-board",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export default config;