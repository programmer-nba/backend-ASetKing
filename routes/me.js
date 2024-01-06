const router = require("express").Router();
require("dotenv").config();
const {Users} = require("../model/employee.model");
const auth = require("../lib/auth");

router.post("/", auth, async (req, res) => {
  const {decoded} = req;
  try {
    const id = decoded._id;
    Users.findOne({_id: id}).then((item) => {
      return res.status(200).send({
        status: true,
        name: item.name,
        username: item.username,
        position: item.position,
      });
    });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
});

module.exports = router;
