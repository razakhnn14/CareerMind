import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

const credentials = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : serviceAccount;

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(credentials),
      })
    : getApps()[0];

export const auth = getAuth(app);