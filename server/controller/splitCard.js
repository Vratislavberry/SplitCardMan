const express = require("express");
const router = express.Router();

const ListByGroupId = require("../abl/splitCard/listByGroupId");
const Create = require("../abl/splitCard/create");
const Remove = require("../abl/splitCard/remove")
const Update = require("../abl/splitCard/update")

router.get("/listByGroupId", ListByGroupId);
router.post("/create", Create);
router.post("/delete", Remove);
router.post("/update", Update);

module.exports = router;
