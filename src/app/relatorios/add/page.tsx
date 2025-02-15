'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import RelatoryForm from "@/src/components/form/RelatoryForm";
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useRelatoryActions from "@/src/hooks/useRelatoryActions";
import useSalesActions from "@/src/hooks/useSalesActions";

export default function MakeRelatory() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [date, setDate] = useState<any>({})
  const [sales, setSales] = useState<any>({})
  const { getSales } = useSalesActions()
  const { addRelatory } = useRelatoryActions()
    
  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await addRelatory(sales, date.startDate, date.endDate, token, setIsProgressing)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setDate({...date, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')

      await checkUserByToken(setUser, token as string)
      await getSales(setSales, token as string)
      setIsLoading(false)
    }

    fetchData()
  },[])

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
                  <RelatoryForm
                    onHandleChange={handleChange}
                    onHandleSubmit={handleSubmit} 
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
