'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

// components
import InputButton from "@/src/components/form/InputButton";
import ProvisionerTable from "@/src/components/layout/Tables/ProvisionerTable";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useProvisionerActions from "@/src/hooks/useProvisionerActions";

export default function Provisioners() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getProvisioners } = useProvisionerActions()
  const [provisioners, setProvisioners] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getProvisioners(setProvisioners, token as string)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <main className="main mt-3">
              <Link href='/fornecedores/add'>
                <InputButton
                  name='add_provisioner_button'
                  className='btn btn-dark p-3'
                  value='Cadastrar fornecedor'
                />
              </Link>
              <ProvisionerTable
                provisioners={provisioners}
              />
            </main>
          </AdminProtected>   
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
