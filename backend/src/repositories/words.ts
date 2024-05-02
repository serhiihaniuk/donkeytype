import { eq } from "drizzle-orm";
import { wordsTable } from "../db/schema";
import { db } from "../db/setup";

class WordsRepository {
  static async getWordsByName(name: string) {
    const response = await db.select().from(wordsTable).where(eq(wordsTable.name, name));
    if(!response.length){
      return null
    }
    return response
  }
}
export default WordsRepository