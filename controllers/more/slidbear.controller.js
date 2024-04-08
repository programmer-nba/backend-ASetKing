const { Slidbear } = require("../../model/more/slidbear.model");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    // console.log(file.originalname);
  },
});
const {
  uploadFileCreate,
  deleteFile,
} = require("../../funtions/uploadfilecreate");
const { admin } = require("googleapis/build/src/apis/admin");
const dayjs = require("dayjs");

exports.create = async (req, res) => {
  try {
    let upload = multer({ storage: storage }).array("imgCollection", 20);
    upload(req, res, async function (err) {
      const reqFiles = [];
      const result = [];
      if (err) {
        return res.status(500).send(err);
      }
      let profile_image = ""; // ตั้งตัวแปรรูป
      if (req.files) {
        const url = req.protocol + "://" + req.get("host");
        for (var i = 0; i < req.files.length; i++) {
          const src = await uploadFileCreate(req.files, res, { i, reqFiles });
          result.push(src);
          //   reqFiles.push(url + "/public/" + req.files[i].filename);
        }
        profile_image = reqFiles[0];
      }
      const admin = new Slidbear({
        profile_image: profile_image,
        func_type: req.body.func_type,
        func_detail: req.body.func_detail,
        type: req.body.type,
        subtype: req.body.subtype,
        func_discription: req.body.func_discription,
        emp: req.body.emp,
        timestamp: dayjs(Date.now()).format(""),
      });
      const add = await admin.save();
      return res.status(200).send({
        status: true,
        message: "คุณได้สร้างไอดี user เรียบร้อย",
        data: add,
      });
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const function_more = await Slidbear.find();
    if (function_more) {
      return res.status(200).send({ status: true, data: function_more });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
  } catch (err) {
    return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
  }
};

exports.getBysubgen = async (req, res) => {
  try {
    const subslidbear = await Slidbear.find({ type: "ประกาศทั่วไป" });
    if (subslidbear) {
      return res.status(200).send({ status: true, data: subslidbear });
    } else {
      return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

exports.getByproduct = async (req, res) => {
  try {
    const subslidbear = await Slidbear.find({ type: "ประกาศสินค้า" });
    if (subslidbear) {
      return res.status(200).send({ status: true, data: subslidbear });
    } else {
      return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
}

exports.EditSliBear = async (req, res) => {
  try {
    let upload = multer({ storage: storage }).array("imgCollection", 20);
    upload(req, res, async function (err) {
      const reqFiles = [];
      const result = [];
      if (err) {
        return res.status(500).send(err);
      }
      let profile_image = ""; // ตั้งตัวแปรรูป
      if (req.files) {
        const url = req.protocol + "://" + req.get("host");
        for (var i = 0; i < req.files.length; i++) {
          const src = await uploadFileCreate(req.files, res, { i, reqFiles });
          result.push(src);
        }
        profile_image = reqFiles[0];
      }
      const id = req.params.id;
      if (!req.body.password) {
        const member = await Slidbear.findByIdAndUpdate(id, {
          profile_image: profile_image,
        });
      }
      if (!req.body.admin_password) {
        const admin_new = await Slidbear.findByIdAndUpdate(id, req.body);
      } else {
        const new_passwordadmin = await Slidbear.findByIdAndUpdate(id, {
          ...req.body,
        });
      }
      return res
        .status(200)
        .send({ message: "เเก้ไขข้อมุลสำเร็จ", status: true });
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
exports.deleteSliBear = async (req, res) => {
  try {
    const id = req.params.id;
    const slidbear = await Slidbear.findByIdAndDelete(id);
    if (!slidbear) {
      return res
        .status(404)
        .send({ status: false, message: "ไม่พบข้อมูลรูปภาพ" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "ลบข้อมูลรูปภาพสำเร็จ" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "มีบางอย่างผิดพลาด" });
  }
};
