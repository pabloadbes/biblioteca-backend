const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los libros
router.get('/', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un libro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM libros WHERE id_libros = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un nuevo libro
router.post('/', (req, res) => {
  const { titulo, ISBN, categoria, fecha_publicacion, numero_ejemplares } = req.body;
  const sql = 'INSERT INTO libros (titulo, ISBN, categoria, fecha_publicacion, numero_ejemplares) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [titulo, ISBN, categoria, fecha_publicacion, numero_ejemplares], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Actualizar un libro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, ISBN, categoria, fecha_publicacion, numero_ejemplares } = req.body;
  const sql = 'UPDATE libros SET titulo = ?, ISBN = ?, categoria = ?, fecha_publicacion = ?, numero_ejemplares = ? WHERE id_libros = ?';
  db.query(sql, [titulo, ISBN, categoria, fecha_publicacion, numero_ejemplares, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Eliminar un libro
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM libros WHERE id_libros = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'libro eliminado correctamente.' });
  });
});

module.exports = router;
