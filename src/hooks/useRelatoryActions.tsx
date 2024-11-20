"use client"

// API
import api from '../utils/api'

// Components
import { useRouter } from 'next/navigation';
import { useFlashMessage } from '../context/FlashMessageContext';

// Hooks
import useAuth from './useAuth'
import useGlobalsActions from './useGlobalsActions';

// Interfaces
import { SaleInterface } from '../interfaces/others/SaleInterface';

export default function useRelatoryActions() {
  const router = useRouter()
  const { setFlashMessage } = useFlashMessage()
  const {filterSalesByDateInterval} = useGlobalsActions()
  const {verifyAuthAndRequestError} = useAuth()
  
  async function addRelatory(
    sales: SaleInterface[],
    startDate: Date,
    endDate: Date, 
    token: any
  ): Promise<void> {
    let filterdSales = filterSalesByDateInterval(sales, startDate, endDate)
    let relatory = {
      startDate: startDate,
      endDate: endDate,
      sales: filterdSales
    }

    try{
      api.post(`/historico`, relatory, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({message: 'Historico gerado com sucesso', type: 'success'})
      })
    
    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }

  }

  async function getRelatories(setRelatories: Function, token: any): Promise<void> {
    try {
      const res = await api.get('/historico', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRelatories(res.data);

    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  async function getRelatory(
    setRelatory: Function, 
    id: number, 
    token: any
  ): Promise<void> {
    try {
      const res = await api.get(`/historico/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRelatory(res.data);

    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  async function getRelatoryData(
    setRelatory: Function, 
    fk_history: number, 
    token: any
  ): Promise<void> {
    try {
      const sales_histories = await api.get(`/historico_venda/${fk_history}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const salesProducts = await api.get(`/produtos_vendidos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      let result: any
      let totProducts: number = 0

      sales_histories.data.map((data: any)=>{
        let filtereds = salesProducts.data.filter((sale_product: any)=> 
            sale_product.fk_sale === data.tb_sale.id)

        let tot = 0
        filtereds.map((filtered: any)=> tot += Number(filtered.quantity))
        data.quantity = tot
        totProducts = Number(totProducts) + Number(tot)
      })

      sales_histories.data.tot_sales_products = totProducts
      result = sales_histories.data
      setRelatory(result);

    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }
  
  return { 
    addRelatory,
    getRelatories,
    getRelatory,
    getRelatoryData
  }
}