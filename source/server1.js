import cors from 'cors';
import express from 'express';
import { connectToDB,db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

app.post('/insert', async(req, res) => {
    
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

app.post('/insertmany', async(req, res) => {
    await db.collection("ast").insertMany(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})


connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})