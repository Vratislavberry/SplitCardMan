const express = require("express");
const router = express.Router();

const List = require("../abl/group/list");
const Create = require("../abl/group/create");

router.get("/list", List);
router.post("/create", Create);

module.exports = router;
