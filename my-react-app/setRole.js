import admin from "firebase-admin";
import { readFile } from "fs/promises";
import path from "path";

// Load Firebase Admin SDK credentials
const serviceAccountPath = path.resolve("C:/Users/thanj/OneDrive/Desktop/Project Dose App/my-react-app/serviceAccountKey.json");
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const setCustomUserClaim = async () => {
  const email = "timotiusdr@gmail.com"; // Change this to your SuperDoctor email

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: "superdoctor" });

    console.log(`✅ Role 'superdoctor' set for ${email}`);
  } catch (error) {
    console.error("❌ Error setting role:", error);
  }
};

setCustomUserClaim();
