// @ts-nocheck
import { resultsTable } from '../db/schema';
import { eq } from "drizzle-orm";
import { db } from '../db/setup';

class ResultRepository {
  static async registerResult({ userId, time, wpm }) {
    return db
      .insert(resultsTable)
      .values({ userId: userId, time: time, wpm: wpm });
  }
  static async getResultsById(userId){
    console.log(userId)
    return db.select().from(resultsTable).where(eq(resultsTable.userId, userId))
  }
}

export default ResultRepository;
