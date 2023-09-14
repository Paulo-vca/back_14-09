const products = require('../../data/productData')
/**
 * GETALL FUNCTION
 */
exports.getAll = (req, res) => {
  // buscar em bd (respositorio)
  res.json(products);
};

/**
 * FIND PRODUCT BY ID FUNCTION
 */
exports.getOne = (req, res) => {
  const id = Number(req.params.id); // falta de converter em number (pode acontecer problem)

  const product = products.find((p) => p.id === id);

  // if (!product) return res.status(404).send("Product not found!");
  if (!product)
    return res.status(404).json({
      status: 404,
      message: "Product not found!",
    });

  res.json(product);
};

exports.addProduct = (req, res) => {
  let name = req.body.name;
  console.log(`Name iss ${name}`);
  // adicione o produto no array
  products.push({ id: products.length + 1, name: name });
  return res.json(products);
};

/**
 * UPDATE FUNCTION
 */
exports.updateProduct = (req, res) => {
  // let name = req.body.name
  let { name } = req.body;
  let id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product)
    return res.status(404).json({
      status: 404,
      message: "Product not found!",
    });

  products[id].name = name;

  return res.json(products[id]);
};
/**
 * DELETE FUNCTION
 */
exports.deleteProduct = (req, res) => {
  let id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product)
    return res.status(404).json({
      status: 404,
      message: "Product not found!",
    });

  products = products.filter((p) => p.id !== id);

  return res.json({
    status: 204,
    message: "Product deleted!",
  });
};