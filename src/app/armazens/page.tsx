"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

// Components
import Navbar from '@/src/components/layout/Navbar/Navbar';
import InputButton from "@/src/components/form/InputButton";
import WarehousesTable from "@/src/components/layout/Tables/WarehousesTable";
import Loader from "@/src/components/layout/loader/Loader";

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";
import useAuth from '@/src/hooks/useAuth';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function Warehouses() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [warehouses, setWarehouses] = useState([])
  const { checkUserByToken } = useAuth()
  const { getWarehouses } = useWarehouseActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getWarehouses(setWarehouses, token as string)
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
              <div className="d-flex">
                <div className="me-3">
                  <Link href='/armazens/add'>
                    <InputButton
                      name='add_warehouse_button'
                      className='btn btn-dark p-3'
                      value='Cadastrar armazem'
                    />
                  </Link>
                </div>
              </div>
              <WarehousesTable
                warehouses={warehouses}
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
