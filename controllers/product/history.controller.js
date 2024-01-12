const {HistoryProducts} = require("../../model/product/history.model");

exports.create = async (req, res) => {
  try {
    await new HistoryProducts({
      ...req.body,
      timestamp: Date.now(),
    }).save();
    return res
      .status(200)
      .send({status: true, message: "เก็บประวัติสินค้าสำเร็จ"});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
