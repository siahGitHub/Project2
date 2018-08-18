module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define("Snippet", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
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
  Snippet.associate = function (models) {
    // Add a belongsTo association to Authors here
    // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
    Snippet.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };
*/
  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Snippet;
};

