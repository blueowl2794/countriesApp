const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {//los modelos se definen de la forma: sequelize.define
    id: {
      type: DataTypes.STRING,//
      primaryKey: true,
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    landlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      ,
    },
    // borders: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // languages: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });
};
/**allouNull//Si un campo particular de un modelo está configurado para no permitir 
 * nulo (con allowNull: false) y ese valor se ha establecido en nulo, se omitirán 
 * todos los validadores y se lanzará un ValidationError. */
/**Por otro lado, si está configurado para permitir nulo 
 * (con allowNull: true) y ese valor se ha establecido en nulo, solo se omitirán los
 *  validadores integrados, mientras que los validadores personalizados aún
 *  se ejecutarán */
/*Esto significa que puede, por ejemplo, tener un campo de cadena que valide
 su longitud entre 5 y 10 caracteres, pero que también permite nulo
  (ya que el validador de longitud se omitirá automáticamente cuando el valor sea nulo): */