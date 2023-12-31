const User = require("../models/user.model");

class UserRepository {
  async findAll() {
    return await User.find({});
  }

  async onlyUsernameAndId() {
    return await User.find({}, { username: 1, _id: 1 });
  }

  async create(username) {
    return await User.create({ username });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async addExercise(userId, exerciseData = { description, duration, date }) {
    const user = await this.findById(userId);
    user.log = user.log.concat(exerciseData);
    user.count = user.log.length;
    return await user.save();
  }
}

module.exports = new UserRepository();
