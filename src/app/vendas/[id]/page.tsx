'use client'

// Components
import SalesProductsTable from '@/src/components/layout/Tables/SalesProductsTable';
import Authentication from '@/src/utils/Authentication';

// Hooks
import useSalesActions from "@/src/hooks/useSalesActions";

export default function SeeSalesProducts({params}: {params: {id: any}}) {  
  const { getSale} = useSalesActions()
    
  return (
    <>
      <Authentication>
        <SalesProductsTable
          id={params.id}
          getSale={getSale}
        />
      </Authentication>
    </>
  );
}
