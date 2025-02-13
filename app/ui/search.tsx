'use client'; 

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';                                                                                                                      
import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); 
  const pathname = usePathname(); 
  const { replace } = useRouter();

  //Esta función ajustará el contenido, y solo ejecutará el código despues de un tiempo específico 
  const handleSearch = useDebouncedCallback((term: string): void => {
    console.log(`Searching...${term}`);
    //URLSearchParams es una API web que proporciona método de utilidad para manipular los parámetros de consulta de URL. 
    //En lugar de crear un literal de cadena complejo, puede usarlo para obtener la cadena de parámetros como. ?page=1&query=a
    const params = new  URLSearchParams(searchParams);
    //Cuando el usuario escribe una nueva consulta de busqueda, desea restablecer el número de página a 1
    params.set('page', '1');
      if(term){
        params.set('query', term); 
      }else{
        params.delete('query');
      }
      //pathname es el path actual, en este caso "/dashboard/invoices"
      //A medida que el usuario ingresa en el menu de búsqueda, params.toString() traduce este input en un formato amigable URL 
      //replace actualiza la URL con los datos ingresados por el usuario. Por ejemplo /dashboard/invoices?query=lee
      //Ahora la URL es actualizada sin recargar la página, gracias a Nect.js client-side navigation
      replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

/*
Funcionamiento del debouncing
  1. Evento desentadenante: Cuando se produce un evento que debe ser debotado (como una pulsación de tecla en el cuadro de búsqueda)
  2. Esperar: Si se produce un nuevo evento antes de que caduque el temporizador, el temporizador se restablece. 
  3. Ejecución: Si el temporizador llega al final de su cuenta regresiva, se ejecuta la función debotada. 
*/
