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

// Interfaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";

export default function EditUser({params}:{params:{id:any}}) {
  const [user,setUser] = useState<UserInterface | any>({})
  const [genders,setGenders] = useState<any[]>([])
  const [categories,setCategories] = useState<any[]>([])
  const 
  {
    getCategories,
    getGenders, 
    getUser, 
    editUser,
  } = useUserActions()

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    editUser(user, params.id, token)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getUser(setUser, params.id,token) 
    getGenders(setGenders, token); 
    getCategories(setCategories, token);  
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
                <p>Edite os dados do usuário abaixo</p>
              </div>
              <div className="row">
                <div className="d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Nome</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user.name || ''}
                    event={handleChange}
                  />
                </div>
                <div className="d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user.email || ''}
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Telefone</label>
                  <Input
                    type="number"
                    name="tb_telephone.telephone"
                    placeholder="Seu telefone"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user["tb_telephone.telephone"] || ''}
                    event={handleChange}
                  />
                </div>                
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Bairro</label>
                  <Input
                    type="text"
                    name="tb_address.neighborhood"
                    placeholder="Bairro"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user["tb_address.neighborhood"] || ''}
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Rua</label>
                  <Input
                    type="text"
                    name="tb_address.street"
                    placeholder="Rua"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user["tb_address.street"] || ''}
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Casa</label>
                  <Input
                    type="text"
                    name="tb_address.house"
                    placeholder="Casa"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user["tb_address.house"] || ''}
                    event={handleChange}
                  />
                </div>
                <div className="d-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Categória</label>
                  <Select
                    name="fk_category"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    event={handleChange}
                    fk={user.fk_category}
                    options={categories}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Data De Nascimento</label>
                  <Input
                    type="date"
                    name="birth_date"
                    placeholder="Data de nascimento"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user.birth_date || ''}
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Cargo</label>
                  <Input
                    name="function"
                    placeholder="Função do usuário"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    value={user.function || ''}
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Senha</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    event={handleChange}
                  />
                </div>
                <div className="col-md-6 d-inline-block mb-3">
                  <label className="mt-2 text-dark font-weight-bold">Gênero</label>
                  <Select
                    name="fk_gender"
                    className="mt-2 text-dark bg-ccc form-control p-3"
                    event={handleChange}
                    fk={user.fk_gender}
                    options={genders}
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