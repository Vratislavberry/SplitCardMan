const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const splitCardDao = require("../../dao/splitCard-dao.js");
const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    groupId: { type: "string" },
  },
  required: ["groupId"],
  additionalProperties: false,
};

async function ListByGroupId(req, res) {
  try {
    const filter = req.query?.date ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const splitCardList = splitCardDao.listByGroupId(filter);

    // return properly filled dtoOut
    res.json({splitCardList});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByGroupId;
