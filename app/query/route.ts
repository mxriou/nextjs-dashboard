import { db } from "@vercel/postgres";
import {  NextResponse } from 'next/server';


export async function GET(){
  try{
    const client = await db.connect();
    
    const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
    `;

    return NextResponse.json({ data: data.rows });
  }catch(error){
    return NextResponse.json({error: 'Error al obtener los datos'}, { status: 500}); 
  }
}