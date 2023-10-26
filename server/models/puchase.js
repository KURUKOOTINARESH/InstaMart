import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    quantity: Number,
  });
  
const purchaseObjectSchema = new mongoose.Schema({
items: {
    type: Map,
    of: purchaseSchema,
},
});

const PurchaseModel = mongoose.model('Purchase', {
items: {
    type: Map,
    of: purchaseObjectSchema,
},
});

export default PurchaseModel;

