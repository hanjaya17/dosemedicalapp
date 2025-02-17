import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

function AdminDashboard() {
  const { userRole } = useAuth();
  const [drugs, setDrugs] = useState([]);
  const [formData, setFormData] = useState({
    genericName: "",
    vendorBrandName: "",
    doseRangePerKg: "",
    maxDose: "",
    drugForms: "",
    indication: "",
    contraindications: "",
    sideEffects: "",
    reference: "",
    additionalNotes: "",
  });
  const [editingDrugId, setEditingDrugId] = useState(null); // Track which drug is being edited

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRole !== "superdoctor") return; // Prevent unauthorized users from submitting

    if (editingDrugId) {
      // Update existing drug
      await updateDoc(doc(db, "drugs", editingDrugId), formData);
      setEditingDrugId(null);
    } else {
      // Add new drug
      await addDoc(collection(db, "drugs"), formData);
    }

    setFormData({
      genericName: "",
      vendorBrandName: "",
      doseRangePerKg: "",
      maxDose: "",
      drugForms: "",
      indication: "",
      contraindications: "",
      sideEffects: "",
      reference: "",
      additionalNotes: "",
    });

    fetchDrugs();
  };

  const handleEdit = (drug) => {
    setFormData(drug);
    setEditingDrugId(drug.id);
  };

  const handleDelete = async (id) => {
    if (userRole !== "superdoctor") return;
    await deleteDoc(doc(db, "drugs", id));
    fetchDrugs();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      {userRole === "superdoctor" ? (
        <>
          <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <h3>{editingDrugId ? "Edit Drug" : "Add New Drug"}</h3>
            <input type="text" name="genericName" placeholder="Generic Name" value={formData.genericName} onChange={handleChange} required />
            <input type="text" name="vendorBrandName" placeholder="Vendor/Brand Name" value={formData.vendorBrandName} onChange={handleChange} />
            <input type="text" name="doseRangePerKg" placeholder="Dose Per Kg" value={formData.doseRangePerKg} onChange={handleChange} />
            <input type="text" name="maxDose" placeholder="Max Dose" value={formData.maxDose} onChange={handleChange} />
            <input type="text" name="drugForms" placeholder="Drug Forms" value={formData.drugForms} onChange={handleChange} />
            <input type="text" name="indication" placeholder="Indication" value={formData.indication} onChange={handleChange} />
            <input type="text" name="contraindications" placeholder="Contraindications" value={formData.contraindications} onChange={handleChange} />
            <input type="text" name="sideEffects" placeholder="Side Effects" value={formData.sideEffects} onChange={handleChange} />
            <input type="text" name="reference" placeholder="Reference" value={formData.reference} onChange={handleChange} />
            <input type="text" name="additionalNotes" placeholder="Additional Notes" value={formData.additionalNotes} onChange={handleChange} />

            <button type="submit">{editingDrugId ? "Update Drug" : "Add Drug"}</button>
          </form>
        </>
      ) : (
        <p>❌ You do not have permission to add/edit drugs.</p>
      )}

      <h3>Existing Drugs</h3>
      <ul>
        {drugs.map((drug) => (
          <li key={drug.id} style={{ marginBottom: "1rem" }}>
            <strong>{drug.genericName}</strong> ({drug.vendorBrandName}) - {drug.doseRangePerKg} mg/kg

            {userRole === "superdoctor" && (
              <>
                <button onClick={() => handleEdit(drug)} style={{ marginLeft: "0.5rem" }}>Edit</button>
                <button onClick={() => handleDelete(drug.id)} style={{ marginLeft: "0.5rem", backgroundColor: "red", color: "white" }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
