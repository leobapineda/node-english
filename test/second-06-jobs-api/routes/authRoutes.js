const express = require("express")
const router = express.Router()
const { register, login} = require("../controllers/authController")

router.post("/", register);
router.get("/", login);


module.exports = router;