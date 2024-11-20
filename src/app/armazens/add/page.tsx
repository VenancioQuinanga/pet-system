'use client'

import { ChangeEvent, FormEvent, useState } from "react";

// Components
import WarehouseForm from "@/src/components/form/WarehouseForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";

// Interfaces
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function AddWarehouse() {
  const [warehouse,setWarehouse] = useState<WarehouseInterface>({})
  const { addWarehouse, editWarehouse } = useWarehouseActions()
    
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addWarehouse(warehouse, token)
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setWarehouse({...warehouse, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <WarehouseForm
                onHandleChange={onHandleChange}
                onHandleSubmit={onHandleSubmit} 
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
