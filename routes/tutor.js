const express = require('express');
const { tutorPostApplied, signup, login, classesAvailable, tutorApplied, passwordUpdate } = require('../controllers/tutor');
const { isTutorAuth } = require('../middleware/isAuth');

const router = express();

router.post('/tutorApplied', isTutorAuth, tutorPostApplied);
router.post('/signup', signup);
router.post('/login', login);
router.get('/classesAvailable', isTutorAuth, classesAvailable);
router.get('/studentApplied', isTutorAuth, tutorApplied);
router.post('/passwordUpdate', isTutorAuth, passwordUpdate);

module.exports = router;