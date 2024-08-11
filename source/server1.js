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

app.post('/signup', async(req, res) => {
    
    await db.collection("ast").insertOne({Name:req.body.name,email: req.body.email,password : req.body.password})
    .then((result)=>{
        res.json(result)
        console.log(result);
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

app.post('/forgetpassword', async(req, res) => {
    await db.collection("login").findOne({Email:req.body.email})
    .then((result)=>{
        
        res.json({message:"change password",values:result})
        
    })
    .catch((e)=>console.log(e))
})
app.post('/forgetpassword', async(req, res) => {
    await db.collection("login").updateOne({Password:req.body.password})
    .then((result)=>{
        
        res.json({message:"password changed",values:result})
        
    })
    .catch((e)=>console.log(e))
})



app.post('/signIn', async(req, res) => {
    
   await db.collection("ast").findOne({email:req.body.email})
    .then((result)=>{
        if(result.password == req.body.password){
            res.json({message:"login success",values:result})
        }else{
            res.json({error:"user not found"})
        } 
     }).catch((e)=>console.log(e))})


app.post('/students', async(req, res) => {
    
    await db.collection("login").find().toArray()
     .then((result)=>{
         res.send(result)
      }).catch((e)=>console.log(e))})

      app.post('/signout',async(req,res)=>{
        try{
            req.logout();
            res.json({message:"signed out successfully"});
        }catch(error){
            console.log(error);
            res.json({error:"failed to  signout"})
        }
      })

    connectToDB(() => {
        app.listen(9000, () => {
            console.log("server running at 9000");
        })
    })
