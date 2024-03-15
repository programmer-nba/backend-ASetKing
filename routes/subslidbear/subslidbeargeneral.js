const router = require("express").Router();
const subslidbeargeneral = require('../../controllers/more/subslidbear.controller');

//เพิ่มข้อมูลประเภทย่อยทั่วไป
router.post("/", subslidbeargeneral.creategen);
//ดึงข้อมูลประเภทย่อยทั่วไป
router.get("/", subslidbeargeneral.getAllgen);

//ดึงข้อมูลประเภทย่อยทั่วไป  by id
router.get("/byid/:id", subslidbeargeneral.getByIdgen);

//แก้ไขข้อมูลประเภทย่อยทั่วไป
router.put("/:id", subslidbeargeneral.updategen);
//ลบข้อมูลประเภทย่อย
router.delete("/:id", subslidbeargeneral.delete);

module.exports = router;