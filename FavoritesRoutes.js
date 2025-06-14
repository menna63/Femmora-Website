const express = require('express');
const router = express.Router();

const {
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavorites,
} = require('../controllers/FavoritesController');

router.post('/Favorites/add', addProductToFavorites);

router.post('/Favorites/remove', removeProductFromFavorites);

router.get('/Favorites', getUserFavorites);

module.exports = router;