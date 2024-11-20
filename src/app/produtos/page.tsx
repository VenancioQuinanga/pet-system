"use client"

// Components
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from "next/link";
import InputButton from "@/src/components/form/InputButton";
import ProductTable from "@/src/components/layout/Tables/ProductTable";
import InvoiceForm from "@/src/components/form/InvoiceForm";
import Authentication from '@/src/utils/Authentication';

// Hooks
import useProductActions from "@/src/hooks/useProductActions";
import useInvoicesActions from "@/src/hooks/useInvoicesActions";

export default function Products() {
  const { getProducts } = useProductActions()
  const {addProformInvoice} = useInvoicesActions()
  const [size, setSize] = useState<string>('A4');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let token = localStorage.getItem('token')
    let date = new Date();
    let code = `FP/${date.getFullYear()}/${date.getTime()}`

    const data = {
      code: code,
      size: size
    }

    addProformInvoice(data, token)
  }

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  return (
    <main className="mt-3">
      <Authentication>
        <Link href='/produtos/add'>
          <InputButton
            name='add_product_button'
            className='btn btn-dark p-3'
            value='Cadastrar produto'
          />
        </Link>
        <ProductTable
          getProducts={getProducts}
        />
        <div className="col-md-12 mt-3 m-auto">
          <div className="mb-1">
            <InvoiceForm
              onHandleSizeChange={handleSizeChange}
              onHandleSubmit={handleSubmit}
              paperSize={size}
            />
          </div>
        </div>
      </Authentication>
   </main>
  );
}
