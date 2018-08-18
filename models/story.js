module.exports = function(sequelize, DataTypes) {
    var Story = sequelize.define("Story", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      start: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      end: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
    });
  /*
    Story.associate = function (models) {
      // Add a belongsTo association to Authors here
      // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
      Story.belongsTo(models.Author, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  */
    // Add a belongsTo association to Authors here
    // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
    return Story;
  };
  
  