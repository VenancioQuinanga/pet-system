"use client"

import Link from 'next/link';
import { useState, useEffect } from "react";

// Components
import InputButton from '@/src/components/form/InputButton';
import SalesTable from '@/src/components/layout/Tables/SalesTable';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useSalesActions from "@/src/hooks/useSalesActions";

export default function Sales() {const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [sales, setSales] = useState([])
  const { getSales } = useSalesActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getSales(setSales, token)
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
              <Authentication>
                <Link href='/vendas/add'>
                  <InputButton
                    name='do_sale_button'
                    className='btn btn-dark p-3'
                    value='Realizar venda'
                  />
                </Link>
                <SalesTable
                  sales={sales}
                />
              </Authentication>
            </main>
          </AdminProtected>   
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
