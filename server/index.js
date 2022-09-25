import express from 'express'
import Bodyparser  from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
//my Routes
import Customer from "./routes/customer.js"
import Admin from './routes/admin.js'

//end routes
const app= express()
app.use(cors())
app.use(Bodyparser.json())
app.use(Bodyparser.text())
app.use(express.json())
app.use(Bodyparser.urlencoded({extended:true}))
// my Routes
app.use('/api/admin',Admin)
app.use("/api/post",Customer)


mongoose.connect(process.env.MONGOD)
.then(()=>console.log('db is connected'))
.catch(()=>console.log('cannot connect db'))

const port=process.env.PORT || 2022
app.listen(port,()=>{
    console.log(`server is running on ${port} `);
})
