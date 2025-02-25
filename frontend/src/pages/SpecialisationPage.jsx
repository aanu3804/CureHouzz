import React from "react";
import { useNavigate } from "react-router-dom";

const specialisations = [
  { id: 1, name: "Cardiology", image: "https://thumbs.dreamstime.com/z/cardiologist-working-digital-device-hands-lab-wit-doctor-holding-tablet-drawing-heart-title-88757628.jpg" },
  { id: 2, name: "Neurology", image: "https://www.beamshospital.in/wp-content/uploads/elementor/thumbs/neuro-physician-beams-hospital-640x631-pr445e5nhkd5afekzfjcaa85lq53oknvxxu9ax38d0.jpg" },
  { id: 3, name: "Orthopedics", image: "https://onphospitals.com/wp-content/uploads/2022/05/Blog-image.jpg" },
  { id: 4, name: "Dermatology", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLJED5mPcJsLWi29hGj1OaoTR5OOePA5-iIA&s" },
  { id: 5, name: "Pediatrics", image: "https://www.northshore.org/globalassets/healthy-you/blog/2012-2014/pediatric-appointments.jpg" },
  { id: 6, name: "Psychiatry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldiSdslV4G5Ss9t4zLlPs3KyPS40MizsMVw&s" },
  { id: 7, name: "Ophthalmology", image: "https://cdn.vectorstock.com/i/1000v/72/28/ophthalmology-doctor-set-female-male-vector-20257228.jpg" },
  { id: 8, name: "Gynecology", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMrq2vlaCver_6TL_ZUK_RP1cw1KXPGPpAeQ&s" },
  { id: 9, name: "ENT", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmqZMf6uYEssLJbX4_PCYMDZW6K6HrX2ZdIw&s" },
];

const SpecialisationPage = () => {
  const navigate = useNavigate();

  const viewDoctors = (specialisation) => {
    navigate(`/specialisation/${encodeURIComponent(specialisation)}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Specialisations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {specialisations.map((speciality) => (
          <div key={speciality.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={speciality.image}
              alt={speciality.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{speciality.name}</h3>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => viewDoctors(speciality.name)}
            >
              View Doctors
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialisationPage;
