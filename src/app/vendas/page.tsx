"use client"

import Link from 'next/link';
// Components
import InputButton from '@/src/components/form/InputButton';
import SalesTable from '@/src/components/layout/Tables/SalesTable';
import Authentication from '@/src/utils/Authentication';

// Hooks
import useSalesActions from "@/src/hooks/useSalesActions";

export default function Sales() {
  const { getSales } = useSalesActions()

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/vendas/add'>
          <InputButton
            name='do_sale_button'
            className='btn btn-dark p-3'
            value='Realizar venda'
          />
        </Link>
        <SalesTable
          getSales={getSales}
        />
      </Authentication>
   </main>
  );
}
