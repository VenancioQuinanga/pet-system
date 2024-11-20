'use client'

// Components
import { useEffect, useState } from "react";
import Input from "./Input";
import InputButton from "./InputButton";
import Select from "./Select";

type MovimentFormProps = {
  onHandleChange: Function,
  onHandleSubmit: any,
  getProducts: Function
}

export default function MovimentForm(props: MovimentFormProps) {
  const [products,setProducts] = useState<any>({})
  let prods = [{name: 'Prod1'},{name:'Prod2'}]
  
  useEffect(()=>{
    let token = localStorage.getItem('token')
    props.getProducts(setProducts,token)
  },[])
  
  return (
    <>
      <section className="col-md-12 m-auto mb-4">
        <div className="lead text-primary mb-5 center">
          <span className="display-5 font-weight-bold">Realizar movimento</span>
        </div>
        <form onSubmit={props.onHandleSubmit} className="p-5 profile">
          <div className="lead text-dark mb-2 center">
            <p>Preencha os dados do formulário abaixo</p>
          </div>
          <div className="row">
            <div className="d-block mb-2">
              <label className="mt-1 text-dark font-weight-bold">Produto</label>
              <Select
                name="fk_product"
                className="mt-2 text-dark bg-ccc form-control p-3"      
                defaultOption="Produto a movimentar"        
                options={products || prods}
                event={props.onHandleChange}
              />
            </div>
            <div className="d-block mb-2">
              <label className="mt-1 text-dark font-weight-bold">Quantidade</label>
              <Input
                type="number"
                name="quantity"
                placeholder="Quantidade"
                className="mt-2 text-dark bg-ccc form-control p-3"              
                event={props.onHandleChange}
              />
            </div>
            <div className="mt-2">            
              <InputButton
                type="submit"
                name="do_moviment"            
                className="btn btn-primary form-control mt-2 font-weight-bold p-3"
                value="Realizar movimento"
              />
            </div>
          </div>
        </form>
    </section>
  </>
  );
}

