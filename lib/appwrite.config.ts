import * as sdk from "node-appwrite";

const client = new sdk.Client();

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY; // server-only

if (!ENDPOINT || !PROJECT_ID) {
  throw new Error("❌ Faltan variables de entorno públicas de Appwrite");
}

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

// Detectar si estamos en server
const isServer = typeof window === "undefined";

if (isServer && API_KEY) {
  client.setKey(API_KEY); // asegura Service Role solo en server
}

// Exports
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

// Cliente self-service signup
export const account = new sdk.Account(client);

// Users server-only
export const users = isServer ? new sdk.Users(client) : undefined;

// Nuevo helper para crear usuario server-only
export const createUserServer = async (email: string, phone?: string, name?: string) => {
  if (!users) throw new Error("Users client no inicializado");
  return await users.create(sdk.ID.unique(), email, phone, undefined, name);
};
