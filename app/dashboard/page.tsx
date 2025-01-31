import { Card } from '@/app/ui/dashboard/cards'; 
import RevenueChart from '@/app/ui/dashboard/revenue-chart'; 
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; 
import { lusitana } from '@/app/ui/fonts';
//Para obtener datos del componente, es necesario importar la función y llamarla desde el componente
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data'; 
import { LatestInvoiceRaw } from '../lib/definitions';
import { sql } from '@vercel/postgres';

export default async function Page(){
    const revenue = await fetchRevenue(); 
    const latestInvoices = await fetchLatestInvoices(); 
    const totalPaidInvoices = await sql`
        SELECT COUNT(*) as count
        FROM invoices 
        WHERE status = 'paid'`;
    const totalPendingInvoices = await sql`
        SELECT COUNT(*) as count
        FROM invoices 
        WHERE status = 'pending'`;
    const numberOfInvoices = await sql`
        SELECT COUNT(*) as count
        FROM invoices`;
    const numberOfCustomers = await sql`
        SELECT COUNT(*) as count
        FROM customers`;
    return(
            <main>
                <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>   
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {<Card title="Collected" value={totalPaidInvoices.rows[0].count} type="collected" />}
                {<Card title="Pending" value={totalPendingInvoices.rows[0].count} type="pending" />}
                {<Card title="Total Invoices" value={numberOfInvoices.rows[0].count} type="invoices" />}
                {<Card 
                    title="Total Customers"
                    value={numberOfCustomers.rows[0].count}
                    type="customers"
                />}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:gris-cols-4 lg:grid-cols-8">
                {<RevenueChart revenue={revenue} />}
                {<LatestInvoices latestInvoices={latestInvoices} />}
                </div>
            </main>

    );
}
