const { Wishlist, addToWishlist, removeFromWishlist } = require('../models/Wishlist');
const { getUserFromSession } = require('../sessions/sessionManager');

async function addProductToWishlist(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to add products to wishlist.' });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const wishlistEntry = await addToWishlist(user, { _id: productId });
    res.status(201).json({ message: 'Product added to wishlist.', wishlistEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to wishlist. Please try again later.' });
  }
}

async function removeProductFromWishlist(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to remove products from wishlist.' });
    }

    const { wishlistId } = req.body;
    if (!wishlistId) {
      return res.status(400).json({ error: 'Wishlist entry ID is required.' });
    }

    const wishlistEntry = await Wishlist.findById(wishlistId);
    if (!wishlistEntry || wishlistEntry.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ error: 'Wishlist entry not found or access denied.' });
    }

    await removeFromWishlist(wishlistEntry);
    res.json({ message: 'Product removed from wishlist.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from wishlist. Please try again later.' });
  }
}

async function getUserWishlist(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to view your wishlist.' });
    }

    const wishlistEntries = await Wishlist.find({ userId: user._id }).populate('productId');
    const wishlist = wishlistEntries.map(entry => ({
      wishlistId: entry._id,
      productId: entry.productId._id,
      name: entry.productId.name,
      description: entry.productId.description,
      price: entry.productId.price,
      type: entry.productId.type,
      material: entry.productId.material,
      image: entry.productId.image,
    }));

    res.json({ wishlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist. Please try again later.' });
  }
}

module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  getUserWishlist,
};