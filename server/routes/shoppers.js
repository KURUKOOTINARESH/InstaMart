import express from "express"
import bcrypt from "bcryptjs"
import shopper from "../models/shopper.js"
import jwt from "jsonwebtoken"

const shopperRouter = express.Router()

shopperRouter.post('/signup', async(req,res)=>{
    const {email,username,password} = req.body
    const salt = await bcrypt.genSalt(10)
    const encryptedPasssword = await bcrypt.hashSync(password,salt)
    try{
        await shopper.create({
            email,
            username,
            password:encryptedPasssword
        })
        res.status(200).json("Shopper account created successfully")
    }catch(error){
        console.log(error.message)
    }
})

shopperRouter.post('/signin', async(req,res)=>{
    const {email,password} = req.body
    const userObj =await shopper.findOne({email})
    if(!userObj){
        res.send({error:"User doesn't exist"})
    }
    else{
        const isValid = await bcrypt.compare(password,userObj.password)
        if(isValid){
            const token = jwt.sign({
                userId:userObj._id,
                email:email,
                type:'user'
            },process.env.JWT,{expiresIn:'2h'})
            //console.log(token)
            res.cookie('token', token, {
                maxAge: 2*60*60*1000,
            }).send({message:"Authentication successfully completed",token,userId:userObj._id})
        }
        else{
            res.send({error:"Invalid email or password"})
        }
    }
})
export default shopperRouter