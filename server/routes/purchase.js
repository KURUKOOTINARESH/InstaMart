import express from "express"
import PurchaseModel from "../models/puchase.js"

const purchaseRouter = express.Router()

purchaseRouter.get("/:user_id", async(req,res)=>{
    try{
        const id = req.params.user_id
        const query = {
            [`items.${id}`]: { $exists: true }
        }
        const isPresent = await PurchaseModel.findOne(query)
        res.send(isPresent)
    }
    catch(error){
        console.log(error.message)
    }
})

purchaseRouter.post('/add', async(req,res)=>{
    try{
        const desiredKey = Object.keys(req.body)[0];
        const query = {
            [`items.${desiredKey}`]: { $exists: true }
        }
        const isPresent = await PurchaseModel.findOne(query)
        if(isPresent){
            await PurchaseModel.findOneAndReplace(query,{ items: req.body })
        }else{
            const newPurchase = new PurchaseModel({ items: req.body });
            newPurchase.save()
            .then((result) => {
                //console.log('Cart saved to the database:', result);
                res.send({message:"Item added to the Cart"})
            })
            .catch((error) => {
                console.error('Error saving cart to the database:', error);
            });
        }
    }catch(error){
        console.log(error.message)
    }
})


export default purchaseRouter