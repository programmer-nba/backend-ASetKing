const {
  PriceProducts,
  validate,
} = require("../../model/product/price.product.model");

exports.getPriceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const price_product = await PriceProducts.findOne({
      product_id: id,
    });
    if (!price_product)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: price_product});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
