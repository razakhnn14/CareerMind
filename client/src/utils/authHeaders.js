import { auth } from "../config/firebase";

export const getFreshToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user. Please log in again.");
  }
  return await user.getIdToken();
};


export const getAuthHeaders = async (extraHeaders = {}) => {
  const token = await getFreshToken();
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders,
  };
};
