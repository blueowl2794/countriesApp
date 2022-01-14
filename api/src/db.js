require('dotenv').config();
const { Sequelize } = require('sequelize');//Este es un ORM para nodejs que soporta varios motores de bases de datos ORM (Object relation mapping), que son librerías o frameworks que hacen este trabajo por nosotros
const fs = require('fs');//fs tiene la funcionalidad para leer y escribir archivos,El módulo fs permite interactuar con el sistema de archivos de una manera modelada en funciones POSIX estándar
//POSIX (acrónimo de Portable Operating System Interface, y X viene de UNIX como seña de identidad de la API) es una norma escrita por la IEEE, que define una interfaz estándar del sistema operativo y el entorno, incluyendo un intérprete de comandos (o "shell")
const path = require('path');//El módulo de ruta proporciona utilidades para trabajar con rutas de archivos y directorios.
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {//vamos a crear un objeto Sequelize pasandole como parámetro la string que indica a qué base de datos conectarse, con qué usuario y qué password
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);//Devuelve la última parte de una ruta. Similar al comando de nombre de base de Unix. A menudo se utiliza para extraer el nombre de archivo de una ruta completa.

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))//readdirSync Lee el contenido del directorio.El argumento de opciones opcionales puede ser una cadena que especifique una codificación o un objeto con una propiedad de codificación que especifique la codificación de caracteres que se utilizará para los nombres de archivo devueltos. Si la codificación se establece en 'búfer', los nombres de archivo devueltos se pasarán como objetos de búfer.
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));// join Une todos los argumentos y normaliza la ruta resultante.
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);//entries es un metodo que Devuelve un arr de clave / valores de las propiedades enumerables de un objeto.
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);//fromEntries: Returns an object created by key-value entries for properties and methods @param entries — An iterable object that contains key-value entries for properties and methods.

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Types } = sequelize.models;
Country.belongsToMany(Types, { through: 'country_type' });
Types.belongsToMany(Country, { through: 'country_type' });

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
