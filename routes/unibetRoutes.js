const express = require("express");
const router = express.Router();
const { rugbyLeague, afl, mlb } = require("../controllers/unibetController");

router.get("/rugby-league", rugbyLeague);
router.get("/afl", afl);
router.get("/mlb", mlb);

module.exports = router;
