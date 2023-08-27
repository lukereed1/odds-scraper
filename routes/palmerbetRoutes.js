const express = require("express");
const router = express.Router();
const {
	rugbyLeague,
	afl,
	mlb,
	epl,
} = require("../controllers/palmerbetController");

router.get("/rugby-league", rugbyLeague);
router.get("/afl", afl);
router.get("/mlb", mlb);
router.get("/soccer/epl", epl);

module.exports = router;
