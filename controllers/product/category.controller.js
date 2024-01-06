const {Categorys, validate} = require("../../model/product/category.model");

exports.create = async (req, res) => {
  try {
    const {error} = validate(req.body);
    if (error)
      return res
        .status(403)
        .send({message: error.details[0].message, status: false});
    const category = await Categorys.findOne({name: req.body.name});
    if (category)
      return res
        .status(401)
        .send({status: false, message: "มีประสินค้านี้ในระบบแล้ว"});
    await new Categorys({
      ...req.body,
    }).save();
    return res
      .status(200)
      .send({status: true, message: "เพิ่มประเภทสินค้าสำเร็จ"});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getCategoryAll = async (req, res) => {
  try {
    const category = await Categorys.find();
    if (!category)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: category});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Categorys.findById(id);
    if (!category)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: category});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res.status(404).send({status: false, message: "ส่งข้อมูลผิดพลาด"});
    const id = req.params.id;
    Categorys.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({status: false, message: "แก้ไขข้อมูลไม่สำเร็จ"});
        return res
          .status(200)
          .send({status: true, message: "แก้ไขข้อมูลสำเร็จ"});
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({status: false, message: "มีบางอย่างผิดพลาด" + id});
      });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    Categorys.findByIdAndDelete(id, {useFindAndModify: false})
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({message: "ไม่สามารถลบข้อมูลประเภทสินค้านี้ได้"});
        return res.status(200).send({message: "ลบข้อมูลประเภทสินค้าสำเร็จ"});
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูลประเภทสินค้านี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
