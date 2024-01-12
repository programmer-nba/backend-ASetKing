const router = require("express").Router();
const employee = require("../../controllers/user/employee.controller");
const position = require("../../controllers/user/position.controller");

router.post("/", employee.create);
router.get("/", employee.getEmployeeAll);
router.get("/:id", employee.getEmployeeById);
router.put("/:id", employee.update);
router.delete("/:id", employee.delete);

router.post("/position", position.create);
router.get("/position/all", position.getPositionAll);
router.get("/position/:id", position.getPositionById);
router.put("/position/:id", position.update);
router.delete("/position/:id", position.delete);

module.exports = router;
