const { Subslidbear } = require('../../model/more/subslidbear.model');

//getall
exports.getAll = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.find();
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}


//เพิ่มข้อมูลประเภทย่อยทั่วไป
exports.creategen = async (req, res) => {
    try {
        const subslidbear = new Subslidbear({
            name: req.body.name,
            slidbeartype: "ประกาศทั่วไป",
        });
        const add = await subslidbear.save();
        return res.status(200).send({ status: true, data: add });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//ดึงข้อมูลประเภทย่อยทั่วไป
exports.getAllgen = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.find({ slidbeartype: "ประกาศทั่วไป" });
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//ดึงข้อมูลประเภทย่อยทั่วไป by id
exports.getByIdgen = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.findById(req.params.id);
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//แก้ไขข้อมูลประเภทย่อยทั่วไป
exports.updategen = async (req, res) => {
    try {
        const data={
            name: req.body.name,
            slidbeartype: "ประกาศทั่วไป",
        }
        const subslidbear = await Subslidbear.findByIdAndUpdate(req.params.id, data, { new: true });
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "แก้ไขข้อมูลไม่สำเร็จ" });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}



// เพิ่มข้อมูลประเภทย่อยสินค้า
exports.createpro = async (req, res) => {
    try {
        const subslidbear = new Subslidbear({
            name: req.body.name,
            slidbeartype: "ประกาศสินค้า",
        });
        const add = await subslidbear.save();
        return res.status(200).send({ status: true, data: add });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//ดึงข้อมูลประเภทย่อยสินค้า
exports.getAllpro = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.find({ slidbeartype: "ประกาศสินค้า" });
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//ดึงข้อมูลประเภทย่อยสินค้า by id
exports.getByIdpro = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.findById(req.params.id);
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

//แก้ไขข้อมูลประเภทย่อยสินค้า
exports.updatepro = async (req, res) => {
    try {
        const data={
            name: req.body.name,
            slidbeartype: "ประกาศสินค้า",
        }
        const subslidbear = await Subslidbear.findByIdAndUpdate(req.params.id, data, { new: true });
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "แก้ไขข้อมูลไม่สำเร็จ" });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}

//ลบข้อมูลประเภทย่อย
exports.delete = async (req, res) => {
    try {
        const subslidbear = await Subslidbear.findByIdAndDelete(req.params.id);
        if (subslidbear) {
            return res.status(200).send({ status: true, data: subslidbear });
        } else {
            return res.status(400).send({ status: false, message: "ลบข้อมูลไม่สำเร็จ" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}
