import React from 'react'

const Cards = () => {
  return (
    <>

      <div className='container mt-5 pt-5'>
        <div className='row all-cards'>

          <div className=" col-sm-6 col-md-6 col-lg-3" >
            <div className='card border-0 card-hover'>
              <div className="card-body">
                <i className="fa-solid fa-bars-progress  icon1"></i>
                <h5 className="card-title">Seo Services</h5>
                <p className="card-text">Search Engine Optimization is the practice of enhancing a website to improve its visibility on search engines like Google, Bing, and Yahoo. SEO aims to increase organic (non-paid) traffic to a website by improving its ranking on search engine results pages.</p>

              </div>
            </div>
          </div>

          <div className=" col-sm-6 col-md-6 col-lg-3" >
            <div className='card border-0'>
              <div className="card-body">
                <i className="fa-solid fa-code  icon2"></i>
                <h5 className="card-title">Email Marketing </h5>
                <p className="card-text">
                  Email marketing is a digital marketing strategy that involves sending targeted emails to a group of individuals or subscribers. It is one of the most effective ways to nurture leads, build customer loyalty, and drive sales.
                </p>
              </div>
            </div>
          </div>

          <div className=" col-sm-6 col-md-6 col-lg-3" >
            <div className='card border-0'>
              <div className="card-body">
                <i className="fa-solid fa-code  icon2"></i>
                <h5 className="card-title">Paid Ads</h5>
                <p className="card-text">Paid ads, also known as paid advertising or pay-per-click (PPC) advertising, involve using various digital platforms to display ads that drive traffic to a website or achieve specific business goals. 
                </p>
              </div>
            </div>
          </div>

          <div className=" col-sm-6 col-md-6 col-lg-3" >
            <div className='card border-0'>
              <div className="card-body">
                <i className="fa-solid fa-code  icon2"></i>
                <h5 className="card-title">Keyword Research</h5>
                <p className="card-text">Keyword research identifies and analyzes the words and phrases people use when searching for information online. Effective keyword research is important for understanding your audience, crafting relevant content, and achieving better visibility in search engines.</p>
              </div>
            </div>
          </div>

        </div>
      </div>



    </>




  )
}

export default Cards
