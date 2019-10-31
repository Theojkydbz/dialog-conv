const express = require('express');
const router = express.Router();

const ExercicesCtrl = require('../controllers/exercices');
const AuthCtrl = require('../controllers/auth')

router.get('', ExercicesCtrl.getExercices);
router.get('/secret', AuthCtrl.onlyAuthUser, ExercicesCtrl.getSecret);
router.get('/:id', ExercicesCtrl.getExerciceById);

// Post Route
router.post('', AuthCtrl.onlyAuthUser, ExercicesCtrl.createExercice);
router.post('/:id/join', AuthCtrl.onlyAuthUser, ExercicesCtrl.joinExercice);
router.post('/:id/leave', AuthCtrl.onlyAuthUser, ExercicesCtrl.leaveExercice);

router.patch('/:id', AuthCtrl.onlyAuthUser, ExercicesCtrl.updateExercice)

module.exports = router;
