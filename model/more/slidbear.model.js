const mongoose = require("mongoose");
const Joi = require("joi");

const SlidbearSchema = new mongoose.Schema({
  func_type: {type: String, require: true}, //ประเภทฟังก์ชั่น text, image เท่านั้น
  profile_image: { type: String, required: false }, //รูปภาพ
  func_topic: {type: String, require: true}, //ชื่อฟังก์เอาไว้อธิบายหน้า frontend
  func_name: {type: String, require: true}, //เป็นฟังก์กำหนดโดยเฉพาะ
  func_detail: {type: String, required: false},
  func_discription: {type: String, default: "ไม่มี"},
});

const Slidbear = mongoose.model("Slidbear", SlidbearSchema);

module.exports = {Slidbear};
