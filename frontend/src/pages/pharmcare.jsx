import { useState } from 'react';
import React from "react";

const Pharmacare = () => {
    const [search, setSearch] = useState("");
    const [selectedMedicine, setSelectedMedicine] = useState(null);
  
    const medicines = [
      { id: 1, name: "Paracetamol", description: "Pain reliever", price: "$5", image: "https://assets.truemeds.in/Images/ProductImage/TM-TACR1-011691/dolo-650-tablet-15_dolo-650-tablet-15--TM-TACR1-011691_1.png?width=320" },
      { id: 2, name: "Ibuprofen", description: "Anti-inflammatory", price: "$8", image: "https://images.theconversation.com/files/321639/original/file-20200319-22610-18gca3.jpg?ixlib=rb-4.1.0&rect=0%2C25%2C5644%2C3844&q=45&auto=format&w=926&fit=clip" },
      { id: 3, name: "Amoxicillin", description: "Antibiotic", price: "$12", image: "https://m.media-amazon.com/images/I/41-bx-fCENL._AC_UF1000,1000_QL80_.jpg" },
      { id: 4, name: "Cetirizine", description: "Allergy relief", price: "$6", image: "https://5.imimg.com/data5/SELLER/Default/2022/11/PC/QG/YD/122957552/cetirizine-allergy-relief-tablets.jpg" },
      { id: 5, name: "Metformin", description: "Diabetes management", price: "$10", image: "https://images.ctfassets.net/4w8qvp17lo47/36aCkc13mwOuumQ2seygc4/e2e002b451a77e75e6fd98857df4b9eb/pregnancy-metformin-is-it-safe_thumb.jpg" },
      { id: 6, name: "Atorvastatin", description: "Cholesterol reducer", price: "$15", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/361596748/TB/EJ/SI/28656627/atorvastatin-10-mg-tablets.jpg" },
      { id: 7, name: "Losartan", description: "Blood pressure management", price: "$9", image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HF/OG/ZP/102456860/losartas-50-mg-losartan-tablet-500x500.jpeg" },
      { id: 8, name: "Omeprazole", description: "Acid reflux relief", price: "$7", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6UBd12aI-eQiEThsoOJUdgYwjM8COkIL2Q&s" },
      { id: 9, name: "Vitamin D3", description: "Bone health", price: "$4", image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ntl/ntl05889/y/49.jpg" },
      { id: 10, name: "Aspirin", description: "Blood thinner", price: "$6", image: "https://www.grxstatic.com/d4fuqqd5l3dbz/products/cwf_tms/Package_25470.PNG" },
      { id: 11, name: "Ciprofloxacin", description: "Antibiotic", price: "$11", image: "https://5.imimg.com/data5/SELLER/Default/2022/9/EE/NQ/SR/154492060/ciprofloxacin-tablets-i-p-500-mg.png" },
      { id: 12, name: "Levothyroxine", description: "Thyroid management", price: "$14", image: "https://c8.alamy.com/comp/TAA7C4/hypothyroidism-thyroid-hormone-treatment-synthetic-levothyroxine-and-natural-dried-and-powdered-animal-thyroid-containing-t4-and-t3-drug-jars-TAA7C4.jpg" },
      { id: 13, name: "Furosemide", description: "Diuretic", price: "$8", image: "https://www.bambangpharma.com/cdn/shop/files/436609038_1176725193752140_7118678576762279821_n.jpg?v=1715310779" },
      { id: 14, name: "Hydroxychloroquine", description: "Anti-malarial", price: "$13", image: "https://static01.nyt.com/images/2020/04/01/science/01VIRUS-HYDROXY/01VIRUS-HYDROXY-mediumSquareAt3X.jpg" },
      { id: 15, name: "Clopidogrel", description: "Blood thinner", price: "$10", image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HN/TN/VF/125943365/clopilet-clopidogrel-tablets.jpg" },
    ];
  
    const filteredMedicines = medicines.filter((med) =>
      med.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pharmacare</h1>
        <input
  type="text"
  placeholder="Search for medicines..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border-2 border-blue-600 p-2 w-full mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
/>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {filteredMedicines.map((medicine) => (
    <div
      key={medicine.id}
      className="border p-2 rounded shadow-sm hover:shadow-md cursor-pointer w-40"
      onClick={() => setSelectedMedicine(medicine)}
    >
      <img src={medicine.image} alt={medicine.name} className="w-20 h-20 object-cover mb-2 rounded" />
      <h2 className="text-sm font-semibold">{medicine.name}</h2>
      <p className="text-xs">{medicine.description}</p>
    </div>
  ))}
</div>

{selectedMedicine && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded shadow-lg w-1/2 max-w-sm">
      <img src={selectedMedicine.image} alt={selectedMedicine.name} className="w-32 h-32 object-cover mx-auto mb-4 rounded" />
      <h2 className="text-lg font-bold mb-2 text-center">{selectedMedicine.name}</h2>
      <p className="text-center text-sm">{selectedMedicine.description}</p>
      <p className="text-center font-bold mt-2">Price: {selectedMedicine.price}</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => alert("Medicine purchased successfully!")}
        >
          Buy Now
        </button>
        <button
          className="text-red-500 underline"
          onClick={() => setSelectedMedicine(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    );
  };

  export default Pharmacare;
