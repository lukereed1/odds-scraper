const express = require("express");
const router = express.Router();
const { rugbyLeague } = require("../controllers/unibetController");

router.get("/rugby-league", rugbyLeague);

module.export = router;
