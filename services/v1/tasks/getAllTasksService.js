const getAllTasksRepository = require("../../../repositories/getAllTasksRepository");

// TODO: make propers env file/ PROCESS...
const getAllTasksService = req => {
  const result = getAllTasksRepository.getAllTasks({
    query: req.body.query,
    databaseURL:
      "postgres://postgres:test-postgraph@127.0.0.1:5432/test-postgres"
  });

  return result;
};

module.exports = getAllTasksService;
