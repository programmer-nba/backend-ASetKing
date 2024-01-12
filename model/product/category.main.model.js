const mongoose = require("mongoose");
const Joi = require("joi");

const CategoryMainSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

const CategoryMains = mongoose.model("category_main", CategoryMainSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("ไม่มีชื่อประเภทสินค้า"),
  });
  return schema.validate(data);
};

module.exports = {CategoryMains, validate};
