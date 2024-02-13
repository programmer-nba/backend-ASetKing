const router = require("express").Router();
const product = require("../../controllers/product/product.controller");
const category_main = require("../../controllers/product/category.main.controller");
const category_second = require("../../controllers/product/category.second.controller");
const price_product = require("../../controllers/product/price.controller");

router.post("/", product.create);
router.get("/all", product.getProductAll);
router.get("/:id", product.getProductById);
router.put("/:id", product.update);
router.delete("/:id", product.delete);

// Category Main
router.post("/category/main", category_main.create);
router.get("/category/main/all", category_main.getCategoryAll);
router.get("/category/main/:id", category_main.getCategoryById);
router.put("/category/main/:id", category_main.update);
router.delete("/category/main/:id", category_main.delete);

// Category Second
router.post("/category/second", category_second.create);
router.get("/category/second/all", category_second.getCategoryAll);
router.get("/category/second/:id", category_second.getCategoryById);
router.put("/category/second/:id", category_second.update);
router.delete("/category/second/:id", category_second.delete);

// Price Product
router.get("/price/:id", price_product.getPriceProduct);


//get history edit
router.get("/GetHistory/All",product.GetAllHistory)
router.get("/GetHistoryBy/:id",product.GetHistoryID)
router.get("/GetHistoryByNumber/All/:number",product.GetHistoryByNumber)

//get history create
router.get("/GetHistoryCreate/All",product.GetAllHistoryCreate)
router.get("/GetHistoryCreate/:id",product.GetHistoryCreateID)

//put status inactive
router.put("/inactiveProduct/:id",product.inactiveProduct)


module.exports = router;
