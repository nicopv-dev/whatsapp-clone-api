import "dotenv/config";

export const SERVER_PORT = process.env.PORT || 8000;

export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASS = process.env.MONGO_PASS;
export const MONGO_URI = process.env.MONGO_URI;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const CLIENT_URL = process.env.CLIENT_URL;
export const CALLBACK_URL =
  process.env.CALLBACK_URL || "/api/auth/google/callback";
