'use client'

// Components
import Input from "./Input";
import InputButton from "./InputButton";

// Interfaces
import { ProvisionerFormInterface } from "@/src/interfaces/Layout/ProvisionerFormInterface";

export default function ProvisionerForm(props: ProvisionerFormInterface) {
  
  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-5 center">
        <span className="display-5 font-weight-bold">Novo fornecedor</span>
      </div>
      <form onSubmit={props.onHandleSubmit} className="p-5 profile">
        <div className="lead text-dark mb-2 center">
          <p>Preencha os dados do formulário abaixo</p>
        </div>
        <div className="row">
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Nome</label>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-2 text-dark bg-ccc form-control p-3"              
              event={props.onHandleChange}
            />
          </div>
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Telefone</label>
            <Input
              type="number"
              name="telephone"
              placeholder="Seu telefone"
              className="mt-2 text-dark bg-ccc form-control p-3"
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

