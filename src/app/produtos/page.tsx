"use client"

// Components
import { useState, useEffect } from 'react';
import Link from "next/link";
import InputButton from "@/src/components/form/InputButton";
import ProductTable from "@/src/components/layout/Tables/ProductTable";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Utils
import Authentication from '@/src/utils/auth/Authentication';

// Hooks
import useProductActions from "@/src/hooks/useProductActions";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true)
  const { getProducts } = useProductActions()
  const [products, setProducts] = useState<any>([])
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await getProducts(setProducts, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

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
          </main> 
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
