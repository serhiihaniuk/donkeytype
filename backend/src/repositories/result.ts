//@ts-nocheck
import { eq } from 'drizzle-orm';
import { resultsTable } from '../db/schema';
import { db } from '../db/setup';

class ResultRepository {
  static async registerResult({userId, time, wpm}) {
    return db
      .insert(resultsTable)
      .values({ userId: userId, time: time, wpm: wpm })
  }
  

}

export default ResultRepository;
