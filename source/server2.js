import express from 'express';
import { connectToDB,db } from "./db.js";
const app = express()

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})


app.use(express.json())

app.post('/insert', async(req, res) => {
    await db.collection("login").insertOne({email:"nikhitha@gmail.com",password:1234})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})

const handleLogin = (req,res) => {
    const user= db.collection("login").findOne({email:req.body.email})
    if(user.password==req.body.prsassword)  
    {
        res.json("login sucess");
    }
    else{
        res.json("login failure");
    }
}
app.post('/login',handleLogin)
    
  


connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})



