"use client"

// API
import api from '../utils/api'

// Interfaces
import { ClientInterface } from '../interfaces/others/ClientInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useClientActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  const generateNumericCode = (): string => {
    let date: Date = new Date()
    let result: string = '';
    for (let i = 0; i < 7; i++) {
      result += Math.floor(Math.random() * 10);  // Gera um número de 0 a 9
    }
    console.log('result1',result)
    console.log('day',date.getDay())
    console.log('minutes',date.getMinutes())
    console.log('mili',date.getMilliseconds())
    result += `${date.getDay()}${date.getMinutes()}${date.getMilliseconds()}`
    console.log('result',result)
    return result;
  };

  async function addClient(
    client: ClientInterface | any, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    
    let clientData = {
      name: (client.name !== null && client.name !==  '' && client.name !==  undefined)
       ? client.name : generateNumericCode(),
      email: client.email,
      nif: client.nif,
      fk_gender: client.fk_gender,
      ['tb_telephone.telephone']: client['tb_telephone.telephone'],
      ['tb_address.neihborhood']: client['tb_address.neihborhood'],
      ['tb_address.street']: client['tb_address.street'],
      ['tb_address.house']: client['tb_address.house']
    }

    try {
      api.post(`/cliente`, clientData, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((response) => {
          setIsProgressing(false)
          setFlashMessage({ 
            message: 'Cadastro realizado com sucesso!', 
            type: 'success'
          })
        })

    } catch (error: any) {
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function getClients(
    setClients: Function, 
    token: any
  ) : Promise<void> {
    try{
      api.get('/cliente', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=> setClients(res.data))

    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getClient(
    setClient: Function, 
    id: number, 
    token: any
  ): Promise<void> {
    try{
      api.get(`/cliente/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=> setClient(res.data))

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function editClient(
    client: ClientInterface, 
    id: number, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    try{
      api.patch(`/cliente/${id}`, client, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setIsProgressing(false)
        setFlashMessage({ message: 'Cliente atualizado com sucesso!', type: 'success'})
      })
      
    }catch(error: any){
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg
        || 'Erro ao efetuar edição!'
      )
    } 
  }

  async function deleteClient(
    id: number, 
    token: any
  ): Promise<void> {
    try{
      api.delete(`/cliente/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Cliente deletado com sucesso!', type: 'success'})
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data.msg)
    } 
  }
   
  return { 
    addClient,  
    getClient, 
    getClients, 
    editClient, 
    deleteClient 
  }
}
