const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const splitCardFolderPath = path.join(
  __dirname,
  "storage",
  "splitCardList"
);

// Method to create a splitCard
function create(splitCard) {
  try {
    splitCard.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(splitCardFolderPath, `${splitCard.id}.json`);
    const fileData = JSON.stringify(splitCard);
    fs.writeFileSync(filePath, fileData, "utf8");
    return splitCard;
  } catch (error) {
    throw { code: "failedToCreateSplitCard", message: error.message };
  }
}

// Method to get a list of all splitCards
function list() {
  try {
    const files = fs.readdirSync(splitCardFolderPath);
    let splitCardList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(splitCardFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });

    splitCardList.sort((a, b) => new Date(a.date) - new Date(b.date));

    return splitCardList;
  } catch (error) {
    throw { code: "failedToListsplitCards", message: error.message };
  }
}

// Method to list splitCards by groupId
function listByGroupId(groupId) {
  const splitCardList = list();
  return splitCardList.filter((item) => item.groupId === groupId.groupId);
}

function remove(splitCardId) {
  try {
    const filePath = path.join(splitCardFolderPath, `${splitCardId}.json`);
    fs.unlinkSync(filePath); // deletes a file
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveSplitCard", group: error.group };
  }
}

// Method to read a splitCard from a file
function get(splitCardId) {
  try {
    const filePath = path.join(splitCardFolderPath, `${splitCardId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadSplitCard", message: error.message };
  }
}

// Method to update splitCard in a file
function update(splitCard) {
  try {
    const currentSplitCard = get(splitCard.id);
    if (!currentSplitCard) return null;
    const newSplitCard = { ...currentSplitCard, ...splitCard };
    const filePath = path.join(splitCardFolderPath, `${splitCard.id}.json`);
    const fileData = JSON.stringify(newSplitCard);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newSplitCard;
  } catch (error) {
    throw { code: "failedToUpdateSplitCard", message: error.message };
  }
}

module.exports = {
  create,
  list,
  listByGroupId,
  remove,
  get,
  update
};
