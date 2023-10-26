import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image:String,
  quantity: Number,
});

const cartObjectSchema = new mongoose.Schema({
  items: {
    type: Map,
    of: cartItemSchema,
  },
});

const CartModel = mongoose.model('Cart', {
  items: {
    type: Map,
    of: cartObjectSchema,
  },
});

export default CartModel;

