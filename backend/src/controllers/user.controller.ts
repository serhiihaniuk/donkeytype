//@ts-nocheck
import { db } from '../db/setup'
import { users } from '../db/schema';
import { Response} from 'express';

   
export async function registerUser () {
  try {

  } catch (e) {

  }
}

export async function loginUser () {
  try {
    
  } catch (e) {
    
  }
}

export async function logoutUser () {
  try {
    
  } catch (e) {
    
  }
}


export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    return res.status(200).json({ success: true, data: allUsers });
  } catch (e) {
    throw new Error(e)
  }
}

