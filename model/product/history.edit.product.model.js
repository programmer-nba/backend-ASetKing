const mongoose = require("mongoose");
const Joi = require("joi");

const HistoryProductSchema = new mongoose.Schema({
  number: { type: String, required: false },
  status: { type: String, required: false, default: "" },
  category_main: { type: String, require: true },
  category_second: { type: String, require: false, default: "" },
  model: { type: String, require: true },
  pricture: { type: String, require: false, default: "" },
  hl: { type: String, require: true },
  description: { type: String, require: true },
  price: {
    type: {
      one: { type: String, required: false },
      two: { type: String, required: false },
      tree: { type: String, required: false },
      four: { type: String, required: false },
      five: { type: String, required: false },
      six: { type: String, required: false },
    },
  },
  note: { type: String, require: false, default: "" },
  lnsure: { type: String, require: false, default: "" }, //ประกัน
  update: { type: Array, required: false, default: [] },
  link_spec: { type: String, require: false, default: "" },
  link_document: { type: [{
    name: { type: String, require: false, default: "" },
    link: { type: String, require: false, default: "" },
  }], require: false, default: "" },
  link_img: { type: String, require: false, default: "" },
});

const HistoryProducts = mongoose.model("HistoryProducts", HistoryProductSchema);
const validates = (data) => {
  const schema = Joi.object({
    number: Joi.number().required(),
    status: Joi.string().default(""),
    category_main: Joi.string().required(),
    category_second: Joi.string().default(""),
    model: Joi.string().required(),
    pricture: Joi.string().default(""),
    hl: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.object({
      one: Joi.number().required().label("กรอกราคาที่ 1"),
      two: Joi.number().required().label("กรอกราคาที่ 2"),
      tree: Joi.number().required().label("กรอกราคาที่ 3"),
      four: Joi.number().required().label("กรอกราคาที่ 4"),
      five: Joi.number().required().label("กรอกราคาที่ 5"),
      six: Joi.number().required().label("กรอกราคาที่ 6"),
    }),
    note: Joi.string().default(""),
    lnsure: Joi.string().default(""),
    update: Joi.array().default([]),
    link_spec: Joi.string().default(""),
    link_document: Joi.default(""),
    link_img: Joi.string().default(""),
  });
  return schema.validate(data);
};
module.exports = { HistoryProducts , validates};
