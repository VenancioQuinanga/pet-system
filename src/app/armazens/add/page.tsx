'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import WarehouseForm from "@/src/components/form/WarehouseForm";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";
import useAuth from '@/src/hooks/useAuth';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Interfaces
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function AddWarehouse() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [warehouse, setWarehouse] = useState<WarehouseInterface>({})
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { addWarehouse } = useWarehouseActions()
    
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const onHandleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await addWarehouse(warehouse, token, setIsProgressing)
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setWarehouse({...warehouse, [e.target.name]: e.target.value})
  }
  
  return (
    <>
      <Authentication>
        <Navbar />
        {isProgressing && (
          <Progress />
        )}
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <div className="main mt-5">
              <div className="row">
                <div className="col-md-10 mb-2 m-auto">
                  <WarehouseForm
                    onHandleChange={onHandleChange}
                    onHandleSubmit={onHandleSubmit} 
                  />
                </div>  
              </div>
            </div>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
