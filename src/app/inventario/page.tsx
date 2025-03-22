"use client"

// Components
import { useState, useEffect } from 'react';
import Link from "next/link";
import InputButton from "@/src/components/form/InputButton";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";
import InventoryTable from '@/src/components/layout/Tables/InventoryTable';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useInventoryActions from '@/src/hooks/useInventoryActions';

export default function Inventories() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [user, setUser] = useState<any>(null)
  const { getInventories } = useInventoryActions()
  const { checkUserByToken } = useAuth()
  
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      await checkUserByToken(setUser, token as string) 
      await getInventories(setData, token, setIsLoading)
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
                <div className="">
                  <Link href='/inventario/normal'>
                    <InputButton
                      name='normal_inventory_button'
                      className='btn btn-dark p-3'
                      value='Gerar inventário'
                    />
                  </Link>
                </div>
                <div className="ms-3">
                  <Link href='/inventario/add'>
                    <InputButton
                      name='add_inventory_button'
                      className='btn btn-primary p-3'
                      value='Recolha do inventáo'
                      />
                  </Link>
                </div>
              </div>
              <div className="d-block">
                <InventoryTable
                  data={data}
                />
              </div>
            </main>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
