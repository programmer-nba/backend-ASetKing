const mongoose = require("mongoose");
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  number: {type: Number, required: true},
  status: {type: String, required: false, default: ""},
  category_main: {type: String, require: true},
  category_second: {type: String, require: false, default: ""},
  model: {type: String, require: true},
  pricture: {type: String, require: false, default: ""},
  hl: {type: String, require: true},
  description: {type: String, require: true},
  price: {type: Array, required: false, default: []},
  note: {type: String, require: false, default: ""},
  lnsure: {type: String, require: false, default: ""}, //ประกัน
  update: {type: Array, required: false, default: []},
  link_spec: {type: String, require: false, default: ""},
  link_document: {type: String, require: false, default: ""},
  link_img: {type: String, require: false, default: ""},
});

const Products = mongoose.model("product", ProductSchema);

const validate = (data) => {
  const schema = Joi.object({
    number: Joi.number().required(),
    status: Joi.string().default(""),
    category_main: Joi.string().required(),
    category_second: Joi.string().default(""),
    model: Joi.string().required(),
    pricture: Joi.string().default(""),
    hl: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.array().default([]),
    note: Joi.string().default(""),
    lnsure: Joi.string().default(""),
    update: Joi.array().default([]),
    link_spec: Joi.string().default(""),
    link_document: Joi.string().default(""),
    link_img: Joi.string().default(""),
  });
  return schema.validate(data);
};

module.exports = {Products, validate};
