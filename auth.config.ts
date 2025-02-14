//Este objeto contendrá las opciones de configuración para NextAuth.js. 
import type { NextAuthConfig } from 'next-auth'; 

export const authConfig = {
 /*
 *  Se puede usar la opción para especificar la ruta para las páginas personalizadas de inicio de sesión,  
 *  cierre de sesión y error. Esto no es obligatirio, pero al agregar a nuestra opción, el usuario 
 *  será redirigido a nuestra página de inición de sesión personalizada, en lugar de a la página
 *  predeterminada NextAuth.js pages signIn: '/login' pages
 */
   pages: {
        signIn: '/login',
    },
    //Agregado de Middleware
    //Esto protegerá las rutas. Impedirá que los usuarios accedan a las páginas del panel a menos que hayan iniciado sesión
    //La propiedad contiene la sesión del usuario y la  propiedad conteiene la solicitud entrante
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user; 
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); 
            if(isOnDashboard){
                if(isLoggedIn) return true; 
                return false; 
            }else if(isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true; 
        },
    },
    providers:[],
} satisfies NextAuthConfig;

