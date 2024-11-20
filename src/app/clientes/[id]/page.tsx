'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Select from "@/src/components/form/Select";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useUserActions from "@/src/hooks/useUserActions";
import useClientActions from "@/src/hooks/useClientActions";

// Interfaces
import { ClientInterface } from "@/src/interfaces/others/ClientInterface";

export default function EditClient({params}:{params:{id:any}}) {
  const [client,setClient] = useState<ClientInterface | any>({})
  const [genders,setGenders] = useState<any[]>([])  
  const {getGenders} = useUserActions()
  const {getClient, editClient} = useClientActions()

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    editClient(client, params.id, token)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setClient({...client, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getClient(setClient,params.id,token) 
    getGenders(setGenders,token); 
  },[])

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <section className="col-md-10 m-auto mb-4">
            <div className="lead text-primary mb-5 center">
              <span className="display-5 font-weight-bold">Editar usuário</span>
            </div>
            <form onSubmit={handleSubmit} className="p-5 profile">
              <div className="lead text-dark mb-2 center">
                <p>Edite os dados do cliente abaixo</p>
              </div>
              <div className="row">
                <div className="d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Nome</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client.name || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client.email || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Telefone</label>
                  <input
                    type="number"
                    name="tb_telephone.telephone"
                    placeholder="Seu telefone"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client["tb_telephone.telephone"] || ''}
                    onInput={handleChange}
                  />
                </div>                
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Bairro</label>
                  <input
                    type="text"
                    name="tb_address.neighborhood"
                    placeholder="Bairro"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client["tb_address.neighborhood"] || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Rua</label>
                  <input
                    type="text"
                    name="tb_address.street"
                    placeholder="Rua"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client["tb_address.street"] || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Casa</label>
                  <input
                    type="text"
                    name="tb_address.house"
                    placeholder="Casa"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client["tb_address.house"] || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Gênero</label>
                  <Select
                    name="fk_gender"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    event={handleChange}
                    fk={client.fk_gender}
                    options={genders}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">NIF</label>
                  <input
                    type="text"
                    name="nif"
                    placeholder="N° De Identificação Fiscal"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={client.nif || ''}
                    onInput={handleChange}
                  />
                </div>
                <div className="mt-2">
                  <InputButton
                    type="submit"
                    name="edit_client"            
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