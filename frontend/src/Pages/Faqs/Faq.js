import React, { useState } from "react";
import Navbar from '../../Components/Navbar';
import axios from "axios";
import Footer from "../../Components/Footer";

const BASE_URL = process.env.REACT_APP_URL;

const Faq = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send POST request to the server
      await axios.post(`${BASE_URL}/contact`, formData);

      // If successful, set success state and optionally reset form data
      setSuccess(true);
      setFormData(initialFormData); // Reset form data if needed
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("Failed to send message");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className='faq_page'>
        <Navbar />

        <div className='container3'>
          <div className='box'>
            <h2>FAQ</h2>

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

        <div className='faq_content'>

          <div className='container'>

            <div className="accordion" id="accordionExample">

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Why is SEO Important?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>In the digital circle, SEO, or search engine optimization, is crucial. It serves as your online presence's compass. By making your website search engine friendly, like Google, you make sure anyone looking for your information can find it. This increases reputation and visibility while generating organic traffic. In essence, SEO is the key to realizing your online potential, connecting with the appropriate audience, and eventually succeeding in the world of technology.</p>                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Is SEO important for website
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Yes, SEO (Search Engine Optimization) is crucial for a website's success. It plays a significant role in improving a website's visibility on search engines like Google, Bing, and Yahoo. SEO helps your website appear higher in search engine results pages (SERPs). This means more people are likely to find and visit your website.</p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    In 2024, will SEO still be important?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse mt-3" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Indeed, SEO remains important in 2024 and will continue to do so for some time to come. This is so that search engines can more effectively rank web pages when people type in search queries. SEO does this by assisting search engines in crawling and classifying your website. Google and other search engines want to assist people in finding the answers to their queries.</p>
                  </div>
                </div>

              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    How to optimize my website for mobile?
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse mt-3" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Optimizing your website for mobile is important because more and more people are using their mobile devices to access the internet. In fact, according to Statista, mobile devices accounted for over 54% of global web traffic in 2022.</p>
                    <p>You may optimize your website for mobile in a variety of ways.</p>
                    <p>Here are a few of the most significant:</p>
                    <p>Make sure your website is mobile-friendly: A responsive website is one that automatically adjusts its layout to the screen size of the device being used to see it. This means that your website will look good and be easy to use on both desktop and mobile devices.</p>
                    <p>Use a mobile-friendly theme: There are a number of mobile-friendly themes available for most popular content management systems (CMS). These themes are designed to make your website look good and be easy to use on mobile devices.</p>
                    <p>Optimize your images: Images can take up a lot of space on a mobile device, so it is important to optimize your images for mobile. This implies compressing your photographs without sacrificing quality.</p>
                    <p>Use clear and concise text: Mobile users are more likely to scan your content than read it word-for-word. So, it is important to use clear and concise text on your website.</p>
                    <p>Use a call to action: A call to action is a button or link that tells your visitors what you want them to do. For example, you might want them to sign up for your email list, make a purchase, or contact you. Make sure your call to action is clear and easy to find on your mobile website.</p>
                    <p>Test your website on different devices: Once you have optimized your website for mobile, it is important to test it on different devices. This will help you make sure that your website looks good and is easy to use on all devices.                     By following these tips, you can optimize your website for mobile and make it easier for people to access your content on their mobile devices.
                    </p>
                  </div>
                </div>

              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    How to generate backlinks?
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse mt-3" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>When generating backlinks, it is important to get backlinks from high-quality websites.</p>
                    <p>These are websites that have a good reputation and are considered to be authoritative. Backlinks from high-quality websites will give your website a boost in search engine rankings.</p>
                    <p>It is also important to get backlinks from relevant websites. These are websites that are related to your own website. Backlinks from relevant websites will help your website rank higher for the keywords that are relevant to your website.</p>
                    <p>Generating backlinks is a long-term process. Seeing results requires time and effort. However, if you are patient and consistent, you can build a strong backlink profile that will help your website rank higher in search engines.</p>
                    <p>Here are some additional tips for generating backlinks:</p>
                    <p>Create high-quality content: The best way to get backlinks is to create high-quality content that people want to link to. Your content should be relevant, well-written, and relevant to your intended audience.</p>
                    <p>Promote your content: Once you have created high-quality content, you need to promote it so that people will see it and link to it. You can promote your content on social media, in forums, and in other places where people are likely to see it.</p>
                    <p>Be patient: Building backlinks takes time and effort. Don't expect to see results overnight. Simply keep developing and promoting high-quality content, and you'll start to see backlinks appear.</p>
                    <p>By following these tips, you can build a strong backlink profile that will help your website rank higher in search engines.</p>
                  </div>
                </div>

              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    What are the most common SEO mistakes?
                  </button>
                </h2>
                <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>There are many SEO mistakes that can be made, but some of the most common include:</p>
                    <p>Not optimizing your content for keywords: This is one of the most important things you can do for SEO. When you're creating content, make sure to use the right keywords throughout your text. You can identify the right keywords by using a keyword research tool.</p>
                    <p>Using too many keywords: Keyword stuffing is a bad SEO practice. It can actually hurt your ranking if you use too many keywords.</p>
                    <p>Not optimizing your title tags and meta descriptions: These are the snippets of text that appear in search engine results pages (SERPs). Make sure they accurately reflect the content of your page and include the relevant keywords.</p>
                    <p>Not building backlinks: Backlinks are links from other websites to yours. They provide search engines with evidence that your website is authoritative and trustworthy. Backlinks can be obtained by guest blogging, social media participation, and submitting your website to directories.</p>
                    <p>Not fixing technical SEO issues: If there are any technical issues with your website, such as slow loading times or broken links, these can hurt your SEO performance. Correct these issues as soon as feasible.</p>
                    <p>Not tracking your SEO progress: It's important to track your SEO progress so that you can see what's working and what's not.</p>
                    <p>There are a number of tools that you can use to track your SEO progress.
                      You may boost your website's rating in search engines and attract more traffic by avoiding these typical SEO errors.</p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                    How much does SEO cost?
                  </button>
                </h2>
                <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>The cost of SEO can vary depending on a number of factors, including the size and complexity of your website, the level of competition in your industry, and the services that you require.</p>
                    <p>However, in general, SEO can range in cost from a few hundred dollars per month to several thousand dollars per month.</p>
                    <p>Check some of the factors that can affect the cost of SEO:</p>
                    <p>The size and complexity of your website: The larger and more complex your website is, the more time and effort it will take to optimize it for search engines. This will naturally increase the cost of SEO.</p>
                    <p>The level of competition in your industry: If you are in a highly competitive industry, you will need to invest more in SEO in order to rank well in search engines.</p>
                    <p>The services that you require: The specific services that you require will also affect the cost of SEO. For example, if you need help with keyword research, link building, or content optimization, you will need to pay more than if you only need help with technical SEO.</p>
                    <p>If you are on a budget, there are a number of things that you can do to improve your website's SEO.</p>
                    <p>Whitehatseo will help you in minimum budget. However, if you want to see significant results. A good SEO service will have the experience and expertise to help you improve your website's ranking in search engines and attract more traffic.</p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                    Can I do SEO myself?
                  </button>
                </h2>
                <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Yes, you can do SEO yourself. There are a number of resources available online that can help you learn about SEO and how to improve your website's ranking in search engines.</p>
                    <p>Here are some of the resources that you can use to learn about SEO:</p>
                    <p>Google Search Console: Google Search Console is a free tool that allows you to track the performance of your website in Google Search. You can use Google Search Console to see how your website is ranking for different keywords, how much traffic you're getting from search engines, and other important metrics.</p>
                    <p>Moz's Blog: The Moz Blog is an excellent place to learn about SEO. From keyword research to link development, the site covers a wide range of topics. Search Engine Journal: Search Engine Journal is another great resource for learning about SEO. The blog covers a wide range of topics, from technical SEO to content marketing.</p>
                    <p>Once you have learned about SEO, you can start to implement the principles on your own website.There are several things you can do to boost the SEO of your website, including:</p>
                    <p>High-quality content creation: The basis of strong SEO is high-quality content. Make sure your material is useful, well-written, and pertinent to your intended audience.</p>
                    <p>Title tags and meta descriptions should be optimised: The text snippets that display in search engine results pages (SERPs) are your title tags and meta descriptions.</p>
                    <p>Creating backlinks: Backlinks are links to your website from other websites. They provide search engines with evidence that your website is authoritative and trustworthy. Backlinks can be obtained by guest blogging, social media participation, and submitting your website to directories.</p>
                    <p>Fixing technical SEO issues: If there are any technical issues with your website, such as slow loading times or broken links, these can hurt your SEO performance. Fix these issues as soon as possible. You may boost your website's SEO and attract more visitors by following these guidelines.</p>
                    <p>However, if you are not familiar with SEO or if you don't have the time to learn about it, you may want to consider hiring a professional SEO company.</p>
                    <p>A good SEO company will have the experience and expertise to help you improve your website's ranking in search engines and attract more traffic.</p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                    What is the difference between SEO and SEM?
                  </button>
                </h2>
                <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Search engine optimization (SEO) and search engine marketing (SEM) are two different but complementary strategies for improving your website's visibility in search engine results pages (SERPs).</p>
                    <p>SEO is the practise of improving your website's ranking in organic search results. This is done by improving the quality and relevance of your website's content, as well as its technical SEO.</p>
                    <p>SEM is the process of generating traffic to your website through paid advertising. This is done by creating and managing search engine ads, which appear at the top of SERPs when someone searches for specific keywords</p>
                    <p>SEO is a long-term strategy that requires patience and consistency. However, the results of SEO can be very rewarding, as they can help you attract more organic traffic to your website over time.</p>
                    <p>SEM is a short-term strategy that can help you generate traffic to your website quickly. However, the results of SEM can be expensive, and they may not be sustainable in the long term.</p>
                    <p>The best approach for you will depend on your specific goals and budget. If you are looking for a long-term strategy to improve your website's visibility in search engines, then SEO is a good option. If you are looking for a short-term way to generate traffic to your website, then SEM is a good option.</p>
                    <p>It is also possible to use both SEO and SEM together. This can help you achieve the best of both worlds, as you can attract both organic and paid traffic to your website.</p>
                    <p>I hope this helps! Let us know if you have other questions.</p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                    On-page and Off-page seo examples
                  </button>
                </h2>
                <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>On-page SEO</p>
                    <p>Keyword research: This is the process of finding the right keywords to target for your website. You want to choose keywords that are relevant to your website's content and that have a high search volume.</p>
                    <p>Content optimization: This is the process of optimizing your website's content for search engines. This includes using the right keywords throughout your content, making sure your content is well-written and informative, and structuring your content in a way that is easy for search engines to crawl.</p>
                    <p>Meta descriptions and title tags: The text snippets that display in search engine results pages (SERPs) are your title tags and meta descriptions. Make sure that they accurately reflect the content of your page and include the relevant keywords.</p>
                    <p>Internal linking: Internal linking is the process of linking to other pages on your website from within your content. This helps search engines understand the structure of your website and helps users find their way around your website.Image optimization: Your images can also be optimized for search engines. This includes using the right keywords in your image alt text and filenames.</p>
                    <p>Off-page SEO</p>
                    <p>Backlinks: Backlinks are links to your website from other websites. They provide search engines with evidence that your website is authoritative and trustworthy. Backlinks can be obtained by guest blogging, social media participation, and submitting your website to directories.</p>
                    <p>Social media: Social media can also be used for SEO. When you share your content on social media, you are increasing the chances that it will be seen by people who are searching for the keywords that you are targeting.</p>
                    <p>Citations: Citations are mentions of your website in other online directories. They can help search engines understand the authority of your website. You can get citations by submitting your website to online directories and by being mentioned in other websites.</p>
                    <p>You may boost your website's SEO and attract more visitors by following these guidelines.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className='faq_contact'>
              <h3>Ask Your Questions</h3>


              {/* <div className='row'>

                  <div className='col-lg-6 col-md-6'>
                    <div className='form_content'>
                      <input type='text' name='name' placeholder='Your Name' className='form_control' />

                    </div>
                  </div>

                  <div className='col-lg-6 col-md-6'>
                    <div className='form_content'>
                      <input type='text' name='email' placeholder='Your email address' className='form_control' />

                    </div>
                  </div>

                  <div className='col-lg-6 col-md-6 mt-3'>
                    <div className='form_content'>
                      <input type='text' name='number' placeholder='Your phone number' className='form_control' />

                    </div>
                  </div>

                  <div className='col-lg-6 col-md-6 mt-3'>
                    <div className='form_content'>
                      <input type='text' name='subject' placeholder='Your Subject' className='form_control' />

                    </div>
                  </div>

                  <div className='col-lg-12 col-md-12 mt-3'>
                    <div className='form_content'>
                      <textarea name='text' placeholder='Write Your Message' className='form_control' required></textarea>

                    </div>
                  </div>

                  <div className='form_check mt-2'>

                    <input className='form_check-input' type='checkbox' id='FlexCheckDefault' required/>

                    <label className='form_check_label ms-2'>
                    By checking this, you agree to our
                    Terms 
                    and
                   Privacy Policy
                    .
                    </label>

                  </div>

                  <div className='col-lg-12 col-sm-2'></div>



                </div> */}

              <form onSubmit={handleSubmit}>
                <div className="row ">
                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Your Name"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>


                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your phone number"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Your Subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 mb-5">
                    <div className="form-details">
                      <textarea
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Write your message"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 mb-3 text-centre">
                    <button
                      className="btn-purple1"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "SEND MESSAGE"}
                    </button>

                    {success && (
                      <div className="col-lg-12 py-3 ">
                        <h6 className="text-success">
                          Message sent successfully!
                        </h6>
                      </div>
                    )}

                    {error && (
                      <div className="col-lg-12 py-3 ">
                        <h6 className="text-danger">{error}</h6>
                      </div>
                    )}
                  </div>
                </div>
              </form>

            </div>




          </div>

        </div>

        <Footer />

      </div>

    </>
  )
}

export default Faq
