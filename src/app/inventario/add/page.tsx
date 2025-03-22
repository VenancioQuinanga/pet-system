'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Select from "@/src/components/form/Select";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import ProductsToInventoryTable from "@/src/components/layout/Tables/ProductsToInventoryTable";

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useProductActions from "@/src/hooks/useProductActions";
import useAuth from '@/src/hooks/useAuth';
import useInventoryActions from "@/src/hooks/useInventoryActions";

export default function InventoryAdd() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [data, setData] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [productsData, setProductsData] = useState<any>({})
  const [products, setProducts] = useState<any>([])
  const [product, setProduct] = useState<any>({})
  const { getProducts } = useProductActions()
  const { generateInventory, addToCart, removeToCart } = useInventoryActions()

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      const savedProducts: any = localStorage.getItem('inventoryData')
      if(savedProducts) await setProducts(JSON.parse(savedProducts))
      await checkUserByToken(setUser, token as string) 
      await getProducts(setProductsData, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const onHandleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await generateInventory(setProducts, products, token, setIsProgressing)
    console.log('doing', products)
  }

  const ChangeProducts = (e: ChangeEvent<HTMLInputElement>)=>{
    setProduct({...product, [e.target.name]: e.target.value})
  }

  const addProduct = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    await addToCart(setProducts, products, product, token)
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
                <section className="col-md-10 m-auto mb-4">
                  <div className="lead text-primary mb-5 center">
                    <span className="display-5 font-weight-bold">Recolha do inventário</span>
                  </div>
                  <form className="p-5 profile">
                    <div className="lead text-dark mb-2 center">
                      <p>Edite os dados abaixo</p>
                    </div>
                    <div className="row">
                      <div className="d-block mb-3">
                        <label className="mt-2 text-dark font-weight-bold">Produto</label>
                        <Select
                          name="fk_product"
                          className="mt-2 text-dark bg-ccc form-control p-3"      
                          defaultOption="Selecione o produto"        
                          options={productsData}
                          event={ChangeProducts}
                        />
                      </div>
                      <div className="d-block mb-3">
                        <label className="mt-2 text-dark font-weight-bold">Quantidade</label>
                        <Input
                          type="number"
                          name="quantity"
                          placeholder="Quantidade em armazem"
                          className="mt-2 text-dark bg-ccc form-control p-3"
                          event={ChangeProducts}
                        />
                      </div>
                      <div className="d-block mb-2">
                        <InputButton
                          name="save"            
                          className="btn btn-dark form-control mt-3 font-weight-bold p-3"
                          value="Salvar"
                          event={addProduct}
                        />
                      </div>
                      <div className="d-block">
                        <InputButton
                          name="acert_button"            
                          className="btn btn-primary form-control mt-3 font-weight-bold p-3"
                          value="Acerto automático"
                          event={onHandleSubmit}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="mt-5">
                    <ProductsToInventoryTable
                      products={products}
                      setProducts={setProducts}
                      removeItem={removeToCart}
                    />
                  </div>
                </section>  
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
