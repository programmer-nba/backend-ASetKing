const router = require("express").Router();
const slidbear = require("../../controllers/more/slidbear.controller")


router.post("/", slidbear.create);
router.get("/getAll", slidbear.getAll)
router.put("/EditSliBear/:id", slidbear.EditSliBear)
module.exports = router;
