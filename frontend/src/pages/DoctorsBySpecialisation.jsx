import React from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "../components/Doctors/DoctorCard";
import { doctors } from "../assets/data/doctor";

const DoctorsBySpecialisation = () => {
  const { specialisationName } = useParams();

  // Filter doctors by specialization
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialization.toLowerCase() === specialisationName.toLowerCase()
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Doctors Specialised in {specialisationName}
      </h2>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No doctors found for this specialization.</p>
      )}
    </div>
  );
};

export default DoctorsBySpecialisation;
