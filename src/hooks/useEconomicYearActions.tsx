"use client"

// API
import api from '../utils/api'

// Interfaces
import { MovimentInterface } from '../interfaces/others/MovimentInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useEconomicYearActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function getEconomicsYears (
    setEconomicYears: Function,
    token:any
  ): Promise<void>{
      try{
        api.get('/ano_economico', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          setEconomicYears(res.data)
        })

      }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
      } 
  }

  return { 
    getEconomicsYears
  }
}
