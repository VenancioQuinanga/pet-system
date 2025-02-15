'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import UserForm from "@/src/components/form/UserForm";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useUserActions from "@/src/hooks/useUserActions";

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Interfaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";

export default function AddUser() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [data, setData] = useState<UserInterface>({})
  const [genders, setGenders] = useState([])
  const [categories, setCategories] = useState([])
  const {addUser, getCategories, getGenders} = useUserActions()
        
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getGenders(setGenders, token as string) 
      await getCategories(setCategories, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await addUser(data, token, setIsProgressing)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Authentication>
        <Navbar />
        {isProgressing && (
          <Progress />
        )}
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <div className="main mt-5">
              <div className="row">
                <div className="col-md-10 mb-5 m-auto">
                  <UserForm
                    onHandleChange={handleChange}
                    onHandleSubmit={handleSubmit}
                    categories={categories}
                    genders={genders}              
                  />
                </div>
              </div>
            </div>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
