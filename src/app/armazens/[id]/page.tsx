'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";

// Interfaces
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function EditWarehouse({params}: {params: {id: any}}) {
  const [warehouse,setWarehouse] = useState<WarehouseInterface>({})
  const { getWarehouse, editWarehouse } = useWarehouseActions()

  const onHandleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    editWarehouse(warehouse, params.id, token)
  }

  const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setWarehouse({...warehouse, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getWarehouse(setWarehouse, params.id, token) 
  },[])
    
  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <section className="col-md-10 m-auto mb-4">
            <div className="lead text-primary mb-5 center">
              <span className="display-5 font-weight-bold">Editar armazem</span>
            </div>
            <form  onSubmit={onHandleSubmit} className="p-5 profile">
              <div className="lead text-dark mb-2 center">
                <p>Edite os dados do armazem abaixo</p>
              </div>
              <div className="row">
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Descrição</label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Descrição do armazem"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={warehouse.description || ''}
                    event={onHandleChange}
                  />
                </div>
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Quantidade</label>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantidade em armazem"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={warehouse.quantity}
                    event={onHandleChange}
                  />
                </div>
                <div className="mt-2">
                  <InputButton
                    type="submit"
                    name="edit_warehouse"            
                    className="btn btn-primary form-control mt-3 font-weight-bold p-3"
                    value="Editar"
                  />
                </div>
              </div>
            </form>    
          </section>  
        </div>
      </Authentication>
    </>
  );
}