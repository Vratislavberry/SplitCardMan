const groupDao = require("../../dao/group-dao.js");

async function List(req, res) {
  try {
    const groupList = groupDao.list();
    res.json({ itemList: groupList });
  } catch (e) {
    res.status(500).json({ group: e.group });
  }
}

module.exports = List;
