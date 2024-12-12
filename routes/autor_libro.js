const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los libros
router.get('/', (req, res) => {
  db.query('SELECT * FROM autor_libro', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un libro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM autor_libro WHERE id_autor_libro = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un nuevo libro
router.post('/', (req, res) => {
  const { Libros_idLibros, Autores_idAutores  } = req.body;
  const sql = 'INSERT INTO autor_libro (Libros_idLibros, Autores_idAutores) VALUES (?, ?)';
  db.query(sql, [Libros_idLibros, Autores_idAutores], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Actualizar un libro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Libros_idLibros, Autores_idAutores } = req.body;
  const sql = 'UPDATE autor_libro SET Libros_idLibros = ?, Autores_idAutores = ? WHERE id_autor_libro = ?';
  db.query(sql, [Libros_idLibros, Autores_idAutores, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Eliminar un libro
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM autor_libro WHERE id_autor_libro = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'libro eliminado correctamente.' });
  });
});

module.exports = router;
