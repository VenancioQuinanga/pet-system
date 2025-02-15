"use client"

// API
import api from '../utils/api'

// Interfaces
import { UserInterface } from '@/src/interfaces/others/UserInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useUserActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function addUser(
    user: UserInterface | any, 
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    try {
      api
        .post(`/usuario`, user, {
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

  async function getUsers(setUsers: Function, token: any) : Promise<void>{
    try{
      api.get('/usuario', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setUsers(res.data)
      })

    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getUser(setUser: Function, id: number, token: any): Promise<void> {
    try{
      api.get(`/usuario/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
          setUser(res.data)
      })

    }catch(error: any){ 
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function editUser(
    user: UserInterface,
    id: number,
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    try{
      api.patch(`/usuario/${id}`, user, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setIsProgressing(false)
        setFlashMessage({ 
          message: 'Usuário atualizado com sucesso!', 
          type: 'success'
        })
      })
      
    }catch(error: any){
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function deleteUser(id: number, token: any): Promise<void> {
    try{
      api.delete(`/usuario/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Usuário deletado com sucesso!', type: 'success'})
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data.msg)
    } 
  }

  async function getGenders(setGenders: Function, token: any): Promise<void> {
    try{
      api.get('/genero_usuario', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setGenders(res.data)
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    }
  }
  
  async function getCategories(setCategories: Function, token: any): Promise<void> {
    try{
      const data = [
        {
          id: 1,
          category: 'Administrador'
        },
        {
          id: 2,
          category: 'Funcionário'
        }
      ]
      setCategories(data)
        
    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    }
  }
    
  return { 
    addUser, 
    getCategories, 
    getGenders, 
    getUser, 
    getUsers, 
    editUser, 
    deleteUser 
  }
}
