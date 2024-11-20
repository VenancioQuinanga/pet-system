'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import MovimentForm from "@/src/components/form/MovimentForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useMovimentsActions from "@/src/hooks/useMovimentsActions";
import useProductActions from "@/src/hooks/useProductActions";
import useWarehouseActions from "@/src/hooks/useWarehouseActions";

// Interfaces
import { MovimentInterface } from "@/src/interfaces/others/MovimentInterface";
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function DoMoviment({params}: {params: {id: any}}) {
  const [moviment,setMoviment] = useState<MovimentInterface>({})
  const [warehouse,setWarehouse] = useState<WarehouseInterface>({})
  const { getProducts } = useProductActions()
  const { addMoviment } = useMovimentsActions()
  const { getWarehouse } = useWarehouseActions()
    
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addMoviment(moviment, warehouse, params.id, token)
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setMoviment({...moviment, [e.target.name]: e.target.value})
  }

  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    getWarehouse(setWarehouse, params.id, token) 
  },[])

  return ( 
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <MovimentForm
                onHandleChange={onHandleChange}
                onHandleSubmit={onHandleSubmit} 
                getProducts={getProducts}
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
