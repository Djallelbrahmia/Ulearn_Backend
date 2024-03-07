const User = require("../models/user_model");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, type, phone, avatar, open_id, online } = req.body;
  console.log(req.body);
  const user = await User.create({
    name,
    email,
    type,
    phone,
    avatar,
    open_id,
    online,
  });
  res.status(200).json({
    success: true,
    code: 200,
    data: {
      name,
      email,
      type,
      phone,
      avatar,
      open_id,
      online,
    },
  });
});
