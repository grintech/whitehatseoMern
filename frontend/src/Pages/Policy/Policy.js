import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'

const Policy = () => {
  return (
    <div className='privacy_policy '>
        <Navbar />

        <div className='container3'>
          <div className='box'>
            <h2>Privacy Policy</h2>

            <div className="all-animation">

              <div className="all-animation1">
                <img src='all-animations/all-animation1.png' className='circle-img' alt='moon' />

              </div>

              <div className="all-animation2">
                <img src='all-animations/all-animation2.svg' className='cross-img' alt='cross' />

              </div>

              <div className="all-animation3">
                <img src='all-animations/all-animation3.svg' className='circle-img' alt='circle' />

              </div>

              <div className="all-animation4">
                <img src='all-animations/all-animation4.svg' className='triangle-img' alt='triangle' />
              </div>

              <div className="all-animation5">
                <img src='all-animations/all-animation5.png' className='design1' alt='zig-zag' />

              </div>

              <div className="all-animation6">
                <img src='all-animations/all-animation6.svg' className='triangle3' alt='triangle' />

              </div>

              <div className="all-animation7">
                <img src='all-animations/all-animation7.svg' className='triangle3' alt='triangle' />

              </div>

              <div className="all-animation8">
                <img src='all-animations/all-animation8.svg' className='triangle3' alt='triangle' />

              </div>


            </div>


          </div>

        </div>

        <div className="container mt-5 pb-5 policy_points">
            <p className="">
            [WHITEHATSEO] ("we," "our," or "us") is dedicated to safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website [www.whitehatseo.in], including any other media form, media channel, mobile website, or mobile application related or connected to it (collectively, the "Site"). Please read this privacy policy carefully. If you disagree with the terms of this privacy policy, please do not access the site.
            </p>

           <div className='text-center'>
           <h2 className=''>Information We Collect</h2>
           <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
           </div>

            <div className='mt-5'>
            <h3 className='text-blue'> Personal Data</h3>
            <p>Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however, your refusal to do so may prevent you from using certain features of the Site.</p>
            </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Derivative Data</h3>
            <p> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'> Use of Your Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'> Use of Your Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className='p-0'>
                <li> Create and manage your account.</li>
                <li>Process your transactions.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                <li> Generate a personal profile about you to make future visits to the Site more personalized.</li>
                <li> Increase the efficiency and operation of the Site.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
                <li>Perform other business activities as needed.</li>
                <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            </ul>
           </div>

           <div className='text-center py-4'>
           <h2 className=''> Disclosure of Your Information:
           </h2>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Third-Party Service Providers</h3>
            <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Marketing Communications</h3>
            <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Security of Your Information</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.
            </p>
           </div>

           <div className='mt-4'>
           <h3 className='text-blue'>Contact Us           </h3>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <p>
            [WHITEHATSEO] <br /> 
            [<Link>info@whitehatseo.in</Link>]  <br />
            [<Link>123456789</Link>]  <br />
            [905/B, 9th Floor, Bestech Business Tower Mohali (Punjab) Sector-66]
            </p>
            <p>Feel free to customize this sample privacy policy to fit your specific needs and legal requirements.</p>

           </div>

        </div>

        <Footer />
    </div>
  )
}

export default Policy