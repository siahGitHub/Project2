module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      players: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      viewers: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      round: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      state: {
          type: DataTypes.STRING,
          allowNull: false
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return Game;
}