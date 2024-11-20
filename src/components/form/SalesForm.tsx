'use client'

// Components
import { useEffect, useState } from "react";
import Input from "./Input";
import InputButton from "./InputButton";
import Select from "./Select";

// Interfaces
import { SalesFormInterface } from "@/src/interfaces/Layout/SalesFormInterface";

export default function SalesForm(props: SalesFormInterface) {
  
  return (
    <>
      <section className="col-md-12 m-auto mb-4">
        <div className="lead text-primary mb-5 center">
          <span className="display-5 font-weight-bold">Realizar Venda</span>
        </div>
        <form className="p-5 profile">
          <div className="lead text-dark mb-2 center">
            <p>Preencha os dados do formulário abaixo</p>
          </div>
          <div className="row">
            <div className="d-block mb-3">
              <label className="mt-2 text-dark font-weight-bold">Cliente</label>
              <Select
                name="fk_client"
                className="mt-2 text-dark bg-ccc form-control p-3"      
                defaultOption="Nome do cliente"        
                options={props.getedClients}
                event={props.onHandleChange}
              />
            </div>
            <div className="col-md-8 d-inline-block mb-2">
              <label className="mt-1 text-dark font-weight-bold">Produto</label>
              <Select
                name="id"
                className="mt-2 text-dark bg-ccc form-control p-3"      
                defaultOption="Produto a comprar"        
                options={props.getedProducts}
                event={props.onChangeProducts}
              />
            </div>
            <div className="col-md-4 d-inline-block mb-2">
              <label className="mt-1 text-dark font-weight-bold">Quantidade</label>
              <Input
                type="number"
                name="quantity"
                placeholder="Quantidade"
                className="mt-2 text-dark bg-ccc form-control p-3"              
                event={props.onChangeProducts}
              />
            </div>
            <div className="mt-2">            
              <InputButton
                name="addProduct"            
                className="btn btn-primary form-control mt-2 font-weight-bold p-3"
                value="Adicionar produto"
                icone={'bi bi-plus-circle me-1'}
                event={props.onAddProduct}
              />
            </div>
            <div className="mt-3">
              <div className="d-block mb-2">
                <label className="mt-1 text-dark font-weight-bold">Valor Pago</label>
                <Input
                  type="number"
                  name="payment"
                  placeholder="Valor pago"
                  className="mt-2 text-dark bg-ccc form-control p-3"       
                  value={props.sale.payment || 0}       
                  event={props.onHandleChange}
                />
              </div>
              <div className="d-block mb-2">
                <label className="mt-1 text-dark font-weight-bold">Metódo De Pagamento</label>
                <Select
                  name="fk_payment_type"
                  className="mt-2 text-dark bg-ccc form-control p-3"      
                  defaultOption="Metódo de pagamento"        
                  options={props.paymentTypes}
                  event={props.onHandleChange}
                />
              </div>
            </div>
          </div>
        </form>    
      </section>
      <section className="d-flex">
      <div className="col-md-6 mt-3 bg-primary p-2 pt-4 pb-2">
        <span className="text-light d-block">Total a pagar : {`${props.sale.tot_to_pay || 0}.00kz`}</span>
        <span className="text-light d-block mt-2">Valor pago : {`${props.sale.payment || 0}.00kz`}</span>
        <span className="text-light d-block mt-2">Troco : {`${props.sale.change || 0}.00kz`}</span>
      </div>
      <div className="col-md-7 ms-3 mt-2">
        <div className="col-md-10 d-block mt-1">
          <InputButton
            name="finishSale"            
            className="btn btn-success form-control mt-1 font-weight-bold p-3"
            value="Finalizar"
            icone={'bi bi-check-circle me-1'}
            event={props.onHandleSubmit}
          />
        </div>
        <div className="col-md-10 d-block mt-1">            
          <InputButton
            name="cancelSale"            
            className="btn btn-danger form-control mt-1 font-weight-bold p-3"
            value="Cancelar"
            icone={'bi bi-x-circle me-1'}
            event={props.onCancelSale}
          />
        </div>
      </div>
    </section>
  </>
  );
}

