'use server';

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";


export const createUser = async (user: CreateUserParams & { password?: string }) => {
  try {
    // Detectar si estamos en server o cliente
    const isServer = typeof window === "undefined";

    let newUser;

    console.log("isServer:", isServer);
    console.log("users client config:", users);

    if (isServer && users) {
      // Server: crear usuario admin con Service Role
      newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone, // phone opcional
        undefined,   // password opcional para admin
        user.name
      );
    } else {
      // Cliente: self-service signup con account.create()
      //if (!user.password) throw new Error("Password required for client signup");

      newUser = await account.create(
        ID.unique(),
        user.email,
        //user.password,
        user.name
      );
    }

    console.log("Usuario creado:", newUser);
    return newUser;

  } catch (error: any) {
    console.error("Error creando usuario:", error);

    // Si el usuario ya existe
    if (error?.code === 409 && users) {
      const existingUser = await users.list([Query.equal("email", [user.email])]);
      return existingUser.users[0];
    }

    throw error;
  }
};


export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error)
  }
}