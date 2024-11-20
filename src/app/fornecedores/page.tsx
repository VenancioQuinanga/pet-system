'use client'

import Link from "next/link";

// components
import InputButton from "@/src/components/form/InputButton";
import ProvisionerTable from "@/src/components/layout/Tables/ProvisionerTable";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useProvisionerActions from "@/src/hooks/useProvisionerActions";

export default function Provisioners() {
  const { getProvisioners } = useProvisionerActions()

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/fornecedores/add'>
          <InputButton
            name='add_provisioner_button'
            className='btn btn-dark p-3'
            value='Cadastrar fornecedor'
          />
        </Link>
        <ProvisionerTable
          getProvisioners={getProvisioners}
        />
      </Authentication>
   </main>
  );
}

