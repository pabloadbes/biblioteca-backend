const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los autores
router.get('/', (req, res) => {
  db.query('SELECT * FROM autores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un autor por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM autores WHERE id_autores = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un nuevo autor
router.post('/', (req, res) => {
  const { nombre, nacionalidad, fecha_nacimiento } = req.body;
  const sql = 'INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)';
  db.query(sql, [nombre, nacionalidad, fecha_nacimiento], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Actualizar un autor
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad, fecha_nacimiento } = req.body;
  const sql = 'UPDATE autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ? WHERE id_autores = ?';
  db.query(sql, [nombre, nacionalidad, fecha_nacimiento, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Eliminar un autor
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM autores WHERE id_autores = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'autor eliminado correctamente.' });
  });
});

module.exports = router;
