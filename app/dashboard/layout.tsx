/*Este archivo layout define un diseño que se aplica a todas las páginas dentro de esta carpeta 
* y sus subcarpetas. 
* Es útil para incluir elementos que deben ser consistentes en varias páginas, como un encabezado, un pie de página 
* o un menú de navegación. 
* A diferencia de page.tsx, el layout no se re-renderiza cuando cambias de página dentro de la misma carpeta, lo que 
* mejora el rendimiento*/

import SideNav from '@/app/ui/dashboard/sidenav'; 

export const experimental_ppr = true;

export default function Layout({ children }: {children: React.ReactNode }){
    return (
       <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
       </div>
    ); 
}
