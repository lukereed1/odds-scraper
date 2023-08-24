const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/sportsbet", require("./routes/sportsbetRoutes"));
app.use("/api/neds", require("./routes/nedsRoutes"));
app.use("/api/unibet", require("./routes/unibetRoutes"));
app.use("/api/tab", require("./routes/tabRoutes"));
app.use("/api/pointsbet", require("./routes/pointsbetRoutes"));
app.use("/api/palmerbet", require("./routes/palmerbetRoutes"));
app.use("/api/boombet", require("./routes/boombetRoutes"));
app.use("/api/betdeluxe", require("./routes/betdeluxeRoutes"));
app.use("/api/topsport", require("./routes/topsportRoutes"));

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
