import React, { useState } from "react";

const hospitalsData = [
    {
      id: 1,
      name: "Apollo Clinic Silchar",
      location: "Silchar",
      specialties: ["Dermatologist", "ENT", "Pediatrician"],
      image: "https://www.apollohospitals.com/vizag/wp-content/uploads/2015/11/IMG_0198-1024x683.jpg",
      doctors: 3,
    },
    {
      id: 2,
      name: "Arogya Hospital",
      location: "Silchar",
      specialties: ["General Surgeon", "Gynaecologist"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VQYJNIuSDAE3uMB5hjZuGO1D_HoJ1OA1Hg&s",
      doctors: 9,
    },
    {
      id: 3,
      name: "City Maternity Nursing Home",
      location: "Silchar",
      specialties: ["Gynaecologist", "Pediatrician"],
      image: "https://content.jdmagicbox.com/comp/silchar/w5/9999p3842.3842.231017135529.v2w5/catalogue/city-meternity-nursing-home-silchar-nursing-homes-vk72mpl77c.jpg",
      doctors: 2,
    },
    {
      id: 4,
      name: "Greenview Hospital",
      location: "Guwahati",
      specialties: ["Cardiologist", "Orthopedic"],
      image: "https://images.jdmagicbox.com/v2/comp/bangalore/s9/080pxx80.xx80.180216214323.d1s9/catalogue/dr-kirthi-shivalingaiah-greenview-medical-center-hsr-layout-bangalore-paediatric-orthopaedic-doctors-n3tnvxd57y-250.jpg",
      doctors: 5,
    },
    {
      id: 5,
      name: "Downtown Hospital",
      location: "Guwahati",
      specialties: ["Neurologist", "Oncologist"],
      image: "https://content3.jdmagicbox.com/comp/guwahati/85/9999pmulkolstd2585/catalogue/down-town-hospital-dispur-guwahati-private-hospitals-q7tpc1xiww.jpg",
      doctors: 12,
    },
    {
      id: 6,
      name: "GNRC Hospital",
      location: "Guwahati",
      specialties: ["Nephrologist", "Cardiologist"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzZCU9uXz9640thEP3xW4a-cn_xmTaMYhsg&s",
      doctors: 8,
    },
    {
      id: 7,
      name: "Max Super Specialty Hospital",
      location: "Delhi",
      specialties: ["Oncologist", "Cardiologist", "Neurologist"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr88Q2sUA3gFraW22amj57a1GxEHOEP19tQQ&s",
      doctors: 15,
    },
    {
      id: 8,
      name: "Fortis Escorts Heart Institute",
      location: "Delhi",
      specialties: ["Cardiologist"],
      image: "https://chieftourism.com/wp-content/uploads/2020/12/Fortis-Escorts-Hospital-New-Delhi.jpg",
      doctors: 10,
    },
    {
      id: 9,
      name: "Medanta - The Medicity",
      location: "Gurgaon",
      specialties: ["Cardiologist", "Neurologist", "Gastroenterologist"],
      image: "https://upload.wikimedia.org/wikipedia/en/6/68/Medanta_the_medicity_hospital.jpg",
      doctors: 20,
    },
    {
      id: 10,
      name: "AIIMS Delhi",
      location: "Delhi",
      specialties: ["General Physician", "Orthopedic", "ENT"],
      image: "https://www.healthcareitnews.com/sites/hitn/files/Screen%20Shot%202022-10-27%20at%201.55.04%20PM.jpg",
      doctors: 50,
    },
  ];
  

const HospitalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filteredHospitals = hospitalsData.filter((hospital) => {
    const matchesName = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || hospital.location === selectedLocation;
    const matchesSpecialty =
      selectedSpecialty === "All" || hospital.specialties.includes(selectedSpecialty);

    return matchesName && matchesLocation && matchesSpecialty;
  });

  const uniqueLocations = Array.from(new Set(hospitalsData.map((h) => h.location)));
  const uniqueSpecialties = Array.from(new Set(hospitalsData.flatMap((h) => h.specialties)));

  return (
    <div className="bg-gray-100 min-h-screen">
      

      {/* Main Content */}
      <div className="pt-24 p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-6 bg-blue-600 p-4 rounded-lg shadow">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search hospital name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm"
              />
            </div>
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow-sm"
              >
                <option value="All">All Locations</option>
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow-sm"
              >
                <option value="All">All Specialties</option>
                {uniqueSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow">
              Search
            </button>
          </div>

          {/* Hospital List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-4">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.location}</p>
                <p className="text-sm text-blue-500 mt-2">
                  {hospital.specialties.join(", ")}
                </p>
                <p className="text-sm mt-2">
                  <strong>{hospital.doctors}</strong> doctors available
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  View Doctors
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSearch;
