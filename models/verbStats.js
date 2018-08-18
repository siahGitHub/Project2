module.exports = function(sequelize, DataTypes) {
    var VerbStat = sequelize.define("VerbStat", {
      verbId: {
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

    return VerbStat;
}