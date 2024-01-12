const mongoose = require("mongoose");
const Joi = require("joi");

const PositionSchema = new mongoose.Schema({
  position: {type: String, require: true},
});

const Positions = mongoose.model("position", PositionSchema);

const validate = (data) => {
  const schema = Joi.object({
    position: Joi.string().required().label("กรอกระดับพนักงาน"),
  });
  return schema.validate(data);
};

module.exports = {Positions, validate};
