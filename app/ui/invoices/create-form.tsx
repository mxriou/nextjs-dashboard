'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {  createInvoice, State } from '@/app/lib/actions';
{/*Este componente toma dos argumentos (action, initialState)
  Devuelve dos valores: El estado del formulario y una función 
  a la que se llamará cuando se envíe el formulario [state, formAction]
*/}
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };

  // Este es un hook devuelve un estado (state) y una función (formAction) que se pasa como action al formulario
  //createInvoice es una función que define la acción que se ejecutará cuando se envíe el formulario 
  // initialState es el estado inicial del formulario 
  //Cuando el usuario envía el formulario, React ejecuta createInvoice, y el nuevo estado se almacena en state
  //Cuando el usuario envía el formulario, React llamará a createInvoice. Este recibirá el estado anterior del formulario 
  // (incialmente el que pasa, posteriormente su valor de retorno anterior) como su argumento inicial, seguido de los 
  //argumentos que normalmente recibe una acción del formulario. initialState
  //useActionState devuelte una matriz con los siguientes valores: El estado actual, una nueva acción, el indicador que indica si hay una transición pendiente. 
  const [state, formAction] = useActionState(createInvoice, initialState);  return (
    <form action={formAction}>
      {/*border radius: 6px padding: 1rem   md breckpoint: padding: 1.5rem*/}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name*/}
        {/* margin-bottom: 1rem*/}
        <div className="mb-4">
          {/*margin-bottom: 0.5rem  display:block  font-size: 0.87rem  font-weight: 500*/}
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          {/* 
              display: block; width: 100%;  cursor: pointer; border-radius: 6px;  border: 1px solid rgb(229 231 235);  padding: 0.5rem 0 0.5rem 2.5rem; font-size: 0.875rem; outline-width: 2px; placeholder color: rgb(107 114 128);
            */}
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='customer-error'
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {
              state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))
            }
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount && state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {
                  state.errors?.status &&
                  state.errors.status.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                  ))
                }
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
