import NextAuth, { CredentialsSignin, User } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import axios from 'axios';

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      authorize: async ({ username, password, role }) => {
        if(role === 'admin') {
          if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            return { id: 1, username: process.env.ADMIN_USERNAME, role: 'admin' };
          }else {
            throw new CredentialsSignin({ cause: "Incorrect username or password" });
          }
        }
        try {
            const apiUrl = process.env.API_URL;
            const response = await axios.get(`${apiUrl}/api/getEmployeeByUserName?userName=${username}`);
          const employee = response.data;

          if (!employee || employee.password !== password) {
            throw new CredentialsSignin({ cause: "Incorrect username or password" });
          }

          return { id: employee._id, username: employee.userName, role: 'employee' };
        } catch (error) {
          throw new CredentialsSignin({ cause: "Incorrect username or password" });
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the JWT if it exists
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add data from the token to the session object
      session.user = {
        id: token.id as string,
        username: token.username as string,
        role: token.role as string,
        email: token.email as string,
        emailVerified: token.emailVerified as Date,
      };
      return session;
    },
  },
});