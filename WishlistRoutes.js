const express = require('express');
const router = express.Router();

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getUserWishlist,
} = require('../controllers/WishlistController');

router.post('/Wishlist/add', addProductToWishlist);

router.post('/Wishlist/remove', removeProductFromWishlist);

router.get('/Wishlist', getUserWishlist);

module.exports = router;