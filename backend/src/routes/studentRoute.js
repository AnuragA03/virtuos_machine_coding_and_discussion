const express = require('express');
const { getStudents, createStudent, getRankedStudents } = require('../controllers/studentControllers');

const router = express.Router();

// router.get('/students', getStudents);

router.get('/ranked', getRankedStudents);

router.post('/create', createStudent);


module.exports = router;
