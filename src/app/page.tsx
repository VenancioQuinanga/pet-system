"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Components
import Loader from "../components/layout/loader/Loader";

export default function Welcome() {
  const router = useRouter()

  useEffect(()=>{
    const fetchData = async()=>{
      let token = localStorage.getItem('token')
      let is_admin = localStorage.getItem('is_admin')

      if(!token) {
        router.push('/auth/login')
      } else if(token && is_admin) {
        router.push('/dashboard')
      } else {
        router.push('/vendas')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Loader />
    </>
  );
}
