
const mongoose = require('./Connector'); // path might be different
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    address: { type: String, required: true }
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true },
  cartItems: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

orderSchema.statics.createOrder = function(orderData) {
  const order = new this(orderData);
  return order.save();
};

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };

