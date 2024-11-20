"use client"

import Link from "next/link";

// Components
import InputButton from "@/src/components/form/InputButton";
import WarehousesTable from "@/src/components/layout/Tables/WarehousesTable";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";

export default function Warehouses() {
  const { getWarehouses } = useWarehouseActions()

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/armazens/add'>
          <InputButton
            name='add_warehouse_button'
            className='btn btn-dark p-3'
            value='Cadastrar armazem'
          />
        </Link>
        <WarehousesTable
          getWarehouses={getWarehouses}
        />
      </Authentication>
   </main>
  );
}
