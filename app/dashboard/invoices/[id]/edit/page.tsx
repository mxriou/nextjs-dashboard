import Form from '@/app/ui/invoices/edit-form'; 
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; 
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'; 
import { notFound } from 'next/navigation';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
    title: 'Create Invoices' 
}; 

{/* Breadcrumbs es una barra de navegación que ayuda a los usuarios a entender su ubicación actual dentro de la 
    aplicación y a navegar fácilmente hacia atrás en la jerarquía de páginas. 
    Esto permite ver la ubicación actual en la aplicación. 
    Navegar rápidamente a secciones anteriores. 
    Entender la relación entre las diferentes páginas o secciones. 
*/}

export default async function Page(props: {params: Promise<{ id: string  }>}){
    const params = await props.params; 
    const id = params.id; 
    const [invoice, customers] = await Promise.all([ fetchInvoiceById(id),   fetchCustomers() ]);

    if (!invoice){
        notFound(); 
    }
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' }, 
                    { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
                ]} 
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );

}