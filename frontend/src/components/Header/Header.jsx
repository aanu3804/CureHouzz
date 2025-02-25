import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const [location, setLocation] = useState('Fetching location...');

    useEffect(() => {
      const fetchLocation = async () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  async (position) => {
                      const { latitude, longitude } = position.coords;
                      try {
                          const response = await fetch(
                              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                          );
                          const data = await response.json();
  
                          if (data && data.address) {
                              const city =
                                  data.address.city ||
                                  data.address.town ||
                                  data.address.village ||
                                  data.address.hamlet ||
                                  data.address.suburb ||
                                  'Unknown';
                              const state = data.address.state || 'Unknown';
                              setLocation(`${city}, ${state}`);
                          } else {
                              setLocation('Location not found');
                          }
                      } catch (error) {
                          console.error('Error fetching location:', error);
                          setLocation('Location unavailable');
                      }
                  },
                  (error) => {
                      console.error('Error getting geolocation:', error);
                      setLocation('Location unavailable');
                  },
                  { enableHighAccuracy: true } // Ensures a more precise location
              );
          } else {
              setLocation('Geolocation not supported');
          }
      };
  
      fetchLocation();
  }, []);
  
  

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <nav className="main-menu-wrapper bg-white shadow-md w-full z-10">
                <div className="bg-white shadow-md">
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                            <Link to="/">
                                <img src="/curehouzz logo.png" alt="Logo" className="h-12 w-25 cursor-pointer" />
                            </Link>
                            <div className="ml-2 text-sm">
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt text-red-500 text-xl"></i>
                                    <span className="ml-2">{location}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Home Delivery & Store Pickup Available
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button onClick={toggleDropdown} className="flex items-center space-x-2">
                                        <img
                                            src={user.profileImage || '/default-avatar.png'}
                                            alt="User Profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="text-gray-800 font-medium">{user.name}</span>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                            <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="flex items-center text-blue-500 bg-transparent border-2 border-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-200"
                                    >
                                        Login / Sign Up
                                    </button>
                                    <i className="fas fa-user-circle text-blue-500 text-2xl"></i>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t">
                        <div className="flex justify-center py-2">
                            <div className="flex items-center space-x-4">
                                <Link to="/doctors" className="text-black-500">Doctors</Link>
                                <Link to="/specialisation" className="text-black-500">Specialisations</Link>
                                <Link to="/lab" className="text-black-500">Lab Bookings</Link>
                                <Link to="/medicine" className="text-black-500">Medicine Order</Link>
                                <Link to="/hospital" className="text-black-500">Hospitals</Link>
                                <Link to="/contact" className="text-black-500">Help</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
