// @ts-nocheck
import { resultsTable, usersTable } from '../db/schema';
import { eq, max, desc } from 'drizzle-orm';
import { db } from '../db/setup';

class ResultRepository {
  static async registerResult({ userId, time, wpm }) {
    return db
      .insert(resultsTable)
      .values({ userId: userId, time: time, wpm: wpm });
  }
  static async getResultsById(userId) {
    return db
      .select()
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId));
  }
  static async getResultsById(userId) {
    return db
      .select()
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId));
  }
  static async getBestResults({ time }) {
    return db
      .select({
        username: usersTable.username,
        wpm: max(resultsTable.wpm),
      })
      .from(resultsTable)
      .where(eq(resultsTable.time, time))
      .innerJoin(usersTable, eq(resultsTable.userId, usersTable.id))
      .groupBy(usersTable.username)
      .orderBy(desc(max(resultsTable.wpm)))
  }
}

export default ResultRepository;
