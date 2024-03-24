// const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');

// // The `/api/tags` endpoint

// router.get('/', async (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
//   try {
//     const tagData = await Tag.findAll({
//       include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
//     });
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
//   try {
//     const tagData = await Tag.findByPk(req.params.id, {
//       include: [{ model: Product, through: ProductTag, as: 'productTag_products' }]
//     });
//     if (!tagData) {
//       res.status(400).json({ message: 'No Product found with this id' });
//       return;
//     }

//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   // create a new tag
//   try {
//     const tagData = await Tag.create(req.body);
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//   .then((tag) => {
//     res.status(200).json(tag);
//   }) .catch((err) => {
//     console.log(err);
//     res.status(400).json(err);
//   });
// });

// router.delete('/:id', async (req, res) => {
//   // delete on tag by its `id` value
//   try {
//     const tagData = await Tag.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     if(!tagData) {
//       res.status(404).json({message: 'No Cateogory found with that ID'});
//       return;
//     }
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;



const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product] // Including only Product association without through table
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (!tagData) {
      res.status(400).json({ message: 'No Product found with this id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (rowsDeleted === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
