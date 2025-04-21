const Ajv = require("ajv");
const ajv = new Ajv();

const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
  },
  required: ["title"],
  additionalProperties: false,
};

async function Create(req, res) {
  try {
    let group = req.body;

    // validate input
    const valid = ajv.validate(schema, group);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        group: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store group to a persistant storage
    try {
      group = groupDao.create(group);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(group);
  } catch (e) {
    res.status(500).json({ group: e.group });
  }
}

module.exports = Create;
