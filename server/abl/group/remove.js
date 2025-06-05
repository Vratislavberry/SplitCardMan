const Ajv = require("ajv");
const ajv = new Ajv();
const groupDao = require("../../dao/group-dao.js");
const splitCardDao = require("../../dao/splitCard-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};



async function Remove(req, res) {
  try {
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        group: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check there is no splitCard related to given group
    const splitCardList = splitCardDao.listByGroupId(reqParams.id);
    if (splitCardList.length) {
      res.status(400).json({
        code: "groupWithSplitCards",
        message: "group has related splitCards and cannot be deleted",
        validationError: ajv.errors,
      });
      return;
    }

    // remove group from persistant storage
    groupDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    res.status(500).json({ group: e.group });
  }
}

module.exports = Remove;
