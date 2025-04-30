'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import DebitInvoiceForm from "@/src/components/form/DebitInvoiceForm";
import ProductsToSaleTable from "@/src/components/layout/Tables/ProductsToSaleTable";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useProductActions from "@/src/hooks/useProductActions";
import useSalesActions from "@/src/hooks/useSalesActions";
import useDebitActions from "@/src/hooks/useDebitActions";
import useClientActions from "@/src/hooks/useClientActions";
import useEconomicYearActions from "@/src/hooks/useEconomicYearActions";

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Intefaces
import { ProductInterface } from "@/src/interfaces/others/ProductInterface";
import { SaleInterface } from "@/src/interfaces/others/SaleInterface";
import { ClientInterface } from "@/src/interfaces/others/ClientInterface";

export default function DebitPage() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [sale, setSale] = useState<SaleInterface>({})
  const [sales, setSales] = useState<SaleInterface[]>([])
  const [paymentTypes,setPaymentTypes] = useState<any[]>([])
  const [years, setYears] = useState<any[]>([])
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [getedProducts, setGetedProducts] = useState<ProductInterface[]>([])
  const [clients, setClients] = useState<ClientInterface[]>([])
  const {getEconomicsYears} = useEconomicYearActions()
  const {getProducts} = useProductActions()
  const {getClients} = useClientActions()
  const {
    getPaymentTypes,
    calcPayment,
    addToCart, 
    removeToCart, 
    cancelSale
  } = useSalesActions()
  const {
    getSales,
    doSale
  } = useDebitActions()
  const [product, setProduct] = useState<ProductInterface>({})
    
  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    let token = localStorage.getItem('token')
    setIsProgressing(true)
    await doSale(setSale, sale, setProducts, products, user, token, setIsProgressing)
  }

  const onCancelSale = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await cancelSale(setProducts, sale)
  }

  const addProduct = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    await addToCart(sale, setProducts, products, product, token)
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
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      const savedProducts: any = localStorage.getItem('products')
      
      await checkUserByToken(setUser, token as string) 
      await calcPayment(sale)
      await getEconomicsYears(setYears, token as string)
      await getSales(setSales, token as string)
      await getProducts(setGetedProducts, token as string)
      await getClients(setClients, token as string)
      await getPaymentTypes(setPaymentTypes, token as string)
      if(savedProducts) setProducts(JSON.parse(savedProducts))
      setIsLoading(false)
    }

    fetchData()
  }, [])

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
                  <div className="mb-1">
                    <DebitInvoiceForm
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
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
