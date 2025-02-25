import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookService = () => {
    const { labName, serviceName } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: serviceName || "",
        date: "4",
        month: "March",
        year: "2025",
        time: "",
    });

    const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const months = ["January", "February", "March", "April", "May"];
    const years = ["2025", "2026", "2027"];
    const timeSlots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];

    const getFormattedDate = () => {
        return `${formData.date} ${formData.month}, ${formData.year}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTimeSelection = (time) => {
        setFormData((prevData) => ({ ...prevData, time }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.service || !formData.time) {
            alert("❌ Please fill all details before booking.");
            return;
        }

        const newAppointment = {
            name: formData.name,
            email: formData.email,
            service: formData.service,
            lab: labName || "Default Lab",
            date: getFormattedDate(),
            time: formData.time,
        };

        try {
            const response = await fetch("http://localhost:5000/save-appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });

            if (response.ok) {
                alert("✅ Appointment booked successfully!");
                setFormData({
                    name: "",
                    email: "",
                    service: serviceName || "",
                    date: "4",
                    month: "March",
                    year: "2025",
                    time: "",
                });
            } else {
                alert("❌ Failed to book appointment.");
            }
        } catch (error) {
            console.error("❌ Error:", error.message);
            alert("❌ An error occurred while booking.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Book {serviceName || "a Service"} at {labName || "our Lab"}</h1>

            <div className="mt-4 p-4 border rounded-lg bg-gray-100 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-semibold">Your Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <label className="block font-semibold">Your Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <label className="block font-semibold">Service:</label>
                    <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        placeholder="Enter service name"
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <label className="block font-semibold">Select Date:</label>
                    <div className="flex gap-2 mt-2">
                        <select
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="p-2 border rounded-md"
                        >
                            {days.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>

                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="p-2 border rounded-md"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>

                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="p-2 border rounded-md"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <label className="block font-semibold mt-4">Select Time:</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {timeSlots.map((time) => (
                            <button
                                type="button"
                                key={time}
                                onClick={() => handleTimeSelection(time)}
                                className={`px-4 py-2 rounded-md border ${
                                    formData.time === time ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                    >
                        ✅ Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookService;
