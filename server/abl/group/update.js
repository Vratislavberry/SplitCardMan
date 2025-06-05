const Ajv = require("ajv");
const ajv = new Ajv();

const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
  },
  required: ["id", "title"],
  additionalProperties: false,
};

async function Update(req, res) {
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

    // update group in persistent storage
    let updatedGroup;
    try {
      updatedGroup = groupDao.update(group);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedGroup) {
      res.status(404).json({
        code: "groupNotFound",
        group: `Group with id ${group.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedGroup);
  } catch (e) {
    res.status(500).json({ group: e.group });
  }
}

module.exports = Update;
