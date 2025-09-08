import * as sdk from "node-appwrite";

const client = new sdk.Client();

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY; // solo disponible en servidor

if (!ENDPOINT || !PROJECT_ID) {
  throw new Error("❌ Faltan variables de entorno públicas de Appwrite");
}

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

// Detectar si estamos en servidor (Node.js) o cliente (browser)
const isServer = typeof window === "undefined";

if (isServer && API_KEY) {
  client.setKey(API_KEY);
}

// Exports
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

// Para clientes usamos Account (registro self-service)
export const account = new sdk.Account(client);

// Para servidor usamos Users (admin / Service Role)
export const users = isServer ? new sdk.Users(client) : undefined;
