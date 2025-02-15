'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";

// API
import api from '@/src/utils/api'

//Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext';

export default function Authentication({children}: any) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {setFlashMessage} = useFlashMessage()
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setIsAuthenticated(true)
        
      } else {
        setIsAuthenticated(false);
        router.replace('/auth/login')
        setFlashMessage({ message: 'Você não esta autenticado, Faça login', type: 'error'})
      }
  
  },[])

  return (
    <>
     {isAuthenticated &&(
      children
     )}
    </>
  );
}
