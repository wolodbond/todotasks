module.exports = function(sequelize, DataTypes) {
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
