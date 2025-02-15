'use client'

import { useEffect } from "react";
import { ChangeEvent, FormEvent, useState } from "react";

// Components
import Input from "@/src/components/form/Input";
import InputButton from "@/src/components/form/InputButton";
import Select from "@/src/components/form/Select";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useProductActions from "@/src/hooks/useProductActions";

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Interfaces
import { ProductInterface } from "@/src/interfaces/others/ProductInterface";
import { ProvisionerInterface } from "@/src/interfaces/others/ProvisionerInterface";

export default function EditProduct({ params }: { params: { id: any }}) {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [product,setProduct] = useState<ProductInterface | any>({})
  const [types,setTypes] = useState<any[]>([])
  const [families,setFamilies] = useState<any[]>([])
  const [provisioners,setProvisioners] = useState<ProvisionerInterface[] | any>([])
  const 
    { 
      getProduct, 
      editProduct, 
      getProductsTypes, 
      getProductsFamilies,
      getProductsProvisioners,
    } = useProductActions()

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await editProduct(product, params.id, token, setIsProgressing)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProduct({...product,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getProduct(setProduct, params.id, token) 
      await getProductsTypes(setTypes, token) 
      await getProductsFamilies(setFamilies, token) 
      await getProductsProvisioners(setProvisioners, token) 
      setIsLoading(false)
    }

    fetchData()
  },[])
    
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
              <section className="col-md-10 m-auto mb-4">
                <div className="lead text-primary mb-5 center">
                  <span className="display-5 font-weight-bold">Editar produto</span>
                </div>
                <form onSubmit={handleSubmit} className="p-5 profile">
                  <div className="lead text-dark mb-2 center">
                    <p>Edite os dados do produto abaixo</p>
                  </div>
                  <div className="row">
                    <div className="d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Nome</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product.name}
                        event={handleChange}
                      />
                    </div>
                    <div className="d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Descrição</label>
                      <Input
                        type="text"
                        name="tb_subProduct.description"
                        placeholder="Descrição"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product["tb_subProduct.description"] || ''}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Preço de compra</label>
                      <Input
                        type="number"
                        name="purchase_price"
                        placeholder="Preço de compra"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product.purchase_price}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Preço de venda</label>
                      <Input
                        type="number"
                        name="price"
                        placeholder="Preço de venda"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product.price}
                        event={handleChange}
                      />
                    </div>
                    <div className="d-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Fornecedor</label>
                      <Select
                        name="fk_provisioner"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        options={provisioners}
                        fk={product.fk_provisioner}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Tipo</label>
                      <Select
                        name="fk_type"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        options={types}
                        fk={product.fk_type}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Família</label>
                      <Select
                        name="fk_family"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        options={families}
                        fk={product.fk_family}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Data De Fabricação</label>
                      <Input
                        type="date"
                        name="manufacturing_date"
                        placeholder="Data de fabricação"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product.manufacturing_date}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Data De Expiração</label>
                      <Input
                        type="date"
                        name="expiry_date"
                        placeholder="Data de expiração"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product.expiry_date}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Quantidade</label>
                      <Input
                        type="number"
                        name="tb_stock.quantity"
                        placeholder="Quantidade do produto"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product["tb_stock.quantity"]}
                        event={handleChange}
                      />
                    </div>
                    <div className="col-md-6 d-inline-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Unidade</label>
                      <Input
                        type="number"
                        name="tb_stock.unity"
                        placeholder="Unidade em caixa/embalagem"
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        value={product["tb_stock.unity"]}
                        event={handleChange}
                      />
                    </div>
                    <div className="mt-2">
                      <InputButton
                        type="submit"
                        name="edit_product"            
                        className="btn btn-primary form-control mt-3 font-weight-bold p-3"
                        value="Editar"
                      />
                    </div>
                  </div>
                </form>    
              </section>  
            </div>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}