import React from "react";

const Section3 = () => {
  return (
    <>
      <div className="section3">
        <div className="container">
          <div className="box">
            <div className="section d-flex flex-column">
              <h2 className="text-center"> We develops strategic SEO and Digital Marketing <br /> to Expand Your Business</h2>
              <div className='bar'></div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-3 col-6">
              <div className="d-flex justify-content-center">
                <div className="facts">
                  <h3>98%</h3>
                  <p>CLIENT RETENTION</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-6">
              <div className="d-flex justify-content-center">
                <div className="facts">
                  <h3>5+</h3>
                  <p>YEARS OF SERVICE</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-6">
              <div className="d-flex justify-content-center">
                <div className="facts">
                  <h3>10+</h3>
                  <p>PROFESSIONALS</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-6">
              <div className="d-flex justify-content-center">
                <div className="facts ">
                  <h3>500+</h3>
                  <p>SATISFIED CLIENTS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-bar d-flex flex-column flex-lg-row justify-content-center col-12 col-md-9 mx-auto">
            <div className="contact mx-3">
              <div className="box text-center">
                <h5 className="">You have better things to do than worry about your business. Let’s Discuss about Project. </h5>
                <p>Let’s Discuss about Project.</p>
              </div>
            </div>
            <div className=" btn-hover d-flex justify-content-center py-3 py-lg-0">
              <button className="btn-purple1" type="">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
