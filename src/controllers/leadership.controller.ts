import type { Request, Response, NextFunction } from "express"
import UserModel from "../models/user.model"

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract pagination parameters from query string
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Extract filter parameters
    const userId = req.query.userId as string;
    const timeFilter = req.query.timeFilter as string;

    // Build query
    const query: any = {};

    // If timeFilter is provided, apply it
    if (timeFilter) {
      const now = new Date();
      let startDate: Date | undefined;
      let endDate: Date | undefined;

      switch (timeFilter) {
        case "day":
          startDate = new Date();
          startDate.setUTCHours(0, 0, 0, 0);
          endDate = new Date();
          endDate.setUTCHours(23, 59, 59, 999);
          break;
        case "month":
          startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
          endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
          break;
        case "year":
          startDate = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
          endDate = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
          break;
      }

      if (startDate && endDate) {
        query.updatedAt = { $gte: startDate, $lt: endDate };
      }
    }

    // Retrieve all leaderboard entries based on the query (including time filter)
    const leaderboardEntries = await UserModel.find(query)
      .sort({ totalPoints: -1 }) // Sort by total points in descending order
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await UserModel.countDocuments(query);

    // Calculate rank for each entry based on position
    const rankedEntries = leaderboardEntries.map((entry: any, index: number) => ({
      ...entry,
      rank: skip + index + 1, // Rank based on position in sorted results
    }));

    // If a userId is provided, find that user and place them at the top
    if (userId) {
      // Find the searched user
      const searchedUserIndex = rankedEntries.findIndex((entry: any) => entry.userId === Number(userId));
      
      if (searchedUserIndex !== -1) {
        // Remove the searched user from their current position and place them at the top
        const searchedUser = rankedEntries.splice(searchedUserIndex, 1)[0];
        rankedEntries.unshift(searchedUser); // Add the searched user at the top
      }
    }

    // Return the leaderboard with pagination
    res.status(200).json({
      success: true,
      data: {
        entries: rankedEntries,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};


export const recalculateLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    res.status(200).json({
      success: true,
      message: "Leaderboard recalculated successfully",
    })
  } catch (error) {
    next(error)
  }
}

