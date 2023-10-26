import mongoose from 'mongoose';

const productItemSchema = new mongoose.Schema({
  title: String,
  description:String,
  price: Number,
  discount:Number,
  category:String,
  imgUrl:String,
});

const productObjectSchema = new mongoose.Schema({
  items: {
    type: Map,
    of: productItemSchema,
  },
});

const ProductModel = mongoose.model('Product', {
  items: {
    type: Map,
    of: productObjectSchema,
  },
});

export default ProductModel;