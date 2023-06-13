import { AuthController } from "@/controllers/auth";
import { AuthResponseDTO } from "@/dtos/responses/auth/authResponseDTO";
import { AxiosResponse } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                return AuthController.authenticate({
                    email: credentials?.email!,
                    password: credentials?.password!
                })
                    .then((response: AxiosResponse<AuthResponseDTO>) => response.data)
                    .catch(() => null)
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
    },
    session: {
        maxAge: 1 * 60 * 60
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };