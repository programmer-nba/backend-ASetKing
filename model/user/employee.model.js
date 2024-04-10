const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const getmac = require("getmac");

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 2,
};

const EmployeeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  position: {type: String, required: true},
  subposition: {type: String, required: false},
  date_start: {type: Date, required: false, default: Date.now()},
  slidbeargeneral: {type: Boolean, required: false},
  slidbearproduct: {type: Boolean, required: false},
  price:{type:{
    two:{type:Boolean,default:false},
    tree:{type:Boolean,default:false},
    four:{type:Boolean,default:false},
    five:{type:Boolean,default:false},
    six:{type:Boolean,default:false},  
  },default:null},
  // level: {type: String, required: true},
});

EmployeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      position: this.position,
      row: "employee",
    },
    process.env.JWTPRIVATEKEY,
    {expiresIn: "4h"}
  );
  return token;
};

const Employees = mongoose.model("employee", EmployeeSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("กรุณากรอกชื่อ"),
    username: Joi.string().required().label("กรุณากรอกรหัสผู้ใช้"),
    password: passwordComplexity(complexityOptions)
      .require()
      .label("กรุณากรอกรหัสผ่าน"),
    position: Joi.string().required().label("กรุณากรอกระดับผู้ใช้งาน"),
  });
  return schema.validate(data);
};

module.exports = {Employees, validate};
