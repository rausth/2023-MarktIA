import { AuthController } from "@/controllers/auth";
import { AuthResponseDTO } from "@/dtos/responses/auth/authResponseDTO";
import { MOCKED_USERS } from "@/mocks/user";
import { AxiosError, AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // // Return null if user data could not be retrieved
                // return null

                /**
                 * [TODO]
                 * Descomentar quando backend estiver pronto
                 */
                // return AuthController.authenticate(credentials!)
                //     .then((response: AxiosResponse<AuthResponseDTO>) => response.data)
                //     .catch(() => null)

                /**
                 * Por enquanto simulando um usuario com um token aleatorio
                 */
                const user = {
                    ...MOCKED_USERS[0],
                    id: MOCKED_USERS[0].id.toString(),
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                }

                if (user) {
                    return user;
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    }
});

export { handler as GET, handler as POST };