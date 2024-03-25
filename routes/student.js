const express = require('express');
const { signup, login, studentTutorRequirement, matchedTutor, tutorRequirementPostApplied, studentSelectedTutor, tutorAppliedDetails, passwordUpdate, tutorApplied } = require('../controllers/student');
const { isStudentAuth } = require('../middleware/isAuth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/studentTutorRequirement', isStudentAuth, studentTutorRequirement);
router.post('/passwordUpdate', isStudentAuth, passwordUpdate);
router.post('/matchedTutor', isStudentAuth, matchedTutor);
router.get('/tutorAppliedDetails', isStudentAuth, tutorAppliedDetails);
router.get('/tutorApplied', isStudentAuth, tutorApplied);
router.get('/postApplied', isStudentAuth, tutorRequirementPostApplied);
router.post('/studentAppliedTutor', isStudentAuth, studentSelectedTutor);

module.exports = router;