// controllers/pricingPlanController.js
const Plan = require('../models/Plan');

const createPlan = async (req, res) => {
  try {
    const { planName, price, duration, description } = req.body;
    const newPlan = new Plan({
      planName,
      price,
      duration,
      description,
    });
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, price, duration, description } = req.body;
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { planName, price, duration, description },
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Plan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlan,
  getPlans,
  getPlanById,  // Add this line
  updatePlan,
  deletePlan,
};
