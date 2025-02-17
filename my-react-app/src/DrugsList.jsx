import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function DrugList() {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  const [filteredDrugs, setFilteredDrugs] = useState([]); // Filtered drug list

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    const querySnapshot = await getDocs(collection(db, "drugs"));
    const drugList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrugs(drugList);
  };

  // Filter drugs dynamically as user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDrugs([]); // Hide list if search is empty
    } else {
      const results = drugs.filter((drug) =>
        drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.vendorBrandName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrugs(results);
    }
  }, [searchTerm, drugs]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Drug List</h2>

      {/* 🔎 Search Bar */}
      <input
        type="text"
        placeholder="Search by generic or brand name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      {/* Display filtered results only if searchTerm is not empty */}
      {filteredDrugs.length > 0 ? (
        filteredDrugs.map((drug) => (
          <div key={drug.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <strong>Nama Generik:</strong> {drug.genericName} <br />
            <strong>Nama Vendor:</strong> {drug.vendorBrandName} <br />
            <strong>Dosis Per KgBB:</strong> {drug.doseRangePerKg} <br />
            <strong>Dosis Maksimal per Hari:</strong> {drug.maxDose} mg <br />
            <strong>Bentuk Sediaan:</strong> {drug.drugForms} <br />
            <strong>Indikasi:</strong> {drug.indication} <br />
            <strong>Kontra-Indikasi:</strong> {drug.contraindications} <br />
            <strong>Efek Samping:</strong> {drug.sideEffects} <br />
            <strong>References:</strong> {drug.reference} <br />
            <strong>Catatan Developer:</strong> {drug.additionalNotes} <br />
          </div>
        ))
      ) : searchTerm.trim() !== "" ? (
        <p>No drugs found matching "{searchTerm}".</p>
      ) : null}
    </div>
  );
}

export default DrugList;
