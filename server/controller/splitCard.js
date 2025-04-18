const express = require("express");
const router = express.Router();

const ListByGroupId = require("../abl/splitCard/listByGroupId");
const Create = require("../abl/splitCard/create");

//router.get("/listByGroupId", ListByGroupId);
router.post("/create", Create);

module.exports = router;
