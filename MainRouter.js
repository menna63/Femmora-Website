const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const productRoutes = require('./ProductRoutes');
const cartRoutes = require('./CartRoutes');
const favoriteRoutes = require('./FavoritesRoutes');
const wishlistRoutes = require('./WishlistRoutes');
const ViewsRoutes = require('./ViewsRoutes');

router.use('/', userRoutes);
router.use('/', productRoutes);
router.use('/', cartRoutes);
router.use('/', favoriteRoutes);
router.use('/', wishlistRoutes);
router.use('/', ViewsRoutes);

module.exports = router;