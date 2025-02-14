import NextAuth from 'next-auth'; 
import { authConfig } from './auth.config'; 

export default NextAuth(authConfig).auth; 

//Aqui se inicializa NextAuth.json con el objeto y se exporta la propiedad. Se usa la opción de middleware para 
//especificar que debe ejecutarse en rutas específicas. authConfig auth master 

//La ventaja de emplear middleware para esta tarea es que las rutas protegidas ni siquiera comenzarán a renderizarse 
// hasta que el middleware verifique la autenticación, lo que mejora tanto la seguridad como el rendimiento de la aplicación.



export const config = {
    //  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};