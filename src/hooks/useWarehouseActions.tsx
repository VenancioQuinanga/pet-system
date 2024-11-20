"use client"

// API
import api from '../utils/api'

// Interfaces
import { WarehouseInterface } from '../interfaces/others/WarehouseInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useWarehouseActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function addWarehouse(
    warehouse: WarehouseInterface, 
    token: any
  ): Promise<void> {
    try{
      api
        .post(`/armazem`, warehouse,{
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((response) => {
          setFlashMessage({ message: 'Armazem cadastrado com sucesso!', type: 'success'})
        })

    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function getWarehouses (
    setWarehouses: Function,
    token:any
  ): Promise<void>{
    try{
      api.get('/armazem', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
          setWarehouses(res.data)
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getWarehouse(
    setWarehouse: Function,
    id: number, 
    token: any
  ): Promise<void> {    
    const warehouses: any = await api.get('/armazem', {
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

    warehouses.map((w: any) => { if (w.id == id) setWarehouse(w) })
  }

  async function editWarehouse(
    warehouse: WarehouseInterface, 
    id: number, 
    token: any
  ): Promise<void> {
    try{
      api.patch(`/armazem/${id}`, warehouse, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Armazem atualizado com sucesso!', type: 'success'})
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  return { 
    addWarehouse, 
    getWarehouses, 
    getWarehouse,
    editWarehouse
  }
}
