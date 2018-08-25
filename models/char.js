module.exports = function(sequelize, DataTypes) {
    var Char = sequelize.define("Char", {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alt_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender:{
        type: DataTypes.STRING
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return Char;
}