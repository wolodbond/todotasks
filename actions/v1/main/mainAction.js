const mainAction = (req, res, next) => {
  res.status(200).json({ main: "there" });
};

module.exports = mainAction;
