const router = require("express").Router();
const ip_address = require("../../controllers/more/ip.controller");

router.post("/", ip_address.create);
router.get("/", ip_address.getIPAddress);
router.get("/:id", ip_address.getIPAddressById);
router.put("/:id", ip_address.update);
router.delete("/:id", ip_address.delete);

module.exports = router;
