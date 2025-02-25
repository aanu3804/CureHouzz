import { useParams } from "react-router-dom";
import { doctors } from "../assets/data/doctor"; // Import doctor data
import { useState } from "react";

const AppointmentPage = () => {
  const { id } = useParams();
  const doctor = doctors.find((doc) => doc.id === id);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableDates = ["WED 4", "THU 5", "FRI 6", "SAT 7", "SUN 8", "MON 9", "TUE 10"];
  const availableTimes = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"];

  if (!doctor) {
    return <p className="text-center mt-5">Doctor not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Doctor Information */}
      <div className="flex flex-col sm:flex-row bg-white p-6 rounded-lg shadow-lg">
        <img 
          src={doctor.photo} 
          className="w-full sm:w-1/3 h-auto rounded-lg object-cover" 
          alt={doctor.name} 
        />
        <div className="sm:ml-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{doctor.name} <span className="text-blue-600">✔</span></h1>
          <p className="text-gray-600 text-lg">{doctor.specialization} - {doctor.totalPatients} patients</p>
          <p className="text-gray-500">At {doctor.hospital}</p>
          <p className="font-bold text-lg mt-2">Appointment fee: <span className="text-blue-600">5000</span></p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Booking Slots</h2>
        <div className="flex gap-2 sm:gap-3 mt-4 overflow-x-auto">
          {availableDates.map((date, index) => (
            <button 
              key={index} 
              className={`px-4 py-2 rounded-full ${selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-200"}`} 
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3 mt-3 overflow-x-auto">
          {availableTimes.map((time, index) => (
            <button 
              key={index} 
              className={`px-3 py-2 rounded-full ${selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-200"}`} 
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Book Appointment Button */}
        <button 
          className={`mt-6 w-full py-3 bg-blue-600 text-white text-lg font-bold rounded hover:bg-blue-800 transition ${!selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""}`} 
          disabled={!selectedDate || !selectedTime}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentPage;
