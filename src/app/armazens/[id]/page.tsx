'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useWarehouseActions from "@/src/hooks/useWarehouseActions";
import useAuth from '@/src/hooks/useAuth';

// Interfaces
import { WarehouseInterface } from "@/src/interfaces/others/WarehouseInterface";

export default function EditWarehouse({ params }: { params: { id: any } }) {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [warehouse, setWarehouse] = useState<WarehouseInterface>({})
  const { getWarehouse, editWarehouse } = useWarehouseActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getWarehouse(setWarehouse, params.id, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const onHandleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await editWarehouse(warehouse, params.id, token, setIsProgressing)
  }

  const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
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
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}