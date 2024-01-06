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
app.use("/AChetDong/login", require("./routes/login"));

// me
app.use("/AChetDong/me", require("./routes/me"));

// user
app.use("/AChetDong/admin", require("./routes/user/admin"));
app.use("/AChetDong/employee", require("./routes/user/employee"));

// product
app.use("/AChetDong/product", require("./routes/product/product"));

const port = process.env.PORT || 1234;
app.listen(port, console.log(`Listening on port ${port}`));
