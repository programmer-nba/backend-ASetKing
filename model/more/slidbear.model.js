const mongoose = require("mongoose");
const Joi = require("joi");

const SlidbearSchema = new mongoose.Schema({
  func_type: { type: String, require: true }, //ประเภทฟังก์ชั่น text, image เท่านั้น
  profile_image: { type: String, required: false }, //รูปภาพ
  func_detail: { type: String, required: false },
  func_discription: { type: String, default: "ไม่มี" },
  type:{type: String, required: false, default: ""},
  subtype:{type: String, required: false, default: ""},
  timestamp: {type: Date, required: false, default: Date.now()},
});

const Slidbear = mongoose.model("Slidbear", SlidbearSchema);

module.exports = { Slidbear };
