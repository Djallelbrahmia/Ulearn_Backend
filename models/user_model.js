const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    maxlength: [100, "Name can not exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [validator.isEmail, "Please add a valid email"],
  },
  type: {
    type: Number,
    required: [true, "Please enter user type"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a phone number"],
    validate: [validator.isMobilePhone, "Please add a valid phone number"],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true,
        });
      },
      message: "Please add a valid link",
    },
  },
  open_id: {
    type: String,
    required: [true, "Please enter userId"],
    unique: true,
  },
  online: {
    type: Number,
  },
});

module.exports = mongoose.model("User", UserSchema);
