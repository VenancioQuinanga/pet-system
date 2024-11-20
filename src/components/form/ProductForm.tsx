'use client'

// Components
import { useEffect, useState } from "react";
import Input from "./Input";
import InputButton from "./InputButton";
import Select from "./Select";

// Interfaces
import { ProductFormInterface } from "@/src/interfaces/Layout/ProductFormInterface";

export default function ProductForm(props: ProductFormInterface) {

  const [families,setFamilies] = useState([])
  const [types,setTypes] = useState([])
  const [provisioners,setProvisioners] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    props.getFamilies(setFamilies, token)
    props.getTypes(setTypes, token)
    props.getProvisioners(setProvisioners, token)
  },[])

  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-5 center">
        <span className="display-5 font-weight-bold">Novo produto</span>
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
            <label className="mt-2 text-dark font-weight-bold">Descrição</label>
            <Input
              type="text"
              name="tb_subProduct.description"
              placeholder="Descrição do produto"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Preço de compra</label>
            <Input
              type="number"
              name="purchase_price"
              placeholder="Preço de compra"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Preço de venda</label>
            <Input
              type="number"
              name="price"
              placeholder="Preço de venda"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Fornecedor</label>
            <Select
              name="fk_provisioner"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
              defaultOption="Selecione o fornecedor"
              options={provisioners}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Tipo</label>
            <Select
              name="fk_type"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
              defaultOption="Selecione o tipo"
              options={types}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Família</label>
            <Select
              name="fk_family"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
              defaultOption="Selecione a família"
              options={families}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Data De Fabricação</label>
            <Input
              type="date"
              name="manufacturing_date"
              placeholder="Data de fabricação"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Data De Expiração</label>
            <Input
              type="date"
              name="expiry_date"
              placeholder="Data de expiração"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Quantidade</label>
            <Input
              type="number"
              name="tb_stock.quantity"
              placeholder="Quantidade do produto"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="col-md-6 d-inline-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Unidade</label>
            <Input
              type="number"
              name="tb_stock.unity"
              placeholder="Unidade em caixa/embalagem"
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

