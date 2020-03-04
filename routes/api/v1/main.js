const express = require("express");
const router = express.Router();

const { mainAction } = require("../../../actions/v1/main");

router.all("/", mainAction);

module.exports = router;
