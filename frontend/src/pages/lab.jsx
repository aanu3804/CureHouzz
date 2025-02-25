import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const labData = [
  { name: "MediCore Pharmaceuticals", location: "Silchar", image: "https://www.shutterstock.com/image-photo/shot-sterile-pharmaceutical-manufacturing-laboratory-260nw-1268263657.jpg" },
  { name: "BioCure Labs", location: "Mumbai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpoVNcWZPwrzXaXkfaukPH2n_btqFK60Cx_g&s" },
  { name: "NovaHeal Therapeutics", location: "Dubai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD-nFHnuepKfi3WyYz3W8AtAYtJ4SZeKfRPQ&s" },
  { name: "Vitalis Pharma", location: "Guwahati", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8t2hpME0Xf_KsqiKW2wIGsAYJX8NfMEkpAQ&s" },
  { name: "Zenith Biotech", location: "Delhi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOl28vV5C7dkpfpJ301a77RWdy0j7yHuSyg&s" },
];

const LabBookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredLabs = labData.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === "All" || lab.location === selectedLocation)
  );

  const uniqueLocations = ["All", ...new Set(labData.map((lab) => lab.location))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 🔷 Search Bar with Blue Border */}
    {/* Search Filters - Styled like the Image */}
{/* Search Filters - Styled like the Image */}
<div className="bg-blue-600 p-2 rounded-lg mb-6">
  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-lg w-full">
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search lab name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-3 border rounded-lg w-full sm:flex-1 outline-none"
    />

    {/* Location Dropdown */}
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="p-3 border rounded-lg w-full sm:w-auto"
    >
      {["All Places", ...new Set(labData.map((lab) => lab.location))].map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>

    {/* Search Button */}
    <button className="text-blue-700 font-semibold px-4 py-2 rounded-lg">
      Search
    </button>
  </div>
</div>



      {/* 🔷 Lab Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredLabs.map((lab, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={lab.image}
              alt={lab.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{lab.name}</h2>
            <p className="text-gray-500">{lab.location}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 w-full transition duration-300 hover:bg-blue-700"
              onClick={() => navigate(`/lab/${lab.name}/services`)}
            >
              View Services
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabBookings;
