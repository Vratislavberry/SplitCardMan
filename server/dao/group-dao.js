const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const groupFolderPath = path.join(__dirname, "storage", "groupList");


// Method to read an category from a file
function get(groupId) {
    try {
      const filePath = path.join(groupFolderPath, `${groupId}.json`);
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw { code: "failedToReadGroup", category: error.category };
    }
  }

// Method to write a group to a file
function create(group) {
  try {
    const groupList = list();
    if (groupList.some((item) => item.name === group.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists group with given name",
      };
    }
    group.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(groupFolderPath, `${group.id}.json`);
    const fileData = JSON.stringify(group);
    fs.writeFileSync(filePath, fileData, "utf8");
    return group;
  } catch (error) {
    throw { code: "failedToCreategroup", group: error.group };
  }
}

// Method to list groups in a folder
function list() {
  try {
    const files = fs.readdirSync(groupFolderPath);
    const groupList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(groupFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return groupList;
  } catch (error) {
    throw { code: "failedToListgroups", group: error.group };
  }
}

module.exports = {
  get,
  create,
  list,
};
