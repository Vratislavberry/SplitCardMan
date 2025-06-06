const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const splitCardDao = require("../../dao/splitCard-dao.js");
const groupDao = require("../../dao/group-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    title: { type: "string", maxLength: 100 },
    questionText: { type: "string", maxLength: 250 },
    date: { type: "string", format: "date" },
    groupId: { type: "string" },
  },
  required: ["id", "title", "questionText", "date", "groupId"],
  additionalProperties: false,
};

async function Update(req, res) {
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
    if (new Date(splitCard.date) >= new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `date must be current day or a day in the past`,
        validationError: ajv.errors,
      });
      return;
    }

    // update splitCard in database
    const updatedSplitCard = splitCardDao.update(splitCard);

    // check if group exists
    const group = groupDao.get(updatedSplitCard.groupId);
    if (!group) {
      res.status(400).json({
        code: "groupDoesNotExist",
        message: `group with id ${updatedSplitCard.groupId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    if (!updatedSplitCard) {
      res.status(404).json({
        code: "splitCardNotFound",
        message: `SplitCard ${splitCard.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    updatedSplitCard.group = group;
    res.json(updatedSplitCard);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = Update;
