const { Products } = require("../../model/product/product.model");
const dayjs = require("dayjs");
const { PriceProducts } = require("../../model/product/price.product.model");
const {
  HistoryProducts,
} = require("../../model/product/history.edit.product.model");
const {
  ProductsHistory,
} = require("../../model/product/history.create.product.model");

exports.create = async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //   return res
    //     .status(403)
    //     .send({ message: error.details[0].message, status: false });
    let image = req.body.link_img;
    (image = image.replace(`https://drive.google.com/file/d/`, "")),
      (image = image.replace(`/view?usp=drive_link`, ""));

    let description = req.body.description;
    (description = description.replace(`<p>`, "")),
      (description = description.replace(`</p>`, ""));

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
          .send({ status: false, message: "มีสินค้านี้ในระบบแล้ว" });
      } else {
        const new_product = await new Products({
          ...req.body,
          pricture: image,
          description: description,
        }).save();

        const productsHistory = await new ProductsHistory({
          ...req.body,
          pricture: image,
          description: description,
        });
        const historyProduct = await productsHistory.save();

        return res.status(200).send({
          status: true,
          message: "เพิ่มสินค้าสำเร็จ",
          data: new_product,
          history: historyProduct,
        });
      }
    } else {
      await updateNumber(req, res);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getProductAll = async (req, res) => {
  try {
    const product = await Products.find();
    if (!product)
      return res
        .status(404)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    return res
      .status(200)
      .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: product });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(404)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    return res
      .status(200)
      .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: product });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(404)
        .send({ status: false, message: "ส่งข้อมูลผิดพลาด" });

    const id = req.params.id;

    Products.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        useFindAndModify: false,
        new: true
      }
    )
      .then(async (item) => {
        if (!item)
          return res
            .status(404)
            .send({ status: false, message: "....แก้ไขข้อมูลไม่สำเร็จ" });

        const updatedProduct = await Products.findOne({ _id: id });
        if (updatedProduct) {
          const historyData = new HistoryProducts({
            number: item.number,
            status: item.status,
            category_main: item.category_main,
            category_second: item.category_second,
            model: item.model,
            pricture: item.pricture,
            hl: item.hl,
            description: item.description,
            price: {
              one: item.price.one,
              two: item.price.two,
              tree: item.price.tree,
              four: item.price.four,
              five: item.price.five,
              six: item.price.six,
            },
            note: item.note,
            lnsure: item.lnsure,
            update: item.update,
            // link_spec: item.link_spec,
            // link_document: item.link_document,
            // link_img: item.link_img,
          });
          historyData.update.push(req.body.update);
          const historyProduct = await historyData.save();
          if (historyProduct) {
            return res.status(200).send({
              status: true,
              message: "แก้ไขข้อมูลสำเร็จ",
              data: updatedProduct,
            });
          } else {
            return res.status(500).send({
              status: false,
              message: "เกิดข้อผิดพลาดในการบันทึกประวัติ",
            });
          }
        } else {
          return res
            .status(403)
            .send({ message: "เกิดข้อผิดพลาดเกี่ยวกับผู้อัปเดต" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ status: false, message: err.message + id });
      });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    Products.findByIdAndDelete(id, { useFindAndModify: false })
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({ message: "ไม่สามารถลบข้อมูลสินค้านี้ได้" });
        return res.status(200).send({ message: "ลบข้อมูลสินค้าสำเร็จ" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูลสินค้านี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

//ดึงประวัติการเเก้ไขข้อมุลสินค้า
exports.GetAllHistory = async (req, res) => {
  try {
    const history = await HistoryProducts.find();
    if (history.length > 0) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลประวัติการเเก้ไข้ข้อมูลสินค้าสำเร็จ",
        data: history,
      });
    } else {
      return res.status(404).send({
        message: "ดึงข้อมูลประวัติการเเก้ไข้ข้อมูลสินค้าไมสำเร็จ",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
};
exports.GetHistoryID = async (req, res) => {
  try {
    const id = req.params.id;
    const history = await HistoryProducts.findOne({ _id: id });
    if (history) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลประวัติการทำงานสำเร็จ",
        data: history,
      });
    } else {
      return res
        .status(404)
        .send({ message: "ดึงข้อมูลประวัติการทำงานไม่สำเร็จ", status: false });
    }
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
exports.GetHistoryByNumber = async (req, res) => {
  try {
    const number = req.params.number; 
    const history = await HistoryProducts.find({ number: number });
    console.log(history)
    if (history) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลประวัติการทำงานสำเร็จ",
        data: history,
      });
    } else {
      return res
        .status(404)
        .send({ message: "ดึงข้อมูลประวัติการทำงานไม่สำเร็จ", status: false });
    }
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

//ดึงประวัติการสร้างสินค้า
exports.GetAllHistoryCreate = async (req, res) => {
  try {
    const history = await ProductsHistory.find();
    if (history.length > 0) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลประวัติการสร้างสินค้าสำเร็จ",
        data: history,
      });
    } else {
      return res.status(404).send({
        message: "ดึงข้อมูลประวัติการสร้างสินค้าไม่สำเร็จ",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
};
exports.GetHistoryCreateID = async (req, res) => {
  try {
    const id = req.params.id;
    const history = await ProductsHistory.findOne({ _id: id });
    if (history) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลประวัติการสร้างสินค้าสำเร็จ",
        data: history,
      });
    } else {
      return res.status(404).send({
        message: "ดึงข้อมูลประวัติการสร้างสินค้าไม่สำเร็จ",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

//เพิ่่มสถาณะ inactive
exports.inactiveProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const updateStatus = await Products.findOneAndUpdate(
      { _id: id },
      { $set: { status: "inactive" } },
      { new: true }
    );

    if (updateStatus) {
      return res.status(200).send({
        status: true,
        message: "inactive success",
        data: updateStatus,
      });
    } else {
      return res.status(500).send({
        message: "มีบางอย่างผิดพลาด",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, status: false });
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
    (description = description.replace(`<p>`, "")),
      (description = description.replace(`</p>`, ""));
    const new_product = await new Products({
      ...req.body,
      pricture: image,
      description: description,
    }).save();
    return res
      .status(200)
      .send({ status: true, message: "เพิ่มสินค้าสำเร็จ", data: new_product });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
