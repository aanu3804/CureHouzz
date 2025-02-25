import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import Hospital from '../pages/hospital';
import DoctorsDetails from '../pages/Doctors/DoctorsDetails';
import Pharmacare from '../pages/pharmcare';
import AppointmentPage from '../pages/AppointmentPage';
import Lab from '../pages/lab';
import { Route, Routes } from 'react-router-dom';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/hospital" element={<Hospital />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/medicine" element={<Pharmacare />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/appointment/:id" element={< AppointmentPage />} />
    </Routes>
  );
};

export default Routers;
 