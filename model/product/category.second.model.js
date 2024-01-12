const mongoose = require("mongoose");
const Joi = require("joi");

const CategorySecondSchema = new mongoose.Schema({
  name: {type: String, required: true},
});

const CategorySeconds = mongoose.model("category_second", CategorySecondSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("ไม่มีชื่อประเภทสินค้า"),
  });
  return schema.validate(data);
};

module.exports = {CategorySeconds, validate};
