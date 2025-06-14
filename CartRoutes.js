const express = require('express');
const router = express.Router();

const {
  addProductToCart,
  removeProductFromCart,
  getUserCart,
} = require('../controllers/CartController');

router.post('/Cart/add', addProductToCart);


router.post('/Cart/remove', removeProductFromCart);


router.get('/Cart', getUserCart);

module.exports = router;