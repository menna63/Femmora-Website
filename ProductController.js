const { Product, addProduct, fetchAllProducts, removeProduct } = require('../models/Product');
const { getUserFromSession } = require('../sessions/sessionManager');

async function createProduct(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to add a product.' });
    }
    if(user.methods.getRole()!='admin')
      return res.status(404);
    const { name, price, description = '', type = '', material = '', image = '' } = req.body;

    if (!name || typeof price !== 'number') {
      return res.status(400).json({ error: 'Product name and price (number) are required.' });
    }

    const product = await addProduct(name, price, description, type, material, image);
    res.status(201).json({ message: 'Product created successfully.', productId: product._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product. Please try again later.' });
  }
}

async function getAllProducts(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to view products.' });
    }

    const products = await fetchAllProducts();

    const result = products.map(p => ({
      productId: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      type: p.type,
      material: p.material,
      image: p.image,
    }));

    res.json(result);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve products. Please try again later.' });
  }
}

async function deleteProduct(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to delete a product.' });
    }
    if(user.methods.getRole()!='admin')
      return res.status(404);
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID must be provided.' });
    }


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    await removeProduct(product);
    res.json({ message: 'Product deleted successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to delete product. Please try again later.' });
  }
}
async function editProduct(req, res) {
  try {
    const user = await getUserFromSession(req);
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in to edit a product.' });
    }
    if(user.methods.getRole()!='admin')
      return res.status(404);
    const { productId, name, price, description, type, material, image } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Invalid product name.' });
      }
      product.setName(name.trim());
    }

    if (price !== undefined) {
      if (typeof price !== 'number' || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid product price.' });
      }
      product.setPrice(price);
    }

    if (description !== undefined) product.setDescription(description);
    if (type !== undefined) product.setType(type);
    if (material !== undefined) product.setMaterial(material);
    if (image !== undefined) product.setImage(image);

    await product.save();

    res.json({ message: 'Product updated successfully.', productId: product._id });
  } catch {
    res.status(500).json({ error: 'Failed to update product. Please try again later.' });
  }
}
async function getProductPage(req, res) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }


    res.render('product', {
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        material: product.material,
        image: product.image,
      }
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getProductPage,
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct
};