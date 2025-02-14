import NextAuth from 'next-auth'; 
import { authConfig } from './auth.config'; 
//El proveedor de credenciales permite a los usuarios iniciar sesión con un nombre de usuario y una contraseña
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions'; 
import bcrypt from 'bcrypt'; 
//import postgres from 'postgres';
import {Pool} from 'pg'; 


const sql = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});


async function getUser(email: string): Promise<User | undefined>{
    try{
        const result = await sql.query<User>(`SELECT * FROM users WHERE email=$1`, [email]);
        return result.rows[0]; 
    }catch(error){
        console.error('Error al obtener usuario: ', error); 
        throw new Error('Error al obtener usuario'); 
    }
}

export const { auth, signIn, signOut } = NextAuth({ 
    ...authConfig,
    providers: [
        Credentials({ async authorize(credentials){ const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials); 

                if(parsedCredentials.success){
                    const { email, password } = parsedCredentials.data; 
                    const user = await getUser(email);
                    if(!user)   return null;
                    const passwordMatch = await bcrypt.compare(password, user.password); 
                    
                    if(passwordMatch) return user; 
                }
                console.log('Invalid credentials');
                return null; 
            },
        }),
    ],
}); 