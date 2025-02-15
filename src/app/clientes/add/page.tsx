'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import ClientForm from "@/src/components/form/ClientForm";
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";
import Progress from '@/src/components/layout/progress/Progress';

// Utils
import Authentication from "@/src/utils/auth/Authentication";

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useClientActions from "@/src/hooks/useClientActions";
import useUserActions from "@/src/hooks/useUserActions";

// Interfaces
import { ClientInterface } from "@/src/interfaces/others/ClientInterface";

export default function AddUser() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [genders, setGenders] = useState<any>(null)
  const [client, setClient] = useState<ClientInterface>({})
  const { addClient } = useClientActions()
  const { getGenders } = useUserActions()
    
      
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getGenders(setGenders, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const onHandleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    addClient(client, token, setIsProgressing)
  }

  const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setClient({...client, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Authentication>
        <Navbar />
        {isProgressing && (
          <Progress />
        )}
        {!isLoading ? (
          <div className="main mt-5">
            <div className="row">
              <div className="col-md-10 mb-5 m-auto">
                <ClientForm
                  onHandleChange={onHandleChange}
                  onHandleSubmit={onHandleSubmit}
                  genders={genders}              
                />
              </div>  
            </div>
          </div>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
