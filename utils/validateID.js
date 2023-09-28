const mongoose = require("mongoose");

const validateId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
};
module.exports = validateId;
