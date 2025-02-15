"use client"

// API
import api from '../utils/api'

// Interfaces
import { ProvisionerInterface } from '@/src/interfaces/others/ProvisionerInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useProvisionerActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function addProvisioner(
    provisioner: ProvisionerInterface, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    try{
      api.post(`/fornecedor`, provisioner, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((response) => {
          setIsProgressing(false)
          setFlashMessage({ 
            message: 'Fornecedor cadastrado com sucesso!', 
            type: 'success'
          })
        })

    } catch (error: any) {
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function getProvisioners(
    setProvioners: Function, 
    token:any
  ): Promise<void>{
      try{
        api.get('/fornecedor', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
            setProvioners(res.data)
        })

      }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
      } 
  }

  async function getProvisioner(
    setProvisioner: Function,
    id: number, 
    token: any
  ): Promise<void> {
      const provisioners:any = await api.get('/fornecedor', {
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

      provisioners.map((p:any) => { if (p.id == id) setProvisioner(p) })
  }

  async function editProvisioner(
    provisioner: ProvisionerInterface,
    id: number, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    try{
      api.patch(`/fornecedor/${id}`, provisioner, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setIsProgressing(false)
        setFlashMessage({ 
         message: 'Fornecedor atualizado com sucesso!',
         type: 'success'
        })
      })

    }catch(error: any){
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function deleteProvisioner(
    id: number, 
    token: any
  ): Promise<void> {
    try{
      api.delete(`/fornecedor/${id}`)
      .then((res)=>{
        setFlashMessage({ 
          message: 'Fornecedor deletado com sucesso!', 
          type: 'success'
        })
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function getTelephones(
    setTelephone: Function, 
    id:  number, 
    token: any
  ): Promise<void> {
    try{
      api.get(`/fornecedor/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        let provisioner: any = res.data

        api.get('/telefone', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          let telephones = res.data
          let telephone = telephones.find((t: any) => t.id === provisioner.fk_telephone)
          setTelephone(telephone)
        })
      })
        
    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados do fornecedor, tente novamente!')
    }
  }

  return { 
    addProvisioner, 
    getProvisioner, 
    getProvisioners, 
    getTelephones,
    editProvisioner, 
    deleteProvisioner 
  }
}
