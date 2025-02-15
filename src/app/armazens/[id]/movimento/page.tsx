'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import MovimentForm from "@/src/components/form/MovimentForm";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useMovimentsActions from "@/src/hooks/useMovimentsActions";
import useProductActions from "@/src/hooks/useProductActions";
import useWarehouseActions from "@/src/hooks/useWarehouseActions";
import useAuth from '@/src/hooks/useAuth';

// Interfaces
import { MovimentInterface } from "@/src/interfaces/others/MovimentInterface";
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function DoMoviment({params}: {params: {id: any}}) {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<any>([])
  const { checkUserByToken } = useAuth()
  const [moviment,setMoviment] = useState<MovimentInterface>({})
  const [warehouse,setWarehouse] = useState<WarehouseInterface>({})
  const { getProducts } = useProductActions()
  const { addMoviment } = useMovimentsActions()
  const { getWarehouse } = useWarehouseActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getWarehouse(setWarehouse, params.id, token as string) 
      await getProducts(setProducts, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])
    
  const onHandleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    await addMoviment(moviment, warehouse, params.id, token, setIsProgressing)
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setMoviment({...moviment, [e.target.name]: e.target.value})
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
                <div className="col-md-10 mb-5 m-auto">
                  <MovimentForm
                    onHandleChange={onHandleChange}
                    onHandleSubmit={onHandleSubmit} 
                    products={products}
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
