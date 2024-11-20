"use client"

import Link from "next/link";
// Hooks
import useUserActions from "@/src/hooks/useUserActions";

// Components
import InputButton from "@/src/components/form/InputButton";
import UserTable from "@/src/components/layout/Tables/UserTable";
import Authentication from '@/src/utils/Authentication';

export default function Users() {
  const { getUsers } = useUserActions()

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/usuarios/add'>
          <InputButton
            name='add_user_button'
            className='btn btn-dark p-3'
            value='Cadastrar usuário'
          />
        </Link>
        <UserTable 
          getUsers={getUsers}
        />
      </Authentication>
   </main>
  );
}
