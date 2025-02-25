import { Link } from 'react-router-dom';
import { RiLinkedinFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const socialLinks = [
  { path: 'https://www.linkedin.com', icon: <RiLinkedinFill /> },
  { path: 'https://www.youtube.com', icon: <AiFillYoutube /> },
  { path: 'https://www.github.com', icon: <AiFillGithub /> },
  { path: 'https://www.instagram.com', icon: <AiOutlineInstagram /> },
  { path: 'https://www.twitter.com', icon: <AiFillTwitterCircle /> },
];

const quickLinks01 = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About Us' },
  { path: '/services', display: 'Services' },
  { path: '/doctors', display: 'Book Appointment' },
];


const quickLinks02 = [
  { path: '/doctors', display: 'Find a Doctor' },
  { path: '/appointment', display: 'Request an Appointment' },
  { path: '/location', display: 'Find a Location' },
  { path: '/opinion', display: 'Get an Opinion' },
];

const quickLinks03 = [
  { path: '/Donor', display: 'Donor' },
  { path: '/contact', display: 'Contact Us' },
  { path: '/#faqs', display: 'FAQs' },
  { path: '/support', display: 'Customer Support' },
];

const advancedFeatures = [
  { path: '/contact', display: 'Video Call Support' },
  { path: '/medicine', display: 'book medicine' },
  { path: '/medicine', display: 'PharmaCare' },
  { path: '/#online-appointment', display: 'Online Consultation' },
];

const Footer = () => {
  const year = 2025;

  return (
    <footer className="pb-8 pt-6 bg-[#f0f7ff]">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
        {/* Left Side: Logo */}
        <div className="w-full md:w-1/4 flex justify-center md:justify-start">
          <img src="/curehouzz logo.png" alt="Logo" className="w-45 h-40" />
        </div>

        {/* Right Side: Links & Content */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Quick Links */}
          <div>
            <h2 className="text-sm font-bold mb-4">Quick Links</h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-2 text-sm">
                  <Link to={item.path} onClick={scrollToTop} className="hover:text-primaryColor">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* I Want To */}
          <div>
            <h2 className="text-sm font-bold mb-4">I want to:</h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-2 text-sm">
                  <Link to={item.path}  onClick={scrollToTop} className="hover:text-primaryColor">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-sm font-bold mb-4">Support</h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-2 text-sm">
                  <Link to={item.path} onClick={scrollToTop} className="hover:text-primaryColor">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-sm font-bold mb-4">Features</h2>
            <ul>
              {advancedFeatures.map((item, index) => (
                <li key={index} className="mb-2 text-sm">
                  <Link to={item.path}  onClick={scrollToTop} className="hover:text-primaryColor">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8">
        <p className="text-xs leading-6 font-light">
          Copyright © {year} Developed by CureHouzz interns.
        </p>
        <div className="flex justify-center items-center gap-2 mt-3">
          {socialLinks.map((link, index) => (
            <a
              href={link.path}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border border-solid border-[#1811AE] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};


export default Footer;
