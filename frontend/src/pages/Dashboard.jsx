import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        const fetchAppointments = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:5000/appointments/${encodeURIComponent(user.email)}`);
                    if (response.ok) {
                        const text = await response.text();
                        const data = text ? JSON.parse(text) : [];
                        setAppointments(data);
                    } else {
                        console.error("❌ Failed to fetch user appointments");
                    }
                } catch (error) {
                    console.error("❌ Error:", error.message);
                }
            }
        };
    
        fetchAppointments();
    }, [user?.email]);
    

    // ✅ Function to Delete Appointment
    const handleDelete = async (appointment) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the appointment for ${appointment.name} on ${appointment.date} at ${appointment.time}?`
        );

        if (!confirmDelete) return;

        try {
          const response = await fetch(
            `http://localhost:5000/appointments/${encodeURIComponent(appointment.email)}/${encodeURIComponent(appointment.date)}/${encodeURIComponent(appointment.time)}`,
            {
                method: "DELETE",
            }
        );
        

            if (response.ok) {
                alert("✅ Appointment deleted successfully!");
                setAppointments((prev) =>
                    prev.filter(
                        (item) =>
                            item.email !== appointment.email ||
                            item.date !== appointment.date ||
                            item.time !== appointment.time
                    )
                );
            } else {
                console.error("❌ Failed to delete appointment");
            }
        } catch (error) {
            console.error("❌ Error deleting appointment:", error.message);
        }
    };

    if (!user) {
        return <div className="text-center p-6">You must be logged in to view the dashboard.</div>;
    }

    const capitalizeFirstLetter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
    };

    return (
        <div className="flex min-h-screen font-sans bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-6">
                <h3 className="text-lg font-semibold mb-6">Menu</h3>
                <ul className="space-y-3">
                    {[
                        { name: "Dashboard", key: "profile" },
                        { name: "Appointment History", key: "appointments" },
                        { name: "My Health Insurance", key: "insurance" },
                        { name: "My Lab Tests", key: "labTests" },
                        { name: "Settings", key: "settings" },
                    ].map((item) => (
                        <li
                            key={item.key}
                            className={`p-3 rounded cursor-pointer ${activeTab === item.key ? "bg-blue-600" : "hover:bg-blue-500"}`}
                            onClick={() => setActiveTab(item.key)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {activeTab === "profile" && (
                    <div className="bg-white p-6 shadow-lg rounded-lg w-96 mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
                        <img src={user.profileImage || "https://via.placeholder.com/100"} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300" />
                        <div className="space-y-4">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {capitalizeFirstLetter(user.role)}</p>
                            <p><strong>Gender:</strong> {capitalizeFirstLetter(user.gender)}</p>
                            <p><strong>Verified:</strong> {user.verified ? "Yes" : "No"}</p>
                        </div>
                    </div>
                )}

                {/* ✅ Updated Appointment History with Delete Button */}
                {activeTab === "appointments" && (
                    <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">📜 Appointment History</h2>

                        {appointments.length === 0 ? (
                            <p className="text-gray-600 mt-4 text-center">No appointments booked yet.</p>
                        ) : (
                            appointments.map((appointment, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow bg-gray-100 mb-3">
                                    <p><strong>👤 Patient:</strong> {appointment.name}</p>
                                    <p><strong>📧 Email:</strong> {appointment.email}</p>
                                    <p><strong>📌 Service:</strong> {appointment.service}</p>
                                    <p><strong>🏥 Lab:</strong> {appointment.lab}</p>
                                    <p><strong>📅 Date:</strong> {appointment.date}</p>
                                    <p><strong>⏰ Time:</strong> {appointment.time}</p>
                                    <button
                                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleDelete(appointment)}
                                    >
                                        🗑️ Delete Appointment
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "insurance" && (
                    <div className="bg-white p-6 shadow-lg rounded-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">🏥 My Health Insurance</h2>
                        <p className="text-gray-600 text-center">Your insurance details will be displayed here.</p>
                    </div>
                )}

                {activeTab === "labTests" && (
                    <div className="bg-white p-6 shadow-lg rounded-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">🧪 My Lab Tests</h2>
                        <p className="text-gray-600 text-center">Your lab test history will be displayed here.</p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-white p-6 shadow-lg rounded-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">⚙️ Settings</h2>
                        <p className="text-gray-600 text-center">Account settings will be displayed here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
