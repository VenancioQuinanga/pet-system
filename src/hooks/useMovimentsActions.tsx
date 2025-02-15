"use client"

// API
import api from '../utils/api'

// Interfaces
import { MovimentInterface } from '../interfaces/others/MovimentInterface'
import { WarehouseInterface } from '../interfaces/others/WarehouseInterface'
// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useMovimentsActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function addMoviment(
    moviment: MovimentInterface | any, 
    warehouse: WarehouseInterface | any,
    fk_warehouse: number, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    let movimentData = {
      quantity: moviment.quantity,
      fk_product: moviment.fk_product,
      fk_warehouse: fk_warehouse
    }
    
    if (warehouse.quantity <= movimentData.quantity) {
      setFlashMessage({
         message: 'A quantidade a movimentar não pode ser superior ou igual a do armazem!', 
         type: 'error'
      })

    } else if (movimentData.quantity <= 0) {
      setFlashMessage({
          message: 'A quantidade a movimentar não pode ser inferior ou igual a 0!', 
          type: 'error'
      })
  
    } else {

      setIsProgressing(true)
      
      try{
        api.post(`/movimento`, movimentData, {
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          .then((response) => {
            setIsProgressing(false)
            setFlashMessage({ message: 'Movimento realizado com sucesso!', type: 'success'})
          })
  
      } catch (error: any) {
        setIsProgressing(false)
        verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
      }
    }
    
  }

  async function getMoviments (
    setMoviments: Function,
    token:any
  ): Promise<void>{
      try{
        api.get('/movimento', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          setMoviments(res.data)
        })

      }catch(error: any){
          verifyAuthAndRequestError(error.response?.status,
            'Erro ao carregar dados, tente novamente!')
      } 
  }

  async function getMoviment(
    setMoviment: Function,
    id: number, 
    token: any
  ): Promise<void> {
      const moviments: any = await api.get('/movimento', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        return res.data
      })
      .catch((error: any)=>{
        verifyAuthAndRequestError(error.response?.status, 
          'Erro ao carregar dados, tente novamente!')
      })

      moviments.map((m: any) => { if (m.id == id) setMoviment(m) })
  }

  return { 
    addMoviment, 
    getMoviments, 
    getMoviment
  }
}
