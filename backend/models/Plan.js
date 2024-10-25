// models/pricingPlanModel.js
const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    //   required: true, // e.g., 'monthly', 'yearly'
    },
     description: {
        type: String,
        required: true,
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
