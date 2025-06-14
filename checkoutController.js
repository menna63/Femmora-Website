
const { Order } = require('../models/Order'); // path depends on structure

exports.processCheckout = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const {
      fname,
      lname,
      city,
      address,
      email,
      phone,
      paymentMethod,
      cartItems
    } = req.body;

    if (!fname || !lname || !city || !address || !email || !phone || !paymentMethod || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: "All fields are required and cart must not be empty",
        receivedData: req.body
      });
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
      customer: `${fname} ${lname}`,
      address: { city, address },
      contact: { email, phone },
      paymentMethod,
      cartItems,
      totalPrice,
      orderDate: new Date()
    };

    const savedOrder = await Order.createOrder(orderData);

    console.log("✅ Order processed:", savedOrder);
    return res.status(200).json({
      message: `Thank you for your order, ${fname} ${lname}!`,
      order: savedOrder
    });

  } catch (error) {
    console.error("❌ Checkout error:", error.stack || error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

