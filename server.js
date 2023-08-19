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
app.use("/api/pointsbet", require("./routes/pointsbetRoutes"));
app.use("/api/tab", require("./routes/tabRoutes"));

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
