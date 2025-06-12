console.log("✅ Spuštěno: app.js začíná");

const express = require("express");
const app = express();
const port = process.env.PORT || 8888;

const groupController = require("./controller/group");
const splitCardController = require("./controller/splitCard");


app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/group", groupController);
app.use("/splitCard", splitCardController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
