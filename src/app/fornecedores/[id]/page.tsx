'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useProvisionerActions from "@/src/hooks/useProvisionerActions";

// Interfaces
import { ProvisionerInterface } from "@/src/interfaces/others/ProvisionerInterface";

export default function EditProvisioner({params}: {params: {id: any}}) {  
  const [provisioner,setProvisioner] = useState<ProvisionerInterface | any>({})
  const { getProvisioner, editProvisioner, getTelephones} = useProvisionerActions()

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    editProvisioner(provisioner, params.id, token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProvisioner({...provisioner, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getProvisioner(setProvisioner, params.id, token)     
  },[])
    
  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <section className="col-md-10 m-auto mb-4">
            <div className="lead text-primary mb-5 center">
              <span className="display-5 font-weight-bold">Editar fornecedor</span>
            </div>
            <form onSubmit={handleSubmit} className="p-5 profile">
              <div className="lead text-dark mb-2 center">
                <p>Edite os dados do fornecedor abaixo</p>
              </div>
              <div className="row">
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Nome</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={provisioner.name}
                    event={handleChange}
                  />
                </div>
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={provisioner.email}
                    event={handleChange}
                  />
                </div>
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Telefone</label>
                  <Input
                    type="number"
                    name="tb_telephone.telephone"
                    placeholder="Seu telefone"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={provisioner['tb_telephone.telephone']}
                    event={handleChange}
                  />
                </div>
                <div className="mt-2">
                  <InputButton
                    type="submit"
                    name="edit_user"            
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