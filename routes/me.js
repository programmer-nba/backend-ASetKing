const router = require("express").Router();
require("dotenv").config();
const {Employees} = require("../model/user/employee.model");
const {Admins} = require("../model/user/admin.model");
const auth = require("../lib/auth");

router.post("/", auth, async (req, res) => {
  const {decoded} = req;
  try {
    const id = decoded._id;
    if (decoded && decoded.position === "admin") {
      Admins.findOne({_id: id})
        .then((item) => {
          return res.status(200).send({
            name: item.admin_name,
            username: item.admin_username,
            level: "admin",
            position: item.admin_position,
          });
        })
        .catch(() => {
          res.status(409).send({message: "มีบางอย่างผิดพลาด", status: false});
        });
    } else if (decoded && decoded.row === "employee") {
      Employees.findOne({_id: id})
        .then((item) => {
          return res.status(200).send({
            name: item.name,
            username: item.username,
            level: "employee",
            position: item.position,
            subposition: item?.subposition,
            price: {
              one: item.price.one,
              two: item.price.two,
              tree: item.price.tree,
              four: item.price.four,
              five: item.price.five,
              six: item.price.six
          },
          slidbeargeneral: item.slidbeargeneral,
          slidbearproduct: item.slidbearproduct
          });
        })
        .catch(() => {
          res.status(409).send({message: "มีบางอย่างผิดพลาด", status: false});
        });
    }
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
});

module.exports = router;
