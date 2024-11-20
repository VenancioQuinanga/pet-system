'use client'

// Components
import { useEffect, useState } from "react";
import Input from "./Input";
import InputButton from "./InputButton";
import Select from "./Select";

// Interfaces
import { RegisterFormInterface } from "@/src/interfaces/Layout/RegisterFormInterface";

export default function UserForm(props: RegisterFormInterface) {

  const [genders,setGenders] = useState([])
  const [categories,setCategories] = useState([])
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    props.getGenders(setGenders, token) 
    props.getCategories(setCategories, token) 
  },[])
  
  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-5 center">
        <span className="display-5 font-weight-bold">Novo usuário</span>
      </div>
      <form onSubmit={props.onHandleSubmit} className="p-5 profile">
        <div className="lead text-dark mb-2 center">
          <p>Preencha os dados do formulário abaixo</p>
        </div>
        <div className="row">
          <div className="d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Nome</label>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-2 text-dark bg-ccc form-control p-3"              
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Telefone</label>
            <Input
              type="number"
              name="tb_telephone.telephone"
              placeholder="Seu telefone"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>                
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Bairro</label>
            <Input
              type="text"
              name="tb_address.neighborhood"
              placeholder="Bairro"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Rua</label>
            <Input
              type="text"
              name="tb_address.street"
              placeholder="Rua"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Casa</label>
            <Input
              type="text"
              name="tb_address.house"
              placeholder="Casa"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Categória</label>
            <Select
              name="fk_category"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
              defaultOption="Selecione a categória"
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
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Cargo</label>
            <Input
              name="function"
              placeholder="Função do usuário"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Gênero</label>
            <Select
              name="fk_gender"
              className="mt-2 text-dark bg-ccc form-control p-3"
              defaultOption="Selecione o gênero"
              options={genders}
              event={props.onHandleChange}
            />
          </div>
          <div className="mt-2">
            <InputButton
              type="submit"
              name="register"            
              className="btn btn-primary form-control mt-3 font-weight-bold p-3"
              value="Registrar"
            />
          </div>
        </div>
      </form>    
    </section>
  );
}

