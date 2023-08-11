const express = require("express");
const router = express.Router();
const { rugbyLeague, afl } = require("../controllers/pointsbetController");

router.get("/rugby-league", rugbyLeague);
router.get("/afl", afl);

module.exports = router;
