const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
/*
// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Cambia esto
  password: '',  // Cambia esto
  database: 'biblioteca'
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});*/

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('API de Biblioteca funcionando.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

const autoresRoutes = require('./routes/autores');
app.use('/autores', autoresRoutes);

const librosRoutes = require('./routes/libros');
app.use('/libros', librosRoutes);

const autorLibroRoutes = require('./routes/autor_libro');
app.use('/autor_libro', autorLibroRoutes);

const prestamosRoutes = require('./routes/prestamos');
app.use('/prestamos', prestamosRoutes);