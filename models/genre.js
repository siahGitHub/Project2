module.exports = function(sequelize, DataTypes) {
    var Genre = sequelize.define("Genre", {
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });

    return Genre;
}