const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const splitCardFolderPath = path.join(
  __dirname,
  "storage",
  "splitCardList"
);

// Method to write an splitCard to a file
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

// Method to list splitCards in a folder
function list(filter = {}) {
  try {
    const files = fs.readdirSync(splitCardFolderPath);
    let splitCardList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(splitCardFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    const filterDate = filter.date
      ? new Date(filter.date).getMonth()
      : new Date().getMonth();
    splitCardList = splitCardList.filter(
      (item) => new Date(item.date).getMonth() === filterDate
    );
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

module.exports = {
  create,
  list,
  listByGroupId,
};
