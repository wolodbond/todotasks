const getAllTasksService = require("../../../services/v1/tasks/getAllTasksService");
const notFoundErrorHandler = require("../../../middlewares/errorHandlers/notFoundErrorHandler");

const getAllTasksAction = (req, res, next) => {
  getAllTasksService(req).then(
    serviceResponse => {
      res.status(200).json(serviceResponse);
    },
    err => {
      notFoundErrorHandler(err, req, res, next);
    }
  );
};

module.exports = getAllTasksAction;
