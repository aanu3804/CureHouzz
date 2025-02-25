import { Link, Navigate } from 'react-router-dom';
import React, { useState } from "react"; // Import useState from react
import { useNavigate } from "react-router-dom"; // Import routing functions from react-router-dom
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import appointment from '../assets/images/appointment.png';
import medicine from '../assets/images/medicine.png';
import testing from '../assets/images/testing.png';
import featureImg from '../assets/images/feature-img.png';
import avatarIcon from '../assets/images/avatar-icon.png';
import faqImg from '../assets/images/faq-img.png';
import About from '../components/About/About';
import ServiceList from '../components/Services/ServiceList';
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Gajuwaka, AP");
  const [insurance, setInsurance] = useState("Insurance carrier and plan");

  return (
    <>
      {/* homebanner section start */}
      <section id="home" className="bg-gradient-to-r from-blue-500 to-blue-300 py-5">
  <div className="container mx-auto text-center">
    <h1 className="text-4xl font-bold text-white mb-2 mt-1">View Doctors, Book an Appointment</h1>
    <p className="text-lg text-white mb-4">
      Find the best doctors, clinics & hospitals in the city nearest to you.
    </p>

    {/* Search Bar */}
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {/* Search Input */}
        <div className="flex items-center px-4 py-2 w-1/3 border-r border-gray-300">
          <i className="fas fa-search text-black-500 mr-2"></i>
          <input
            type="text"
            placeholder="Condition, procedure, doctor..."
            className="w-full focus:outline-none text-black bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="flex items-center px-4 py-2 w-1/3 border-r border-gray-300">
          <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
          <span className="text-black">{location}</span>
        </div>

        {/* Insurance Plan */}
        <div className="flex items-center px-4 py-2 w-1/3">
          <i className="fas fa-list-alt text-gray-500 mr-2"></i>
          <span className="text-black">{insurance}</span>
        </div>

        {/* Search Button */}
        <button className="absolute right-0 top-0 bottom-0 bg-yellow-400 px-4 flex items-center justify-center hover:bg-yellow-500">
          <i className="fas fa-search black"></i>
        </button>
      </div>
    </div>
  </div>
</section>

{/* homebanner section end*/}

{/* Cards Section */}
<div className="bg-white-100 pb-12 flex flex-col items-center">
  <header className="w-full bg-gradient-to-r white pt-4 pb-2">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-black mb-2">
        Largest Healthcare Network Across India
      </h1>
      <p className="text-lg text-black-100">
        Find the best doctors across specialities or hospitals in your city.
      </p>
    </div>
  </header>

  <main className="container mx-auto pt-6 pb-0">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center w-full max-w-lg">
        <img
          src={testing}
          alt="Person holding a test tube in a lab"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Book Lab Test</h2>
        <p className="text-gray-600">It's fast, easy, and secure.</p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Find Diagnostic Center
        </button>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center w-full max-w-lg">
        <img
          src={appointment}
          alt="Medical equipment including a blood pressure monitor"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
        <p className="text-gray-600">For hospital & clinical admissions.</p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Doctors Now
        </button>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center w-full max-w-lg">
        <img
          src={medicine}
          alt="Various medicines and pills"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Buy Medicine</h2>
        <p className="text-gray-600">We got all your health needs covered!</p>
        <button onClick={() => navigate('/medicine')} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Buy Now
        </button>
      </div>
    </div>
  </main>
</div>

{/* Appointment Section */}
<div className="flex flex-col items-center bg-white-100 space-y-6" id="online-appointment">
  <h1 className="text-3xl font-bold text-center mb-1">Discover the Online Appointment!</h1>
  <p className="text-gray-600 text-center mb-6">
    A step-by-step guide to build an on-demand appointment for patients
  </p>

  {/* Cards Section */}
  <div className="flex flex-wrap items-center gap-4">
    {/* Card 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm max-h-sm">
      <img
        src={icon01} href="/doctors"
        alt="Illustration of a building with a location pin"
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-bold text-blue-600 mb-2">DOCTORS</h2>
      <p className="text-gray-600">
        With more than 1000+ doctors and on a mission to provide the best care healthcare service.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm max-h-sm">
      <img
        src={icon02} href=""
        alt="Illustration of a person sitting at a computer"
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-bold text-blue-600 mb-2">VIEW DOCTOR</h2>
      <p className="text-gray-600">
        Share your health concerns here, and we shall assign you a top doctor across the North East.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm min-h-lg">
      <img
        src={icon03} href=" "
        alt="Illustration of a hand touching a tablet"
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-bold text-blue-600 mb-2">BOOK A VISIT</h2>
      <p className="text-gray-600">
        Book your time slot with a doctor from your comfort zone.
      </p>
    </div>
  </div>
</div>


      {/* Appointment section end*/}

      <About />

      {/* services section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Medical Services</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* services section */}

      {/* feature section */}
      <section className="pt-0 mt-[-30px]">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row ">
            {/* feature content */}
            <div className="xl:w-[670px] mt-[-20px]">
            <h2 className="heading mt-0 pt-0">
                Get virtual treatment <br /> anytime.
              </h2>

              <ul className="pt-4">
                <li className="text__para">
                  1. Schedule the appointment directly
                </li>
                <li className="text__para">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">
                  3. View our physician who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>
            {/* featuer img */}

            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} alt="" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4  lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">                     
                    </p>
                  </div>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h1 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Dr. Sai Vivek
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* feature section */}

      {/* faq */}
    <section id="faqs">
  <div className="container px-0 py-4"> {/* Reduced padding on container */}
    <div className="flex justify-between gap-4 lg:gap-8"> {/* Reduced gap between flex items */}
      <div className="w-1/2 hidden md:block">
        <img src={faqImg} alt="faq-img" className="mb-4" /> {/* Reduced space under the image */}
      </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* faq */}

      {/* testimonial */}
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center"></h2>
          <p className="text__para text-center">
            World-class care for everyone. Our health System offers unmatched,
            expert health care.
          </p>
        </div>
        <Testimonial />
      </div>
      {/* testimonial */}
    </>
  );
};

export default Home;
