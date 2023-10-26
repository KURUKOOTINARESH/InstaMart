import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors";
import shopperRouter from "../server/routes/shoppers.js"
import sellerRouter from "../server/routes/sellers.js" 
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import purchaseRouter from "./routes/purchase.js";

const app = express()

app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()


app.use('/shopper',shopperRouter)
app.use('/seller',sellerRouter)
app.use('/cart',cartRouter)
app.use('/purchase',purchaseRouter)
app.use('/product',productRouter)

const dbName = 'instaMart'
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, // Use the latest URL parser
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    dbName, // Specify the database name
  })
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`Server is listening on Port: ${process.env.PORT}`));
})
.catch((error) => console.log(`${error} did not connet`));

const db = mongoose.connection
db.once('open',()=>{
    console.log('Successfully connected to db')
})
db.on('error',(error)=>{
    console.log(error)
})