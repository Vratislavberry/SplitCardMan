const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const splitCardDao = require("../../dao/splitCard-dao.js");
const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 100 },
    questionText: { type: "string", maxLength: 250 },
    date: { type: "string", format: "date" },
    groupId: { type: "string" },
  },
  required: ["title", "questionText", "date", "groupId"],
  additionalProperties: false,
};

async function Create(req, res) {
  try {
    let splitCard = req.body;

    // validate input
    const valid = ajv.validate(schema, splitCard);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // validate date
    if (new Date(splitCard.date) > new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `date must be current day or day in the past`,
        validationError: ajv.errors,
      });
      return;
    }

    // check if groupId exists
    const group = groupDao.get(splitCard.groupId);
    if (!group) {
      res.status(400).json({
        code: "groupDoesNotExist",
        message: `group with id ${splitCard.groupId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    // store splitCard to persistent storage
    splitCard = splitCardDao.create(splitCard);
    splitCard.group = group;

    // return properly filled dtoOut
    res.json(splitCard);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = Create;
