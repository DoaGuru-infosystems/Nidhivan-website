const moment = require("moment-timezone");

const getNowIST = () => {
  return moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = { getNowIST };