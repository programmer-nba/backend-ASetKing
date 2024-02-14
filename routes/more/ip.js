const router = require("express").Router();
const ip_address = require("../../controllers/more/ip.controller");

router.post("/", ip_address.create);
router.get("/", ip_address.getIPAddress);
router.get("/employee/:employee_id", ip_address.getIPAddressByEmployeeId);
router.get("/:id", ip_address.getIPAddressById);
router.put("/:id", ip_address.update);
router.delete("/:id", ip_address.delete);

router.post("/getMacAddress", ip_address.getMacAddress)

module.exports = router;
