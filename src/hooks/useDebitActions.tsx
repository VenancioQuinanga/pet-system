"use client"

import { useRouter } from 'next/navigation'

// API
import api from '../utils/api'

// Interfaces
import { SaleInterface } from '../interfaces/others/SaleInterface'
import { ProductInterface } from '../interfaces/others/ProductInterface'
import { UserInterface } from '../interfaces/others/UserInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'
import useInvoicesActions from './useInvoicesActions'

export default function useDebitActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const {addInvoice} = useInvoicesActions()
  const { setFlashMessage } = useFlashMessage();
  const router = useRouter()

  async function getSales(setSales: Function, token: any): Promise<void> {
    try {
      const res = await api.get('/venda_debito', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSales(res.data);
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }
  
  async function getSale(setSale: Function, id: number, token: any): Promise<void> {
    try {
      const res = await api.get(`/venda_debito/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSale(res.data);
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  async function deleteSale(id: number, token: any): Promise<void> {
    try{
      api.delete(`/venda_debito/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Debito deletado com sucesso!', type: 'success'})
      })

    }catch(error: any){
      console.log("Error:",error) 
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }
    
  async function doSale(
    setSale: Function,
    sale: SaleInterface | any, 
    setProducts: Function,
    products: ProductInterface | any, 
    user: UserInterface, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {

    const data = {
      products: products,
      fk_payment_type: sale?.fk_payment_type,
      payment: sale?.payment,
      troco: sale?.change,
      fk_client: sale?.fk_client,
      fk_user: user?.id
    };
   
    if(
      sale?.payment === undefined || sale?.fk_payment_type === undefined
      || sale?.change === undefined
    ){
      setIsProgressing(false)
      setFlashMessage({
        message: 'Preencha todos os campos!',
        type: 'error',
      });

    } else if(sale?.payment < sale?.tot_to_pay){
      setIsProgressing(false)
      setFlashMessage({
        message: 'O valor pago não pode ser menor que o total á pagar!',
        type: 'error',
      });

    } else{
      try{
        api.post(`/venda_debito`, data, {
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          .then((res)=>{
            setProducts([])
            setSale({})
            localStorage.removeItem('products');
            sale.tot_to_pay = 0
            sale.payment = 0
            sale.change = 0

            let date = new Date()
            let code = `FD/${date.getFullYear()}/${res.data.sale.id}`
            let invoice = {
              fk_debit: res.data.sale.id, 
              code: code,
              client_name: sale?.client_name, 
              client_nif: sale?.client_nif
            }
            addInvoice(invoice, token)
            router.push(`/faturacao/debito/${res.data.sale.id}`)

            setIsProgressing(false)
            setFlashMessage({
              message: 'Fatura gerada com sucesso!',
              type: 'success',
            });
          })

      }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          error.response?.data?.msg ||
          'Erro ao efetuar venda!, tente novamente!')
      } 

    }
  }

  return {
    getSale,
    getSales,
    deleteSale,
    doSale
  }
}
