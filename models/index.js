// const Category = require('./category');
// const Tag = require('./tag');
// const Product = require('./product');
// const ProductTag = require('./productTag');


// Product.belongsTo(Category, {
//     foreignKey: 'category_id',
//   });
  
//   Product.belongsToMany(Tag, {
//     through: 'ProductTag',
//     as: 'productTag_products',
//     foreignKey: 'product_id',
//   });
  

//   Tag.belongsToMany(Product, {
//     through: 'ProductTag',
//     as: 'productTag_products',
//     foreignKey: 'tag_id',
//   });
  

//     Category.hasMany(Product, {
//         foreignKey: 'category_id',
//         onDelete: 'CASCADE',
//     })


//   module.exports = {
//     Category,
//     Tag,
//     ProductTag,
//     Product,
//   }


const Category = require('./category');
const Tag = require('./tag');
const Product = require('./product');
const ProductTag = require('./productTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

module.exports = {
  Category,
  Tag,
  ProductTag,
  Product,
};
