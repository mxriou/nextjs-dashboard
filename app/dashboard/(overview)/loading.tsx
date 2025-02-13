/*
    Loading es un archivo de Next especial construido sobre React Suspense. Le permite crear una interfaz
    de usuario alternativa que se muestra como reemplezo mientras se carga el contenido de la página. 

    Dado que es estático, se muestra inmediatamente. El usuario puede interactuar con él mientras se 
    carga el contenido dinámico.<SideNav><SideNav>

    El usuario no tiene que esperrar a aque la página termine de cargarse antes de salir (a esto se denomina 
    navegación interrumpible.)
*/
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <div>Loading...</div>;
}