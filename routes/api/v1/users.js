const express = require("express");
const router = express.Router();

const { Sequelize, DataTypes } = require("sequelize");

// TODO: put to initiliser
const sequelize = new Sequelize({
  host: "postgres_torba",
  port: 5432,
  database: "test_postgres_db",
  username: "postgres",
  password: "test_postgraph_pass",
  dialect: "postgres"
});

const User = require("../../../models/v1/users")(sequelize, DataTypes);

// TODO: put User.findAll() to repository
router.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
