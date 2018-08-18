module.exports = function(sequelize, DataTypes) {
    var Verb = sequelize.define("Verb", {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alt_present: {
        type: DataTypes.STRING,
        allowNull: false
      },
      past: {
        type: DataTypes.STRING,
        allowNull: false
      },
      progressive: {
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
    return Verb;
}