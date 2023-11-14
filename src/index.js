const express = require("express");
const app = express();
const { PORT } = require("./constants");

app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}...`));
