const mongoose = require("mongoose");
const Joi = require("joi");

const subslidbearSchema = new mongoose.Schema({
    name:{type:String,required:true},
    slidbeartype:{type: String, required: false, default: ""},
});

const Subslidbear = mongoose.model("subslidbear", subslidbearSchema);

module.exports = { Subslidbear };
