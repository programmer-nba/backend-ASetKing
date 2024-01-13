const mongoose = require("mongoose");
const Joi = require("joi");

const IPSchema = new mongoose.Schema({
  ip: {type: String, required: true},
  name: {type: String, required: true},
  maker: {type: String, required: true},
  status: {type: Boolean, required: false, default: true},
  timestamp: {type: Date, required: false, default: Date.now()},
});

const IPAddress = mongoose.model("ip_address", IPSchema);

const validate = (data) => {
  const schema = Joi.object({
    ip: Joi.string().required().label("กรุณากรอก IP ที่ต้องการเพิ่ม"),
    name: Joi.string().required().label("กรุณากรอกชื่อผู้ใช้ IP"),
    maker: Joi.string().required().label("กรุณากรอกชื่อผู้ทำรายการ"),
    status: Joi.boolean().required().default(true),
    timestamp: Joi.date().required().label("กรุณากรอกวันที่"),
  });
  return schema.validate(data);
};

module.exports = {IPAddress, validate};
