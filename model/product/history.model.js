const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  number: {type: Number},
  category_main: {type: String, require: false},
  category_second: {type: String, require: false, default: ""},
  model: {type: String, require: false},
  pricture: {type: String, require: false, default: ""},
  hl: {type: String, require: false},
  description: {type: String, require: false},
  price: {
    one: {type: Number, require: false, default: 0},
    two: {type: Number, require: false, default: 0},
    tree: {type: Number, require: false, default: 0},
    four: {type: Number, require: false, default: 0},
    five: {type: Number, require: false, default: 0},
    six: {type: Number, require: false, default: 0},
  },
  note: {type: String, require: false, default: ""},
  lnsure: {type: String, require: false, default: ""}, //ประกัน
  link_spec: {type: String, require: false, default: ""},
  link_document: {type: String, require: false, default: ""},
  link_img: {type: String, require: false, default: ""},
  timestamp: {type: String},
});

const HistoryProducts = mongoose.model("hsitory_product", HistorySchema);

module.exports = {HistoryProducts};
