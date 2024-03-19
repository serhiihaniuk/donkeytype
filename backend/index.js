const express = require('express');
const { db } = require('./src/db/setup.ts'); 
const { users } = require('./src/db/schema.ts');
const router = require('./src/router')

const app = express()
app.use(express.json());
const port = 3000

// app.get('/', (req, res) => {
//   console.log('sdf')
//   res.send('Hello World!')
// })
app.use('/api', router)
// app.get('/users', async (req, res) => {
//     try {
//       const allUsers = await db.select().from(users);
//       return res.status(200).json({ success: true, data: allUsers });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, data: null, message: "Unable to get users" });
//     }
  

// })

app.listen(port, async (req, res) => {
  console.log(`Example app listening on port ${port}`)
})
