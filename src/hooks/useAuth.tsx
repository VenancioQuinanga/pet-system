"use client"

import { useRouter } from 'next/navigation'

// API
import api from '../utils/api'

// Components
import { useFlashMessage } from '../context/FlashMessageContext';

//Interfaces
import { UserInterface } from '@/src/interfaces/others/UserInterface'

export default function useAuth() {
  const router = useRouter()
  const { setFlashMessage } = useFlashMessage();

  async function login(user: UserInterface): Promise<void> {
    try {
      const data = await api
        .post(`/usuario/authenticate`, user)
          .then((response) => {
            api.post(`/login_historico/`, {fk_user: response.data.id})
              .catch((error)=>{
                console.log('error:', error.response?.data?.msg)
              })
            return response.data
          })

      await authUser(data)
      setFlashMessage({ message: 'Login realizado com sucesso!', type: 'success'})
      
    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function checkUserByToken(setItem: Function, token: string): Promise<void> {
    try {
      const response = await api.get(`/usuario/getuserbytoken/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setItem(response.data)
    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, `Erro ao carregar dados!`)
    }
  }

  async function authUser(data: any) {
    localStorage.setItem('token', `${data.token}`)
    localStorage.setItem('is_admin', `${data.is_admin}`)

    if(data.is_admin) return router.replace('/dashboard')
    router.replace('/vendas')
  }

  async function logout(): Promise<void> {
    const msgText = 'Logout realizado com sucesso!'
    const msgType = 'success'

    localStorage.removeItem('token')
    localStorage.removeItem('is_admin')
    api.defaults.headers.common['Authorization'] = undefined
    router.replace('/auth/login')

    setFlashMessage({ message: msgText, type: msgType})
  }

  async function getLoginHistories (
    setLoginHistories: Function,
    token:any
  ): Promise<void>{
      try{
        api.get('/login_historico', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          setLoginHistories(res.data)
        })

      }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
      } 
  }

  async function verifyAuthAndRequestError(
    status: number, 
    msg: string
  ): Promise<void> {
    
    if (!status) {
      setFlashMessage({ message: 'Erro interno, contacte a equipe técnica!', type: 'error'})
      
    }else if(status === 401) {
      router.replace('/auth/login')
      localStorage.removeItem('token')
      setFlashMessage({ message: 'A sua sessão expirou, faça login!', type: 'error'})

    }else{
      setFlashMessage({ message: msg, type: 'error'})
    }
  }

  return { 
    login, 
    checkUserByToken,
    logout, 
    getLoginHistories, 
    verifyAuthAndRequestError 
  }
}
