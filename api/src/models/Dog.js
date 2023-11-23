const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    },
    image: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    weightMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    weightMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    heightMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    heightMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    life_span: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    createdInBd: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    }

  }, { timestamps: false });
};
