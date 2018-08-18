module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "author",
        validate: {
          len: [1]
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
          }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    story_id: {
      type: DataTypes.INTEGER
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    });
  /*
    User.associate = function (models) {
      // Add a belongsTo association to Authors here
      // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
      User.belongsTo(models.Author, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  */
    // Add a belongsTo association to Authors here
    // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
    return User;
  };
  
  