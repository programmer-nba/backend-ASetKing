const mongoose = require("mongoose");
const Joi = require("joi");

const ProductPriceSchema = new mongoose.Schema({
  product_id: {type: String, required: true},
  price: {type: Array, required: false, default: []},
  timestamp: {type: Array, required: false, default: []},
});

const PriceProducts = mongoose.model("price_product", ProductPriceSchema);

const validate = (data) => {
  const schema = Joi.object({
    product_id: Joi.string().required().label("กรอกไอดีสินค้า"),
    price: Joi.array().default([]),
    timestamp: Joi.array().default([]),
  });
  return schema.validate(data);
};

module.exports = {PriceProducts, validate};
