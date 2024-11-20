'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import Authentication from "@/src/utils/Authentication";
import SalesForm from "@/src/components/form/SalesForm";
import ProductsToSaleTable from "@/src/components/layout/Tables/ProductsToSaleTable";

// Hooks
import useGlobalsActions from "@/src/hooks/useGlobalsActions";
import useProductActions from "@/src/hooks/useProductActions";
import useSalesActions from "@/src/hooks/useSalesActions";
import useClientActions from "@/src/hooks/useClientActions";
import useEconomicYearActions from "@/src/hooks/useEconomicYearActions";

// Intefaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";
import { ProductInterface } from "@/src/interfaces/others/ProductInterface";
import { SaleInterface } from "@/src/interfaces/others/SaleInterface";
import { ClientInterface } from "@/src/interfaces/others/ClientInterface";

export default function MakeSale() {
  const [user,setUser] = useState<UserInterface>({})
  const [sale,setSale] = useState<SaleInterface>({})
  const [sales,setSales] = useState<SaleInterface[]>([])
  const [paymentTypes,setPaymentTypes] = useState<any[]>([])
  const [years,setYears] = useState<any[]>([])
  const [products,setProducts] = useState<ProductInterface[]>([])
  const [getedProducts,setGetedProducts] = useState<ProductInterface[]>([])
  const [clients,setClients] = useState<ClientInterface[]>([])
  const {getEconomicsYears} = useEconomicYearActions()
  const {getProducts} = useProductActions()
  const {getClients} = useClientActions()
  const { getUserByToken } = useGlobalsActions()
  const {
    getSales,
    getPaymentTypes,
    calcPayment,
    addToCart, 
    removeToCart, 
    cancelSale, 
    doSale
  } = useSalesActions()
  const [product,setProduct] = useState<ProductInterface>({})
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let token = localStorage.getItem('token')
    doSale(setSale, sale, setProducts, products, user, sales, years, token)
  }

  const onCancelSale = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    cancelSale(setProducts, sale)
  }

  const addProduct = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addToCart(sale, setProducts, products, product, token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setSale((prevSale) => {
      const updatedSale = { ...prevSale, [name]: value };
      
      if (name === 'payment') {
        const payment = Number(value); // valor atualizado do pagamento
        const totalToPay = Number(updatedSale.tot_to_pay) || 0; // valor total a pagar
        let change = payment - totalToPay; // calcula o troco
        
        if (change < 0) change = 0;
        
        updatedSale.change = change; // atualiza o valor de troco
      }
      
      return updatedSale;
    });
  };
  
  const ChangeProducts = (e: ChangeEvent<HTMLInputElement>)=>{
    setProduct({...product, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token: any = localStorage.getItem('token')
    const savedProducts: any = localStorage.getItem('products')
    getUserByToken(setUser, token)
    calcPayment(sale)
    getEconomicsYears(setYears, token)
    getSales(setSales, token)
    getProducts(setGetedProducts, token)
    getClients(setClients, token)
    getPaymentTypes(setPaymentTypes, token)
    if(savedProducts) setProducts(JSON.parse(savedProducts))
  },[])

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <div className="mb-1">
                <SalesForm
                  onHandleChange={handleChange}
                  onChangeProducts={ChangeProducts}
                  onHandleSubmit={handleSubmit}
                  onCancelSale={onCancelSale}
                  onAddProduct={addProduct}
                  paymentTypes={paymentTypes}
                  getedProducts={getedProducts}
                  getedClients={clients}
                  sale={sale}
                />
              </div>
              <div className="mt-5">
                <ProductsToSaleTable
                  sale={sale}
                  products={products}
                  setProducts={setProducts}
                  removeItem={removeToCart}
                />
              </div>
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
