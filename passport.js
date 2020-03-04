const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

      // coz we havn't users crud we do auth with mock
      return cb(
        null,
        {
          firstName: "Tony",
          lastName: "Stark",
          email: "stark@marvelstars.com",
          password: "password"
        },
        { message: "Logged In Successfully" }
      );
      /*
      return User.findOne({ email, password })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    */
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      return cb(null, {
        firstName: "Tony",
        lastName: "Stark",
        email: "stark@marvelstars.com",
        password: "password"
      });
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

      // coz we havn't users crud we do auth with mock
      /*
      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
        */
    }
  )
);

//TODO: put to service, repo and initilizer
/*
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    host: "postgres_torba",
    port: 5432,
    database: "test_postgres_db",
    username: "postgres",
    password: "test_postgraph_pass",
    dialect: "postgres"
  });
  user = function(sequelize, DataTypes) {
    const User = sequelize.define(
      "users",
      {
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
        createdDate: {
          type: DataTypes.DATE
        },
        updatedDate: {
          type: DataTypes.DATE
        }
      },
      {
        timestamps: false
      }
    );
    User.associate = function(models) {
      // associations can be defined here
    };
    return User;
  };
  
  //const User = require("../../../models/v1/tasks")(sequelize, DataTypes);
  const User = user(sequelize, DataTypes);
  */
