/* const Product = require('../models/Product');

// GET /Shop/products?page=1&search=bracelet
async function getAllProducts(req, res) {
  try {
    const { page = 1, limit = 6, search = '' } = req.query;

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
}

// GET /Shop/product/:productId
async function getProductById(req, res) {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
};
 */