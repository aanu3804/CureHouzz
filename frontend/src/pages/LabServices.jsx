import React from "react";
import { useNavigate, useParams } from "react-router-dom";  // ✅ Correct import

const servicesData = {
  "MediCore Pharmaceuticals": [
    { name: "MRI Scan", description: "Magnetic Resonance Imaging for detailed body scans." },
    { name: "Blood Test", description: "Complete blood analysis for various health checks." },
    { name: "CT Scan", description: "Detailed imaging of bones, muscles, and organs." },
    { name: "X-Ray", description: "Radiographic imaging for diagnosing fractures and infections." },
    { name: "Ultrasound", description: "High-frequency sound waves for medical imaging." },
  ],
  "BioCure Labs": [
    { name: "Ultrasound", description: "High-frequency sound waves for medical imaging." },
    { name: "ECG", description: "Electrocardiogram test for heart monitoring." },
    { name: "Diabetes Test", description: "Check for blood sugar levels." },
  ],
  "NovaHeal Therapeutics": [
    { name: "Liver Function Test", description: "Analyzes liver enzyme levels." },
    { name: "Kidney Function Test", description: "Evaluates kidney health." },
  ],
  "Vitalis Pharma": [
    { name: "Blood Pressure Test", description: "Monitors blood pressure levels." },
    { name: "Thyroid Test", description: "Checks for thyroid hormone levels." },
  ],
  "Zenith Biotech": [
    { name: "DNA Testing", description: "Genetic analysis for ancestry and health." },
    { name: "Hormone Analysis", description: "Measures hormone levels in the body." },
  ],
};

const LabServices = () => {
  const { labName } = useParams();   // ✅ Ensure this works correctly
  const navigate = useNavigate();    // ✅ No errors now

  const services = servicesData[labName] || [{ name: "No services available", description: "" }];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{labName} - Available Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {services.map((service, index) => (
       <div key={index} className="flex flex-col justify-between p-4 border rounded-lg bg-gray-100 shadow-md h-full">
       <div>
         <h2 className="text-lg font-semibold">{service.name}</h2>
         <p className="text-gray-600">{service.description}</p>
       </div>
       <button
         onClick={() => navigate(`/book-service/${labName}/${encodeURIComponent(service.name)}`)}
         className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
       >
         Book Now
       </button>
     </div>
     
        ))}
      </div>
    </div>
  );
};

export default LabServices;
