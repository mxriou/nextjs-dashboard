import { Card } from '@/app/ui/dashboard/cards'; 
import RevenueChart from '@/app/ui/dashboard/revenue-chart'; 
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; 
import { lusitana } from '@/app/ui/fonts';
//Para obtener datos del componente, es necesario importar la función y llamarla desde el componente
import { fetchLatestInvoices, fetchCardData, fetchRevenue } from '@/app/lib/data'; 
//import { LatestInvoiceRaw } from '../../lib/definitions';
//import { sql } from '@vercel/postgres'
import { Suspense } from 'react'; 
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

/*
Suspense es un componente de React que permite "suspender" la renderización 
de un componente hasta que se cumpla una condición. Mientras tanto, se puede 
mostrar un fallback(un componente de carga o un mensaje) para mejorar la experiencia 
del usuario. Lo que esta adentro de las etiquetas <Suspense> es el componente que depende 
de datos asíncronos o tareas que tardan en completarse.
*/
export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
