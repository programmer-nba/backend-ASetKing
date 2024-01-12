const {Positions, validate} = require("../../model/user/position.model");

exports.create = async (req, res) => {
  try {
    const {error} = validate(req.body);
    if (error)
      return res
        .status(403)
        .send({message: error.details[0].message, status: false});
    const position = await Positions.findOne({
      position: req.body.position,
    });
    if (position)
      return res
        .status(401)
        .send({status: false, message: "ระดับพนักงานนี้มีในระบบแล้ว"});
    const new_position = await Positions({
      ...req.body,
    });
    new_position.save();
    return res.status(200).send({
      status: true,
      message: "เพิ่มระดับพนักงานเรียบร้อย",
      data: new_position,
    });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getPositionAll = async (req, res) => {
  try {
    const position = await Positions.find();
    if (!position)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: position});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getPositionById = async (req, res) => {
  try {
    const id = req.params.id;
    const position = await Positions.findById(id);
    if (!position)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: position});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res.status(404).send({status: false, message: "ส่งข้อมูลผิดพลาด"});
    const id = req.params.id;
    Positions.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
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
    Positions.findByIdAndDelete(id, {useFindAndModify: false})
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({message: "ไม่สามารถลบข้อมูลระดับพนักงานนี้ได้"});
        return res.status(200).send({message: "ลบข้อมูลระดับพนักงานสำเร็จ"});
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูลระดับพนักงานนี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
