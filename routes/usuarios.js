const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Usuarios WHERE id_usuarios = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, dni, email, telefono, direccion } = req.body;
  const sql = 'INSERT INTO Usuarios (nombre, dni, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, dni, email, telefono, direccion], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, dni, email, telefono, direccion } = req.body;
  const sql = 'UPDATE Usuarios SET nombre = ?, dni = ?, email = ?, telefono = ?, direccion = ? WHERE id_usuarios = ?';
  db.query(sql, [nombre, dni, email, telefono, direccion, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Usuarios WHERE id_usuarios = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuario eliminado correctamente.' });
  });
});

module.exports = router;
