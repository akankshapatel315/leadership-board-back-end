import User from "../models/user.model";
import Activity from "../models/activity.model";
import mongoose from "mongoose";

// Sample user data
const users = [
  {
    userId: 1,
    fullName: "Angela Hunter",
    totalPoints: 1280,
    rank: 1,
    createdAt: "2025-04-14T00:07:01.000Z",
    updatedAt: "2025-05-01T00:07:01.000Z",
  },
  {
    userId: 2,
    fullName: "Justin Mack",
    totalPoints: 957,
    rank: 2,
    createdAt: "2025-04-16T04:41:43.000Z",
    updatedAt: "2025-05-03T04:41:43.000Z",
  },
  {
    userId: 3,
    fullName: "Kimberly Love",
    totalPoints: 1482,
    rank: 3,
    createdAt: "2025-04-21T10:47:51.000Z",
    updatedAt: "2025-04-25T10:47:51.000Z",
  },
  {
    userId: 4,
    fullName: "David Lee",
    totalPoints: 1100,
    rank: 4,
    createdAt: "2025-03-28T08:30:00.000Z",
    updatedAt: "2025-04-15T09:30:00.000Z",
  },
  {
    userId: 5,
    fullName: "Alice Smith",
    totalPoints: 1020,
    rank: 5,
    createdAt: "2025-02-14T02:15:30.000Z",
    updatedAt: "2025-02-18T05:22:15.000Z",
  },
  {
    userId: 6,
    fullName: "Bob Johnson",
    totalPoints: 1450,
    rank: 6,
    createdAt: "2025-04-01T11:10:00.000Z",
    updatedAt: "2025-04-30T11:10:00.000Z",
  },
  {
    userId: 7,
    fullName: "Catherine Garcia",
    totalPoints: 975,
    rank: 7,
    createdAt: "2025-03-12T06:20:00.000Z",

    updatedAt: "2025-03-20T06:20:00.000Z",
  },
  {
    userId: 8,
    fullName: "Daniel Thomas",
    totalPoints: 800,
    rank: 8,
    createdAt: "2025-01-10T14:05:30.000Z",
    updatedAt: "2025-01-15T14:10:00.000Z",
  },
  {
    userId: 9,
    fullName: "Eva Martinez",
    totalPoints: 1340,
    rank: 9,
    createdAt: "2025-03-25T05:50:00.000Z",

    updatedAt: "2025-03-28T05:50:00.000Z",
  },
  {
    userId: 10,
    fullName: "Frank Lee",
    totalPoints: 1110,
    rank: 10,
    createdAt: "2025-02-25T07:00:00.000Z",
    updatedAt: "2025-03-02T07:00:00.000Z",
  },
];

const additionalUsers = [
  {
    userId: 11,
    fullName: "George Wilson",
    totalPoints: 1482, // Same as Kimberly Love
    rank: 0, // Will be calculated
    createdAt: "2025-03-15T09:30:00.000Z",
    updatedAt: "2025-04-01T10:15:00.000Z",
  },
  {
    userId: 12,
    fullName: "Hannah Brown",
    totalPoints: 1450, // Same as Bob Johnson
    rank: 0, // Will be calculated
    createdAt: "2025-02-20T13:45:00.000Z",

    updatedAt: "2025-03-10T08:20:00.000Z",
  },
  // Same points as dummy009 (1340)
  {
    userId: 13,
    fullName: "Ian Taylor",
    totalPoints: 1340, // Same as Eva Martinez
    rank: 0, // Will be calculated
    createdAt: "2025-01-25T11:30:00.000Z",

    updatedAt: "2025-02-05T14:40:00.000Z",
  },
  // Same points as dummy001 (1280)
  {
    userId: 14,
    fullName: "Jessica Adams",
    totalPoints: 1280, // Same as Angela Hunter
    rank: 0, // Will be calculated
    createdAt: "2025-04-05T16:20:00.000Z",

    updatedAt: "2025-04-20T12:10:00.000Z",
  },
  {
    userId: 15,
    fullName: "Kevin Wright",
    totalPoints: 1110, // Same as Frank Lee
    rank: 0, // Will be calculated
    createdAt: "2025-03-05T10:15:00.000Z",

    updatedAt: "2025-03-25T09:30:00.000Z",
  },
];

export const seedDatabase = async (
  forceReset: boolean = false
): Promise<void> => {
  try {
    // Check if we already have data
    const userCount = await User.countDocuments();

    // Only seed if the database is empty or if forceReset is true
    if (userCount === 0 || forceReset) {
      console.log("Seeding database...");

      if (forceReset) {
        console.log("Clearing existing data...");
        await User.deleteMany({});
      }

      console.log("Inserting users...");

      // Insert the users and additional users
      await User.insertMany([...users, ...additionalUsers]);

      console.log("Database seeded successfully!");
    } else {
      console.log("Database already contains data. Skipping seed operation.");
      console.log(`Found ${userCount} users in the database.`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
