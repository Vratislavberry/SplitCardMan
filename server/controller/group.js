const express = require("express");
const router = express.Router();

const List = require("../abl/group/list");
const Create = require("../abl/group/create");
const Update = require("../abl/group/update");
const Remove = require("../abl/group/remove");

router.get("/list", List);
router.post("/create", Create);
router.post("/update", Update);
router.post("/delete", Remove);

module.exports = router;
