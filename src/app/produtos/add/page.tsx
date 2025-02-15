'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import ProductForm from "@/src/components/form/ProductForm";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useProductActions from "@/src/hooks/useProductActions";

// Interfaces
import { ProductInterface } from "@/src/interfaces/others/ProductInterface";

export default function AddProduct() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [product, setProduct] = useState<ProductInterface>({})
  const [families, setFamilies] = useState([])
  const [types, setTypes] = useState([])
  const [provisioners, setProvisioners] = useState([])
  const 
  { 
    addProduct, 
    getProductsFamilies, 
    getProductsTypes, 
    getProductsProvisioners
  } = useProductActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string)
      await getProductsFamilies(setFamilies, token as string)
      await getProductsTypes(setTypes, token as string)
      await getProductsProvisioners(setProvisioners, token as string)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await addProduct(product, token, setIsProgressing)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProduct({...product, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Authentication>
        <Navbar />
        {isProgressing && (
          <Progress />
        )}
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <div className="main mt-5">
              <div className="row">
                <div className="col-md-10 mb-5 m-auto">
                  <ProductForm
                    onHandleChange={handleChange}
                    onHandleSubmit={handleSubmit} 
                    families={families}        
                    types={types}
                    provisioners={provisioners}
                  />
                </div>  
              </div>
            </div>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
