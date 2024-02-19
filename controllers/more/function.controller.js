const { FunctionMore, validate } = require("../../model/more/function.model");
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

exports.create = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.details[0].message });
    }
    const check_name = await FunctionMore.findOne({
      func_name: req.body.func_name,
    });
    if (check_name) {
      return res.status(400).send({
        status: false,
        message: "ชื่อฟังก์ชั่นนี้มีในระบบเรียบร้อยแล้ว",
      });
    }
    const function_more = await FunctionMore.create(req.body);

    if (function_more) {
      return res.status(201).send({ status: true, data: function_more });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "เพิ่มข้อมูลไม่สำเร็จ" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const function_more = await FunctionMore.find();
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

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const function_more = await FunctionMore.findById(id);
    if (function_more) {
      return res.status(200).send({ status: true, data: function_more });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
  }
};

exports.getByFunctionName = async (req, res) => {
  try {
    const func_name = req.params.func_name;
    const function_more = await FunctionMore.findOne({ func_name: func_name });
    if (function_more) {
      return res.status(200).send({ status: true, data: function_more });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
  }
};

exports.update = async (req, res) => {
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
        const member = await FunctionMore.findByIdAndUpdate(id, {
          profile_image: profile_image,
        });
      }
      if (!req.body.admin_password) {
        const admin_new = await FunctionMore.findByIdAndUpdate(id, req.body);
      } else {
        const new_passwordadmin = await FunctionMore.findByIdAndUpdate(id, {
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

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    FunctionMore.findByIdAndDelete(id, { useFindAndModify: false })
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({ message: "ไม่สามารถลบข้อมูล Function นี้ได้" });
        return res.status(200).send({ message: "ลบข้อมูล Function สำเร็จ" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูล Function นี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
