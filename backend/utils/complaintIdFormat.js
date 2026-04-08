const mongoose = require("mongoose");
exports.formatComplaintId = (id) => {
  const objId = new mongoose.Types.ObjectId(id);
  const date = objId.getTimestamp();

  const formattedDate = date.toLocaleDateString("en-IN");
  const formattedTime = date.toLocaleTimeString("en-IN");

  
  return `CMP-${formattedDate.replaceAll("/", "")}-${formattedTime.replaceAll(":", "")}`;
};

