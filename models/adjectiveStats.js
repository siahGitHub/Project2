module.exports = function(sequelize, DataTypes) {
    var AdjStat = sequelize.define("AdjStat", {
      adjId: {
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

    return AdjStat;
}