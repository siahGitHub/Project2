module.exports = function(sequelize, DataTypes) {
    var Adjective = sequelize.define("Adjective", {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alt_text: {
        type: DataTypes.STRING
      },
      genre_id: {
        type: DataTypes.STRING
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return Adjective;
}