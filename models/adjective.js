module.exports = function(sequelize, DataTypes) {
    var Adj = sequelize.define("Adjective", {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre_id: {
        type: DataTypes.STRING
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return Adj;
}