const router = require("express").Router();
const slidbear = require("../../controllers/more/slidbear.controller")


router.post("/", slidbear.create);
module.exports = router;
