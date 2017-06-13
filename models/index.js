var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Para usar en local BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite
// Para usar en Heroku BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, {storage: storage});


// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definicion de la tabla Tips de tips.js
var Tip = sequelize.import(path.join(__dirname,'tip'));

// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

// Create and initiate table
sequelize.sync().then(function() {
  Quiz.count().then(function(count) {
    if(count === 0) {
      Quiz.create({
        question: 'Capital de Italia',
        answer: 'Roma',
	question: 'Capital de España',
        answer: 'Madrid'
      }).then(function() {
        console.log('Quizzes table initialized with data');
      });
    }
  })
});

// Relaciones entre modelos
Tip.belongsTo(Quiz);
Quiz.hasMany(Tip);
User.hasMany(Tip, {foreignKey: 'AuthorId'});
Tip.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Tip = Tip;   // exportar definición de tabla Tips
exports.User = User; // exportar definición de tabla Users
