const { Cart, addToCart, removeFromCart } = require('../models/Cart');
const { getUserFromSession } = require('../sessions/sessionManager');

async function addProductToCart(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to add products to cart.' });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const cartEntry = await addToCart(user, { _id: productId });
    res.status(201).json({ message: 'Product added to cart.', cartEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart. Please try again later.' });
  }
}

async function removeProductFromCart(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to remove products from cart.' });
    }

    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ error: 'Cart entry ID is required.' });
    }


    const cartEntry = await Cart.findById(cartId);
    if (!cartEntry || cartEntry.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ error: 'Cart entry not found or access denied.' });
    }

    await removeFromCart(cartEntry);
    res.json({ message: 'Product removed from cart.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from cart. Please try again later.' });
  }
}

async function getUserCart(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to view your cart.' });
    }


    const cartEntries = await Cart.find({ userId: user._id }).populate('productId');
    const cart = cartEntries.map(entry => ({
      cartId: entry._id,
      productId: entry.productId._id,
      name: entry.productId.name,
      description: entry.productId.description,
      price: entry.productId.price,
      type: entry.productId.type,
      material: entry.productId.material,
      image: entry.productId.image,
    }));

    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart. Please try again later.' });
  }
}

module.exports = {
  addProductToCart,
  removeProductFromCart,
  getUserCart,
};