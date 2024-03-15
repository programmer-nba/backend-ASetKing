const router = require("express").Router();
const subslidbear = require('../../controllers/more/subslidbear.controller');

// เพิ่มข้อมูลประเภทย่อยสินค้า
router.post("/", subslidbear.createpro);
//ดึงข้อมูลประเภทย่อยสินค้า
router.get("/", subslidbear.getAllpro);
//ดึงข้อมูลประเภทย่อยสินค้า by id
router.get("/byid/:id", subslidbear.getByIdpro);
//แก้ไขข้อมูลประเภทย่อยสินค้า
router.put("/:id", subslidbear.updatepro);
//ลบข้อมูลประเภทย่อย
router.delete("/:id", subslidbear.delete);
module.exports = router;