require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const concention = require("./config/db");
concention();

app.use(bodyParser.json({limit: "50mb", type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(cors());

// login
app.use("/ASetKing/login", require("./routes/login"));

// me
app.use("/ASetKing/me", require("./routes/me"));

// user
app.use("/ASetKing/admin", require("./routes/user/admin"));
app.use("/ASetKing/employee", require("./routes/user/employee"));

// product
app.use("/ASetKing/product", require("./routes/product/product"));

// ip
app.use("/ASetKing/ip", require("./routes/more/ip"));

// Function
app.use("/ASetKing/function", require("./routes/more/function"));

//Slide Bar
app.use("/ASetKing/sliedbear", require("./routes/sliedbear/sliedbear"))

// Delete Image
app.use("/ASetKing/delete/image", require("./routes/more/deleteImage"));
// UPLOAD FILE COLLECTION
app.use("/ASetKing/image/collection", require("./routes/more/uploadfile"));

const port = process.env.PORT || 1234;
app.listen(port, console.log(`Listening on port ${port}`));
