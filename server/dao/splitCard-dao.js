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
  //console.log(groupId);
  const splitCardList = list();
  //console.log(splitCardList.filter((item) => item.groupId === groupId.groupId).length());
  //console.log(splitCardList.filter((item) => item.groupId !== groupId.groupId).length());
  return splitCardList.filter((item) => item.groupId === groupId.groupId);
}

module.exports = {
  create,
  list,
  listByGroupId,
};
