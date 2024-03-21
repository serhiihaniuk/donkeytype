// import { db } from '../db/setup';
// import { users } from '../db/schema';
// import bcrypt from 'bcrypt';
// import { eq } from 'drizzle-orm';


// class UserServiceClass {

//   async registration(email: string, password: string) {
//     try{
//       const candidate = await db.select().from(users).where(eq(users.email, email))
//       if(candidate) {
//         throw new Error('Email is already registered')
//       }
//     }
//     catch(e){
//       throw new Error(e)
//     }
      

    
//     const hashPassword = await bcrypt.hash(password, 3)
//     const user = await db.insert(users).values({name: 'userr', email: email, password: hashPassword})
    
//   }

// }
// export const UserService = new UserServiceClass