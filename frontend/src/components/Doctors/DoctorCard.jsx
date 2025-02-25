/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';

const DoctorCard = ({ doctor }) => {
  const { id, name, specialization, avgRating, totalRating, photo, totalPatients, hospital } = doctor;

  return (
    <div className="p-4 border rounded-lg shadow-md w-[250px] text-center">
      <img src={photo} className="w-full h-40 object-cover rounded-lg" alt="Doctor" />
      
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{specialization}</span>
      
      <div className="mt-2 flex justify-center items-center gap-2">
        <img src={starIcon} className="w-4 h-4" alt="Rating" />
        <span className="text-sm font-semibold">{avgRating} ({totalRating})</span>
      </div>

      <p className="text-gray-600 text-sm mt-2">+{totalPatients} patients</p>
      <p className="text-gray-500 text-xs">At {hospital}</p>

      {/* Book Appointment Button */}
      <Link to={`/appointment/${id}`} className="mt-4 inline-block">
        <button className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-800 transition">
          Book Appointment
        </button>
      </Link>
    </div>
  );
};

export default DoctorCard;
