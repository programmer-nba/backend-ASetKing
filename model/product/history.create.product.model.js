const mongoose = require("mongoose");
const Joi = require("joi");

const ProductCreateHisSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  status: { type: String, required: false, default: "" },
  category_main: { type: String, require: true },
  category_second: { type: String, require: false, default: "" },
  model: { type: String, require: true },
  pricture: { type: String, require: false, default: "" },
  hl: { type: String, require: true },
  description: { type: String, require: true },
  price: {
    type: {
      one: { type: String, required: true },
      two: { type: String, required: true },
      tree: { type: String, required: true },
      four: { type: String, required: true },
      five: { type: String, required: true },
      six: { type: String, required: true },
    },
  },
  note: { type: String, require: false, default: "" },
  lnsure: { type: String, require: false, default: "" }, //ประกัน
  update: { type: Array, required: false, default: [] },
  link_spec: { type: String, require: false, default: "" },
  link_document: { type: String, require: false, default: "" },
  link_img: { type: String, require: false, default: "" },
  update: [
    {
      name: { type: String, require: false, default: "" },
      timestamps: { type: Date, required: false, default: Date.now() },
    },
  ],
});

const ProductsHistory = mongoose.model(
  "ProductsHistory",
  ProductCreateHisSchema
);
module.exports = { ProductsHistory };
