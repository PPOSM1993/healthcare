import { users } from "../appwrite.config"
import { Query, ID } from "node-appwrite";

export const createUser = async (user: CreateUserParams) => {
    try {
        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

    } catch (error: any) {
        // Si el error es que ya existe el usuario (409 conflict)
        if (error && error?.code === 409) {
            const existingUser = await users.list({
                queries: [Query.equal("email", user.email)]
            })

            return existingUser.users[0]
        }

        throw error
    }
}
