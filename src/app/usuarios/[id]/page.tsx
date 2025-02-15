'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Select from "@/src/components/form/Select";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useUserActions from "@/src/hooks/useUserActions";

// Interfaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";

export default function EditUser({ params }: { params: { id: any }}) {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [data, setData] = useState<UserInterface | any>({})
  const [genders, setGenders] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const 
  {
    getCategories,
    getGenders, 
    getUser, 
    editUser,
  } = useUserActions()

  const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await editUser(data, params.id, token, setIsProgressing)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string)
      await getUser(setData, params.id, token as string)
      await getGenders(setGenders, token as string);
      await getCategories(setCategories, token as string);
      setIsLoading(false)
    }

    fetchData()
  }, [])

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
                      value={data?.name || ''}
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
                      value={data?.email || ''}
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
                      value={data?.["tb_telephone.telephone"] || ''}
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
                      value={data?.["tb_address.neighborhood"] || ''}
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
                      value={data?.["tb_address.street"] || ''}
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
                      value={data?.["tb_address.house"] || ''}
                      event={handleChange}
                    />
                  </div>
                  <div className="d-block mb-3">
                    <label className="mt-2 text-dark font-weight-bold">Categória</label>
                    <Select
                      name="fk_category"
                      className="mt-2 text-dark bg-ccc form-control p-3"
                      event={handleChange}
                      fk={data?.is_admin ? 1 : 2}
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
                      value={data?.birth_date || ''}
                      event={handleChange}
                    />
                  </div>
                  <div className="col-md-6 d-inline-block mb-3">
                    <label className="mt-2 text-dark font-weight-bold">Cargo</label>
                    <Input
                      name="function"
                      placeholder="Função do usuário"
                      className="mt-2 text-dark bg-ccc form-control p-3"
                      value={data?.function || ''}
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
                      fk={data?.fk_gender}
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
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}