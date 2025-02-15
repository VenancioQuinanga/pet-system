'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import ProvisionerForm from "@/src/components/form/ProvisionerForm";
import Progress from '@/src/components/layout/progress/Progress';
import Loader from "@/src/components/layout/loader/Loader";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Hooks
import useProvisionerActions from "@/src/hooks/useProvisionerActions";
import useAuth from '@/src/hooks/useAuth';

// Utils
import Authentication from "@/src/utils/auth/Authentication";
import AdminProtected from "@/src/utils/auth/Admin";

// Interfaces
import { ProvisionerInterface } from "@/src/interfaces/others/ProvisionerInterface";

export default function AddProvisioner() {
  const [isProgressing, setIsProgressing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const [provisioner, setProvisioner] = useState<ProvisionerInterface>({})
  const { addProvisioner} = useProvisionerActions()
        
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const token = localStorage.getItem('token')
    setIsProgressing(true)
    await addProvisioner(provisioner, token, setIsProgressing)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProvisioner({...provisioner, [e.target.name]: e.target.value})
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
                  <ProvisionerForm
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
