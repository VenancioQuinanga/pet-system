'use client'

import { ChangeEvent, FormEvent, useState } from "react";

// Components
import ProductForm from "@/src/components/form/ProductForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useProductActions from "@/src/hooks/useProductActions";
import { ProductInterface } from "@/src/interfaces/others/ProductInterface";

export default function AddProduct() {
  const [product,setProduct] = useState<ProductInterface>({})
  const 
  { 
    addProduct, 
    getProductsFamilies, 
    getProductsTypes, 
    getProductsProvisioners
  } = useProductActions()
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addProduct(product, token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProduct({...product, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <ProductForm
                onHandleChange={handleChange}
                onHandleSubmit={handleSubmit} 
                getFamilies={getProductsFamilies}        
                getTypes={getProductsTypes}
                getProvisioners={getProductsProvisioners}
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
