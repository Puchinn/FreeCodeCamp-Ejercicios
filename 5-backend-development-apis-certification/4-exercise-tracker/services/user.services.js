const userRepository = require("../repositories/user.repository");
const utils = require("../util/utils");

class UserServices {
  async findAll() {
    return await userRepository.findAll();
  }

  async onlyUsernameAndId() {
    return await userRepository.onlyUsernameAndId();
  }

  async create(username) {
    return await userRepository.create(username);
  }

  async addExercise(userId, exerciseData = { description, duration, date }) {
    const validDate = utils.checkDate(exerciseData.date);
    const user = await userRepository.addExercise(userId, {
      ...exerciseData,
      date: validDate,
    });

    return {
      username: user.username,
      _id: user._id,
      description: exerciseData.description,
      duration: Number(exerciseData.duration),
      date: validDate,
    };
  }

  async log(userId, queryParams = { from, to, limit }) {
    const user = await userRepository.findById(userId);
    const filteredLogs = utils.queryLogs(user.log, queryParams);
    const log = {
      username: user.username,
      _id: user._id,
      count: user.log.length,
      log: utils.exercisesWithoutID(filteredLogs),
    };

    return log;
  }
}

module.exports = new UserServices();
