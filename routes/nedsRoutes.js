const express = require("express");
const router = express.Router();
const {
	rugbyLeague,
	afl,
	baseball,
} = require("../controllers/nedsControllers");

router.get("/rugby-league", rugbyLeague);
router.get("/afl", afl);
router.get("/baseball", baseball);

module.exports = router;
