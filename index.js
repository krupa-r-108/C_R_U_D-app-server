// crud operations 
// create 
// delete 
// read 
// update 

// backend - mongoose atlas 
//  express 
// cors


import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/userRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000
const db_url = process.env.MONGODB_URL

app.use(cors({
    origin:true
}));
app.use(express.json())
app.use('/api',router);


mongoose.connect(db_url)
.then(()=>console.log('Database connected successfully'))
.catch((e)=>console.log(`Error in db connection ${e}`))


app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})