const router = require("express").Router();
const products = require("../controllers/product.controller");
router.post("/", products.addProduct);
router.get('/',products.getAllProducts);
router.get('/:id',products.getProductById);
router.put('/:id',products.updateProduct)

router.delete('/:id',products.removeProduct);
router.post("/bulk", products.bulkInsert);

module.exports = router;