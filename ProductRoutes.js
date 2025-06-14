const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  getProductPage
} = require('../controllers/ProductController');


router.post('/Product/createProduct', createProduct);
router.get('/Product/getAllProducts', getAllProducts);
router.post('/Product/editProduct', editProduct);
router.post('/Product/deleteProduct', deleteProduct);


router.get('/product/:productId', getProductPage);

module.exports = router;