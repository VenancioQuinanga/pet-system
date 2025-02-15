"use client"

// Components
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from "next/link";
import InputButton from "@/src/components/form/InputButton";
import ProductTable from "@/src/components/layout/Tables/ProductTable";
import InvoiceForm from "@/src/components/form/InvoiceForm";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Utils
import Authentication from '@/src/utils/auth/Authentication';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useProductActions from "@/src/hooks/useProductActions";
import useInvoicesActions from "@/src/hooks/useInvoicesActions";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getProducts } = useProductActions()
  const {addProformInvoice} = useInvoicesActions()
  const [products, setProducts] = useState<any>([])
  const [size, setSize] = useState<string>('A4');
  
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getProducts(setProducts, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let token = localStorage.getItem('token')
    let date = new Date();
    let code = `FP/${date.getFullYear()}/${date.getTime()}`

    const data = {
      code: code,
      size: size
    }

    await addProformInvoice(data, token)
  }

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <main className="main mt-3">
            <Link href='/produtos/add'>
              <InputButton
                name='add_product_button'
                className='btn btn-dark p-3'
                value='Cadastrar produto'
              />
            </Link>
            <ProductTable
              products={products}
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
          </main> 
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
