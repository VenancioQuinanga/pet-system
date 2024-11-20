'use client'

import { ChangeEvent, FormEvent, useState } from "react";

// Components
import ProvisionerForm from "@/src/components/form/ProvisionerForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useProvisionerActions from "@/src/hooks/useProvisionerActions";

// Interfaces
import { ProvisionerInterface } from "@/src/interfaces/others/ProvisionerInterface";

export default function AddProvisioner() {
  const [provisioner,setProvisioner] = useState<ProvisionerInterface>({})
  const { addProvisioner} = useProvisionerActions()
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addProvisioner(provisioner, token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setProvisioner({...provisioner, [e.target.name]: e.target.value})
    console.log('provisioner:', provisioner)
    console.log('valor:', e.target.value)
  }

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <ProvisionerForm
                onHandleChange={handleChange}
                onHandleSubmit={handleChange} 
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
