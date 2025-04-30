'use client'

// Components
import InputButton from "./InputButton";

// Interfaces
import { InvoiceFormInterface } from "@/src/interfaces/Layout/InvoiceFormInterface";

export default function InvoiceForm(props: InvoiceFormInterface) {
  
  return (
    <>
      <section className="col-md-12 m-auto mt-5 invoice-form">
        <div className="lead text-primary mb-3 center">
          <span className="display-6 font-weight-bold">Gerar F.Proforma</span>
        </div>
        <form onSubmit={props.onHandleSubmit} className="p-5 profile">
          <div className="lead text-dark mb-2 center">
            <p>Preencha os dados do formulário abaixo</p>
          </div>
          <div className="row">
            <div className="d-block mb-3">
              <label className="mt-2 text-dark font-weight-bold">Tamanho</label>
              <select
                name="paperSize"
                value={props.paperSize}
                className="mt-2 text-dark bg-ccc form-control p-3"
                onChange={props.onHandleChange}>
                <option value="A4">Folha - A4</option>
                <option value="A6">Folha - A6</option>
              </select>
            </div>
            <div className="d-block mb-3">
              <label className="mt-2 text-dark font-weight-bold"> Nome Do Cliente(opcional)</label>
              <input
                type="text"
                name="client_name"
                className="mt-2 text-dark bg-ccc form-control p-3"
                placeholder="O nome do cliente"
                onInput={props.onHandleChange}
              />
            </div>
            <div className="d-block mb-2">
              <label className="mt-1 text-dark font-weight-bold">NIF Do Cliente(opcional)</label>
              <input
                type="text"
                name="client_nif"
                className="mt-2 text-dark bg-ccc form-control p-3"
                placeholder="O NIF do cliente"
                onInput={props.onHandleChange}
              />
            </div>
            <div className="mt-2">
              <InputButton
                type="submit"
                name="generateInvoice"            
                className="btn btn-primary form-control mt-2 font-weight-bold p-3"
                value="Gerar fatura"
              />
            </div>
          </div>
        </form>    
      </section>
    </>
  );
}
