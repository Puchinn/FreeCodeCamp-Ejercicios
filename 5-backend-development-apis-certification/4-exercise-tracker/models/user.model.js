const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  log: [
    {
      description: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: false,
      },
    },
  ],
});

userSchema.set("toJSON", {
  transform: (doc, obj) => {
    delete obj.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
