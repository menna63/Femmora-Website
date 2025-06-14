const validateCheckout = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }

    const { fname, lname, city, address, email, phone, paymentMethod, cartItems } = req.body;

    if (!fname || !lname || !city || !address || !email || !phone || !paymentMethod) {
        return res.status(400).json({
            error: "Missing required fields",
            required: ["fname", "lname", "city", "address", "email", "phone", "paymentMethod", "cartItems"]
        });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: "Cart cannot be empty" });
    }

    next();
};

module.exports = validateCheckout;