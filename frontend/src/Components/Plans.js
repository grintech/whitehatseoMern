import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL;

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/plan`);
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const buyFunction = async (price, planName) => {
    setLoading(true);
    setCurrentPlan(planName);
    try {
      let response = await axios.post(`${BASE_URL}/payment`, { price, planName });
      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
      // if (response && response.status === 200) {
      //   window.open(response.data.url, '_blank');
      // }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setLoading(false);
      setCurrentPlan(null);
    }
  };

  return (
    <div className="plans">
      <div className="users-animation">
        <div className="user-animation6">
          <img src='homeimages/user-animation6.svg' className='user-triangle2' alt='triangle' />
        </div>
        <div className="user-animation4">
          <img src='homeimages/user-animation4.svg' className='user-triangle' alt='triangle' />
        </div>
        <div className="user-animation8">
          <img src='homeimages/user-animation8.svg' className='user-cross' alt='cross' />
        </div>
      </div>

      <div className="container">
        <div className="box4 d-flex flex-column align-items-center justify-content-center">
          <h2>Pricing Plans</h2>
          <div className='bar'></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        {plans.map(plan => (
          <div key={plan._id} className="col-lg-4 col-md-6 advanced-plan mb-5">
            <div className="d-flex card border-0">
              <div className="pricing-card text-align-center">
                <div className="pricing-header2 position-relative">
                  <h3>{plan.planName}</h3>
                </div>
                <div className="price">
                  <h1>
                    <sup>$</sup>{plan.price} <span>/ {plan.duration}</span>
                  </h1>
                </div>
                <div className="pricing-features text-align-center">
                  <div dangerouslySetInnerHTML={{ __html : plan.description}} />
                 
                  <div className="btn-hover">
                    <button 
                      className="btn-purple1" 
                      type="button" 
                      onClick={() => buyFunction(plan.price, plan.planName)}
                      disabled={loading && currentPlan === plan.planName}  // Disable the button while loading for the current plan
                    >
                      {loading && currentPlan === plan.planName ? 'Redirecting...' : 'BUY PLAN'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {loading && currentPlan && (
        <div className="loading-spinner mt-4">
          <h5>Redirecting to payment gateway, please wait...</h5>
        </div>
      )}
    </div>
  );
}

export default Plans;
