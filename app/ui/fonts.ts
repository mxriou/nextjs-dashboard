import { Inter, Poppins, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const poppins = Poppins({
  weight: '400', // O '700' para bold
  subsets: ['latin'], // Subconjunto de caracteres
  display: 'swap', // Mejora la renderización de la fuente
});

export const lusitana = Lusitana({
   subsets: ['latin'],
   weight: '400', 
   display: 'swap',
});
