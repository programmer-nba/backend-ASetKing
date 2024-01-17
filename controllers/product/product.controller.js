const {Products, validate} = require("../../model/product/product.model");
const {PriceProducts} = require("../../model/product/price.product.model");

exports.create = async (req, res) => {
  try {
    const {error} = validate(req.body);
    if (error)
      return res
        .status(403)
        .send({message: error.details[0].message, status: false});
    let image = req.body.link_img;
    (image = image.replace(`https://drive.google.com/file/d/`, "")),
      (image = image.replace(`/view?usp=drive_link`, ""));

    let description = req.body.description;
    (description = description.reqplace(`<p>, "`)),
      (description = description.reqplace(`</p>`, ""));

    const number_product = await Products.findOne({
      number: req.body.number,
    });
    if (!number_product) {
      const product = await Products.findOne({
        model: req.body.model,
      });
      if (product) {
        return res
          .status(401)
          .send({status: false, message: "มีสินค้านี้ในระบบแล้ว"});
      } else {
        const new_product = await new Products({
          ...req.body,
          pricture: image,
          description: description,
        }).save();
        return res.status(200).send({
          status: true,
          message: "เพิ่มสินค้าสำเร็จ",
          data: new_product,
        });
      }
    } else {
      await updateNumber(req, res);
    }
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getProductAll = async (req, res) => {
  try {
    const product = await Products.find();
    if (!product)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: product});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: product});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res.status(404).send({status: false, message: "ส่งข้อมูลผิดพลาด"});
    const id = req.params.id;
    const data = {
      number: req.body.number,
      status: req.body.status,
      category_main: req.body.category_main,
      category_second: req.body.category_second,
      model: req.body.model,
      hl: req.body.hl,
      description: req.body.description,
      note: req.body.note,
      lnsure: req.body.lnsure,
      link_spec: req.body.link_spec,
      link_document: req.body.link_document,
      link_img: req.body.link_img,
    };
    Products.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
    })
      .then(async (item) => {
        if (!item)
          return res
            .status(404)
            .send({status: false, message: "แก้ไขข้อมูลไม่สำเร็จ"});
        const update = await Products.findOne({_id: id});
        if (update) {
          update.price.push(req.body.price);
          update.update.push(req.body.update);
        } else {
          return res
            .status(403)
            .send({message: "เกิดข้อผิดพลาดเกี่ยวกับผู้อัพเดต"});
        }
        update.save();
        return res
          .status(200)
          .send({status: true, message: "แก้ไขข้อมูลสำเร็จ", data: update});
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
    Products.findByIdAndDelete(id, {useFindAndModify: false})
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({message: "ไม่สามารถลบข้อมูลสินค้านี้ได้"});
        return res.status(200).send({message: "ลบข้อมูลสินค้าสำเร็จ"});
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูลสินค้านี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

const updateNumber = async (req, res) => {
  try {
    const product = await Products.find();
    const amount = product.length + 1;
    for (let i = req.body.number; i < amount; i++) {
      const product = await Products.findOne({
        number: i,
      });
      product.number = Number(i) + 1;
      product.save();
    }
    let image = req.body.link_img;
    (image = image.replace(`https://drive.google.com/file/d/`, "")),
      (image = image.replace(`/view?usp=drive_link`, ""));

    let description = req.body.description;
    (description = description.reqplace(`<p>, "`)),
      (description = description.reqplace(`</p>`, ""));
    const new_product = await new Products({
      ...req.body,
      pricture: image,
      description: description,
    }).save();
    return res
      .status(200)
      .send({status: true, message: "เพิ่มสินค้าสำเร็จ", data: new_product});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
