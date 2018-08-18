module.exports = function(sequelize, DataTypes) {
    var CharStat = sequelize.define("CharStat", {
      charId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      snippetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    return CharStat;
}