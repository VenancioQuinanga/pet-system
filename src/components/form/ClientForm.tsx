'use client'

// Components
import InputButton from "./InputButton";
import Select from "./Select";

// Interfaces
import { ClientFormInterface } from "@/src/interfaces/Layout/ClientFormInterface";

export default function ClientForm(props: ClientFormInterface) {
  
  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-5 center">
        <span className="display-5 font-weight-bold">Novo cliente</span>
      </div>
      <form onSubmit={props.onHandleSubmit} className="p-5 profile">
        <div className="lead text-dark mb-2 center">
          <p>Preencha os dados do formulário abaixo</p>
        </div>
        <div className="row">
          <div className="d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
            />
          </div>
          <div className="d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-2 text-dark bg-ccc form-control p-3"              
              onInput={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Telefone</label>
            <input
              type="number"
              name="tb_telephone.telephone"
              placeholder="Seu telefone"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
            />
          </div>                
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Bairro</label>
            <input
              type="text"
              name="tb_address.neighborhood"
              placeholder="Bairro"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Rua</label>
            <input
              type="text"
              name="tb_address.street"
              placeholder="Rua"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Casa</label>
            <input
              type="text"
              name="tb_address.house"
              placeholder="Casa"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="mt-2 text-dark font-weight-bold">Gênero</label>
            <Select
              name="fk_gender"
              className="mt-2 text-dark bg-ccc form-control p-3"
              defaultOption="Selecione o gênero"
              options={props.genders}
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="mt-2 text-dark font-weight-bold">NIF</label>
            <input
              type="text"
              name="nif"
              placeholder="N° De Identificação Fiscal"
              className="mt-2 text-dark bg-ccc form-control p-3"
              onInput={props.onHandleChange}
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

