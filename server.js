const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/sportsbet", require("./routes/sportsbetRoutes"));
app.use("/api/neds", require("./routes/nedsRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
