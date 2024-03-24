const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product], // Include associated products
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product], // Include associated products
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a category by ID
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    res.status(200).json(category);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    await category.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
