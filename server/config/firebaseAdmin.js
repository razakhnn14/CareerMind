import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

const credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(credentials),
      })
    : getApps()[0];

export const auth = getAuth(app);
