// routes/PlanRoutes.js
const express = require('express');
const {
  createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require('../controllers/planController');

const router = express.Router();

router.post('/plan', createPlan);
router.get('/plan', getPlans);
router.get('/plan/:id', getPlanById);
router.put('/plan/:id', updatePlan);
router.delete('/plan/:id', deletePlan);



module.exports = router;
