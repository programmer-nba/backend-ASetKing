const { IPAddress, validate } = require("../../model/more/ip.model");
const getmac = require("getmac");
const MacAddress = getmac.default();
const axios = require("axios");

exports.create = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res
        .status(403)
        .send({ message: error.details[0].message, status: false });
    const ipaddress = await IPAddress.findOne({
      ip: req.body.ip,
    });
    if (ipaddress)
      return res
        .status(401)
        .send({ status: false, message: "มี IP Address นี้ในระบบแล้ว" });
    const new_ipaddress = await new IPAddress({
      ...req.body,
      timestamp: Date.now(),
    }).save();
    return res.status(200).send({
      status: true,
      message: "เพิ่ม IP_Address ให้ผู้ใช้งานสำเร็จ",
      data: new_ipaddress,
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getIPAddress = async (req, res) => {
  try {
    const ip_address = await IPAddress.find();
    if (!ip_address)
      return res
        .status(404)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    return res
      .status(200)
      .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: ip_address });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getIPAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const ip_address = await IPAddress.findById(id);
    if (!ip_address)
      return res
        .status(404)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    return res
      .status(200)
      .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: ip_address });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getIPAddressByEmployeeId = async (req, res) => {
  try {
    const id = req.params.employee_id;
    const ip_address = await IPAddress.findOne({
      name: id,
    });
    if (!ip_address)
      return res
        .status(404)
        .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    return res
      .status(200)
      .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: ip_address });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(404)
        .send({ status: false, message: "ส่งข้อมูลผิดพลาด" });
    const id = req.params.id;
    IPAddress.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({ status: false, message: "แก้ไขข้อมูลไม่สำเร็จ" });
        return res
          .status(200)
          .send({ status: true, message: "แก้ไขข้อมูลสำเร็จ" });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ status: false, message: "มีบางอย่างผิดพลาด" + id });
      });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    IPAddress.findByIdAndDelete(id, { useFindAndModify: false })
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({ message: "ไม่สามารถลบข้อมูล IPAddress นี้ได้" });
        return res.status(200).send({ message: "ลบข้อมูล IPAddress สำเร็จ" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบข้อมูล IPAddress นี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getMacAddress = async (req, res) => {
  try {
    return res.status(200).send({ status: true, message: MacAddress });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getIPWeb = async (req, res) => {
  try {
    const config = {
      method: "get",
      headers: {},
      url: `https://api64.ipify.org?format=json`,
    };
    const response = await axios(config);
    return res.status(200).send({ status: true, message: response.data });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};