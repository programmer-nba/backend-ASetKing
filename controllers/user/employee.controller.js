const bcrypt = require("bcrypt");
const {Employees, validate} = require("../../model/user/employee.model");

exports.create = async (req, res) => {
  try {
    // const {error} = validate(req.body);
    // console.log(error);
    // if (error)
    //   return res
    //     .status(403)
    //     .send({message: error.details[0].message, status: false});
    const employee = await Employees.findOne({name: req.body.name});
    if (employee)
      return res
        .status(401)
        .send({status: false, message: "มีผู้ใช้งานนี้ในระบบแล้ว"});
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    if(req.body.position =="Owner"){
      await new Employees({
        ...req.body,
        password: hashPassword,
        date_start: Date.now(),
        slidbeargeneral:true,
        slidbearproduct:true,
        price:{
          two:true,
          tree:true,
          four:true,
          five:true,
          six:true
        }
      }).save();
      return res
        .status(200)
        .send({status: true, message: "เพิ่มผู้ใช้งานสำเร็จ"});
    
    } else if(req.body.position =="Manager"){
      await new Employees({
        ...req.body,
        password: hashPassword,
        date_start: Date.now(),
      }).save();
      return res
        .status(200)
        .send({status: true, message: "เพิ่มผู้ใช้งานสำเร็จ"});
    
    }else {
      await new Employees({
        ...req.body,
        password: hashPassword,
        date_start: Date.now(),
      }).save();
      return res
        .status(200)
        .send({status: true, message: "เพิ่มผู้ใช้งานสำเร็จ"});
    }

   
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getEmployeeAll = async (req, res) => {
  try {
    const employee = await Employees.find();
    if (!employee) 
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: employee});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employees.findById(id);
    if (!employee)
      return res
        .status(404)
        .send({status: false, message: "ดึงข้อมูลไม่สำเร็จ"});
    return res
      .status(200)
      .send({status: true, message: "ดึงข้อมูลสำเร็จ", data: employee});
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body)
      return res.status(404).send({status: false, message: "ส่งข้อมูลผิดพลาด"});
    const id = req.params.id;
    if (!req.body.password) {
      
      Employees.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then((item) => {
          if (!item)
            return res
              .status(404)
              .send({status: false, message: "แก้ไขข้อมูลไม่สำเร็จ"});
          return res
            .status(200)
            .send({status: true, message: "แก้ไขข้อมูลสำเร็จ"});
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({status: false, message: "มีบางอย่างผิดพลาด" + id});
        });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      Employees.findByIdAndUpdate(
        id,
        {...req.body, password: hashPassword},
        {useFindAndModify: false}
      )
        .then((item) => {
          if (!item)
            return res
              .status(404)
              .send({status: false, message: "แก้ไขข้อมูลไม่สำเร็จ"});
          return res
            .status(200)
            .send({status: true, message: "แก้ไขข้อมูลสำเร็จ"});
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({status: false, message: "มีบางอย่างผิดพลาด" + id});
        });
    }
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    Employees.findByIdAndDelete(id, {useFindAndModify: false})
      .then((item) => {
        if (!item)
          return res
            .status(404)
            .send({message: "ไม่สามารถลบข้อมูลพนักงานนี้ได้"});
        return res.status(200).send({message: "ลบข้อมูลพนักงานสำเร็จ"});
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบผู้ใช้งานนี้ได้",
          status: false,
        });
      });
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};
