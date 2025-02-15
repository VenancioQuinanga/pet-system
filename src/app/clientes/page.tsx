"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

// Hooks
import useClientActions from "@/src/hooks/useClientActions";
import useAuth from '@/src/hooks/useAuth';

// Components
import InputButton from "@/src/components/form/InputButton";
import ClientTable from "@/src/components/layout/Tables/ClientTable";
import Loader from "@/src/components/layout/loader/Loader";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from '@/src/utils/auth/Authentication';

export default function Users() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [clients, setClients] = useState<any>([])
  const { checkUserByToken } = useAuth()
  const { getClients } = useClientActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getClients(setClients, token as string)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <main className="main mt-3">
            <Authentication>
              <Link href='/clientes/add'>
                <InputButton
                  name='add_clent_button'
                  className='btn btn-dark p-3'
                  value='Cadastrar cliente'
                />
              </Link>
              <ClientTable 
                clients={clients}
              />
            </Authentication>
          </main>  
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
