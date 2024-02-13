const router = require("express").Router();
const slidbear = require("../../controllers/more/slidbear.controller")


router.post("/", slidbear.create);
router.get("/getAll", slidbear.getAll)
module.exports = router;
