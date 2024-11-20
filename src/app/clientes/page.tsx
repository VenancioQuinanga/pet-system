"use client"

import Link from "next/link";
// Hooks
import useClientActions from "@/src/hooks/useClientActions";

// Components
import InputButton from "@/src/components/form/InputButton";
import ClientTable from "@/src/components/layout/Tables/ClientTable";
import Authentication from '@/src/utils/Authentication';

export default function Users() {
  const { getClients } = useClientActions()

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/clientes/add'>
          <InputButton
            name='add_clent_button'
            className='btn btn-dark p-3'
            value='Cadastrar cliente'
          />
        </Link>
        <ClientTable 
          getClients={getClients}
        />
      </Authentication>
   </main>
  );
}
