// importDrugs.js
const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// 1. Initialize Firebase Admin SDK
const serviceAccount = require("./dosis-obat-medis-firebase-adminsdk-fbsvc-4e172a9ed0.json"); // path to your downloaded JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 2. CSV File Path
const csvFilePath = "drug_database.csv"; // Replace with your actual CSV file name

// 3. Collection name in Firestore
const collectionName = "drugs"; // e.g., "drugs"

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", async (row) => {
    try {
      // row object will have keys matching your CSV headers
      // Example: Unique ID Drug, Generic Name, Vendor/Brand Name, ...
      const drugId = row["Unique ID Drug"] || ""; // e.g., "D001"

      // Prepare a Firestore document object from the row
      const drugData = {
        genericName: row["Generic Name"] || "",
        vendorBrandName: row["Vendor/Brand Name"] || "",
        drugClass: row["Drug Class"] || "",
        doseRangePerKg: row["Dose Range Per Kg"] || "",
        maxDose: row["Max Dose"] || "",
        drugForms: row["Drug Forms"] || "",
        indication: row["Indication"] || "",
        contraindications: row["Contraindications"] || "",
        sideEffects: row["Side Effects"] || "",
        reference: row["Reference"] || "",
        additionalNotes: row["Additional Notes"] || "",
      };

      // 4. Write the data to Firestore
      // Option A: Use the Unique ID as the document ID
      await db
        .collection(collectionName)
        .doc(drugId) // use the Unique ID as the doc ID
        .set(drugData);

      console.log(`Imported drug: ${drugId}`);
    } catch (error) {
      console.error("Error importing row: ", error);
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed and imported!");
  });
