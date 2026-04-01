import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        // For now, we do a simple string comparison or assume it's seeded differently.
        // In a real app we'd use bcrypt to compare hashes:
        // const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
}
