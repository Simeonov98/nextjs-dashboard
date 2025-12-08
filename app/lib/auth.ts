import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../../auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
//import postgres from 'postgres';
import { prisma } from '../../lib/prisma';
 

async function getUser(email:string): Promise<User | null> {
  return prisma.users.findUnique({
    where: { 
      email
    } 
  })
}

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks:{
    async session({ session, token}){
     if (session.user && token.sub){
      session.user.id = token.sub
     }
     return session
    }
  },  
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});