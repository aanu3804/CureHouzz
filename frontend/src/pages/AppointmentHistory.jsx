import React, { useEffect, useState } from "react";
import appointmentData from "./AppointmentData"; // <-- Import your JSON file

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Use the imported JSON data directly
    setAppointments(appointmentData);
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📅 Appointment History</h2>

      {appointments.length === 0 ? (
        <p>No past appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Patient Name</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Lab</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="text-center border">
                <td className="border p-2">{appointment.name}</td> {/* Updated field name */}
                <td className="border p-2">{appointment.service}</td>
                <td className="border p-2">{appointment.lab}</td>
                <td className="border p-2">{appointment.date}</td>
                <td className="border p-2">{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentHistory;
