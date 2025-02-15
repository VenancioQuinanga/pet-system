"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useUserActions from "@/src/hooks/useUserActions";

// Components
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";
import InputButton from "@/src/components/form/InputButton";
import UserTable from "@/src/components/layout/Tables/UserTable";

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getUsers } = useUserActions()
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getUsers(setUsers, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
    <Authentication>
      <Navbar />
      {!isLoading ? (
        <AdminProtected is_admin={user?.is_admin}>
          <main className="main mt-3">
            <Link href='/usuarios/add'>
              <InputButton
                name='add_user_button'
                className='btn btn-dark p-3'
                value='Cadastrar usuário'
              />
            </Link>
            <UserTable 
              users={users}
            />
          </main>
          </AdminProtected>   
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
