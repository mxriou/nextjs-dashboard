import Pagination from '@/app/ui/invoices/pagination'; 
import Search from '@/app/ui/search'; 
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { fetchInvoicesPages } from '@/app/lib/data';

//Los componentes de página aceptan una propiedad llamada searchParam, por lo que se puede 
// pasar los parametros de URL actuales al componente <Table>
//searchParams: Es una propiedad opcional (?) que es una Promesa 
//Promise<{quey?: string; page?: string }>: Esta promesa resuelve a un objeto que puede tener dos promesas 
//  query: Un string opcional que representa el término de búsqueda 
//  page: Un string opcional que representa el número de página
export default async function Page(props: {searchParams?: Promise<{query?: string; page?: string; }>; }){
    const searchParams = await props.searchParams;
    const query = searchParams?.query || ''; 
    const currentPage = Number(searchParams?.page) || 1;
    //fetchInvoicesPages devuelve el número total de páginas eunción de la consulta de búsqueda. Por ejemplo, si hay 
    //12 facturas que coinciden con la consulta de búsqueda y cada página muestra 6 facturas, el número total de páginas sería 2
    const totalPages = await fetchInvoicesPages(query);

    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between ">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="my-4 w-full items-center justify-between gap-2 md:mt-8">
                {/*Search permite al usuario buscar por invoices específicos*/}
                <Search placeholder='Search invoices...' /> 
                <CreateInvoice />
            </div>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
        </div>
    
    );
}

//Capturar la entrada del usuario 
//Actualizar la URL con los parámetros de búsqueda 
//Mantener la URL sincronizada con el campo de entrada 
//Actualice la table para reflejar la consulta de búsqueda
