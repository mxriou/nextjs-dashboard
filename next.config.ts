import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /*Con esta opción se mejora la producción de Next.js ya que renderizará 
  las partes estáticas de la ruta y aplazará las partes dinámicas hasta que 
  el usuario las solicite. */
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
