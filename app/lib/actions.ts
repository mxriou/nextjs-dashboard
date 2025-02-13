/*
    En HTML, psaría un URL al atributo. Esta URL sería el destino al que se deben enviar los datos del formulario 
    (normalmente  un punto de conexión de la API). action 
    Sin embargo, en React, el atributo se considera una propiedad especial, lo que significa que React se basa en 
    él para permitir que se invoquen acciones. action 
    En segundo plano, las acciones del servidor crean un punto de conexión de API. Esta es la razón por la que no 
    es necesario crear puntos de conexión de API manualmente al usar Server Actiones. POST
*/
'use server';
/*
Este es un esquema que define la estructura y tipos de datos que debe tener 
un formulario de factura (invoice). El método coerce en amount intentará 
convertir el valor de entrada a un número.
Un esquema es una definición de la estructura de un objeto, incluyendo 
los tipos de datos de sus propiedades y cualquier validación adicional que se 
deba realizar. 
*/
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//pg (node-postgres) es una herramienta para genstionar bases de datos PostgreSQL
//Maneja un conjunto o ("pool") de conexiones a la base de datos, lo que mejora el 
//rendimiento y la eficiencia de las operaciones de la base de datos. 
import { Pool } from 'pg';
import { Client } from '@vercel/postgres';

//Ya que se está actualizzando los datos mostrados en la ruta de facturas
//se necesita aclarar este cache y activar una nueva solicitud al servidor

export type State = {
    errors?: {
        customerId?: string[]; 
        amount?: string[]; 
        status?: string[];
    };
    message?: string | null;
};

const sql = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

const FormSchema = z.object({
    id: z.string({
        invalid_type_error: 'Please select a customer',
    }).min(1, { message: 'Please select a customer'}),
    customerId: z.string(),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0' }), //Convierte y valida que amount sea un número
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }), //Solo permite los valores 'pending' o 'paid'
    date: z.string(), 
}); 
//Crea un nuevo esquema basado, pero omitiendo los campos de id y date. 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
//Crea un nuevo esquema para actualizar los datos 
const UpdateInvoice = FormSchema.omit({ id: true, date: true }); 

export async function createInvoice(prevState: State, formData: FormData){
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'), 
        amount: formData.get('amount'), 
        status: formData.get('status'),
    });

    //Verificacion de los campos del formulario para que este correctamente 
    console.log(validatedFields);
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            message: 'Missing Fields. Failed to Create Invoice',
        };
    }

    //Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;  
    const date = new Date().toISOString().split('T')[0]; //Obtiene la fecha actual y rescata la primera parte antes de la T 
    //Crea una query de SQL para insertar la nueva factura en nuestra base de datos
    try{
        await sql.query(`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES ($1, $2, $3, $4)
        `, [customerId, amountInCents, status, date]);
    //Elimina la caché del lado del cliente dado que se estan actualizando los datos que se muestran en la ruta de facturas. 
    //Esto elimina la caché y desencadena una nueva solicitud al servidor
     }catch(error){
        console.error("Database error: ", error); 
        throw new Error('Error Creating Invoice');
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData){
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'), 
        amount: formData.get('amount'), 
        status: formData.get('status'),
    });

    const amountInCents = amount * 100; 

    try{
        await sql.query(`
            UPDATE invoices
            SET    
                customer_id = $1, 
                amount = $2, 
                status = $3
            WHERE id = $4`, 
            [customerId, amountInCents, status, id]);
    }catch(error){
        console.error('Database Error: ', error);
        throw new Error('Failed to Update Invoice.');
    }  
    revalidatePath('/dashboard/invoices'); 
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string){
    try{
        await sql.query(`DELETE FROM invoices WHERE id = $1`,[id]);
    }catch(error){
        console.error('Database Error: ', error);
        throw new Error('Failed to Delete Invoice.')
    }
    revalidatePath('/dashboard/invoices'); 
}