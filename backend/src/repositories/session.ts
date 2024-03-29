// @ts-nocheck
import { eq } from 'drizzle-orm';
import { refreshSessions } from '../db/schema';
import { db } from '../db/setup';

class RefreshSessionsRepository {
  static async getRefreshSessions(refreshToken) {
    const response = await db
      .select()
      .from(refreshSessions)
      .where(eq(refreshSessions.refreshToken, refreshToken));
    if (!response) {
      return null;
    }

    return response[0];
  }
  static async createRefreshSession({ id, refreshToken, fingerprint }) {
    await db.insert(refreshSessions).values({
      userId: id,
      refreshToken: refreshToken,
      fingerPrint: fingerprint.hash,
    });
  }
  static async deleteRefreshSession(refreshToken) {
    await db
      .delete(refreshSessions)
      .where(eq(refreshSessions.refreshToken, refreshToken));
  }
}
export default RefreshSessionsRepository;
