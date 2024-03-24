// const router = require('express').Router();
// const { Product, Tag, Category, ProductTag } = require('../../models');

// // GET all products
// router.get('/', async (req, res) => {
//   try {
//     const productData = await Product.findAll({ // Corrected syntax
//       include: [{ model: Category}, { model: Tag, attributes: ['tag_name'], through: ProductTag, as: 'productTag_products'}]
//     });

//     if (!productData || productData.length === 0) { // Checking if the array is empty
//       res.status(404).json({ message: 'No Products found' }); // Changed status code to 404
//       return;
//     }

//     res.status(200).json(productData);
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: 'Internal Server Error' }); // Changed status message
//   }
// });


// // GET a product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//       include: [Category, Tag], // Include associated category and tags
//     });
//     if (!product) {
//       res.status(404).json({ message: 'Product not found' });
//       return;
//     }
//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // CREATE a new product
// router.post('/', async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // UPDATE a product by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       res.status(404).json({ message: 'Product not found' });
//       return;
//     }
//     await product.update(req.body);
//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // DELETE a product by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       res.status(404).json({ message: 'Product not found' });
//       return;
//     }
//     await product.destroy();
//     res.status(204).end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



const router = require('express').Router();
const { Product, Tag, Category, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }] // Including only Category and Tag associations
    });

    if (!productData || productData.length === 0) {
      res.status(404).json({ message: 'No Products found' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, Tag]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    await product.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
