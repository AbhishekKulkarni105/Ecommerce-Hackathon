const router = require("express").Router();
const category = require("../controllers/category.controller");
router.post("/", category.addCategory);
router.get('/',category.getAllCategory);
router.get('/:id',category.getCategoryById);
router.delete('/:id',category.removeCategory);


module.exports = router;