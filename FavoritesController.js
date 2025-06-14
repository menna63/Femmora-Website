const { Favorites, addToFavorite, removeFromFavorite } = require('../models/Favorites');
const { getUserFromSession } = require('../sessions/sessionManager');

async function addProductToFavorites(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to add products to favorites.' });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const favoriteEntry = await addToFavorite(user, { _id: productId });
    res.status(201).json({ message: 'Product added to favorites.', favoriteEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to favorites. Please try again later.' });
  }
}

async function removeProductFromFavorites(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to remove products from favorites.' });
    }

    const { favoriteId } = req.body;
    if (!favoriteId) {
      return res.status(400).json({ error: 'Favorite entry ID is required.' });
    }

    const favoriteEntry = await Favorites.findById(favoriteId);
    if (!favoriteEntry || favoriteEntry.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ error: 'Favorite entry not found or access denied.' });
    }

    await removeFromFavorite(favoriteEntry);
    res.json({ message: 'Product removed from favorites.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from favorites. Please try again later.' });
  }
}

async function getUserFavorites(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to view your favorites.' });
    }

    const favoriteEntries = await Favorites.find({ userId: user._id }).populate('productId');
    const favorites = favoriteEntries.map(entry => ({
      favoriteId: entry._id,
      productId: entry.productId._id,
      name: entry.productId.name,
      description: entry.productId.description,
      price: entry.productId.price,
      type: entry.productId.type,
      material: entry.productId.material,
      image: entry.productId.image,
    }));

    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites. Please try again later.' });
  }
}

module.exports = {
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavorites,
};
