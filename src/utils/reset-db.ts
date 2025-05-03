import mongoose from 'mongoose';
import config from '../config';
import { seedDatabase, recalculateRanks } from '../utils/seed-database';

// Connect to MongoDB and reset the database
// async function resetDatabase() {
//   try {
//     console.log('Connecting to MongoDB...');
//     await mongoose.connect(config.mongo.uri, config.mongo.options);
//     console.log('MongoDB Connected');
    
//     // Force reset the database
//     await seedDatabase(true);
    
//     // Recalculate ranks
//     await recalculateRanks();
    
//     console.log('Database reset complete!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error resetting database:', error);
//     process.exit(1);
//   }
// }

// resetDatabase();