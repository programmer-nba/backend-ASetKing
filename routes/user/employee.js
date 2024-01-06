const router = require("express").Router();
const employee = require("../../controllers/user/employee.controller");

router.post("/", employee.create);
router.get("/", employee.getEmployeeAll);
router.get("/:id", employee.getEmployeeById);
router.put("/:id", employee.update);
router.delete("/:id", employee.delete);

module.exports = router;
