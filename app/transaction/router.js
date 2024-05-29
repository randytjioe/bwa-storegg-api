var express = require("express");
const { index, actionStatus } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");
var router = express.Router();
router.use(isLoginAdmin);
router.get("/", index);

router.put("/status/:id", actionStatus);

module.exports = router;
