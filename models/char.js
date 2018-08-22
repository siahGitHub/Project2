module.exports = function(sequelize, DataTypes) {
    var Char = sequelize.define("Char", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alt_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender:{
        type: DataTypes.STRING,
        allowNull: false
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return Char;
}