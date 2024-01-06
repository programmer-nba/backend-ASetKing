const router = require("express").Router();
const product = require("../../controllers/product/product.controller");
const category = require("../../controllers/product/category.controller");

router.post("/", product.create);
router.get("/all", product.getProductAll);
router.get("/:id", product.getProductById);
router.put("/:id", product.update);
router.delete("/:id", product.delete);

router.post("/category", category.create);
router.get("/category/all", category.getCategoryAll);
router.get("/category/:id", category.getCategoryById);
router.put("/category/:id", category.update);
router.delete("/category/:id", category.delete);

module.exports = router;
