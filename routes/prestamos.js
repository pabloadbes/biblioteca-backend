const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los prestamos
router.get('/', (req, res) => {
  db.query('SELECT * FROM prestamos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un prestamo por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM prestamos WHERE id_prestamos = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear un nuevo prestamo
router.post('/', (req, res) => {
  const { Libros_idLibros, Usuarios_idUsuarios, fecha_prestamo, fecha_devolucion  } = req.body;
  const sql = 'INSERT INTO prestamos (Libros_idLibros, Usuarios_idUsuarios, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)';
  db.query(sql, [Libros_idLibros, Usuarios_idUsuarios, fecha_prestamo, fecha_devolucion], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Actualizar un prestamo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Libros_idLibros, Usuarios_idUsuarios, fecha_prestamo, fecha_devolucion } = req.body;
  const sql = 'UPDATE prestamos SET Libros_idLibros = ?, Usuarios_idUsuarios = ?, fecha_prestamo = ?, fecha_devolucion = ? WHERE id_prestamos = ?';
  db.query(sql, [Libros_idLibros, Usuarios_idUsuarios, fecha_prestamo, fecha_devolucion, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Eliminar un prestamo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM prestamos WHERE id_prestamos = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'prestamo eliminado correctamente.' });
  });
});

module.exports = router;
