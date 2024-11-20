'use client'

import { ChangeEvent, FormEvent, useState } from "react";

// Components
import ClientForm from "@/src/components/form/ClientForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useClientActions from "@/src/hooks/useClientActions";
import useUserActions from "@/src/hooks/useUserActions";

// Interfaces
import { ClientInterface } from "@/src/interfaces/others/ClientInterface";

export default function AddUser() {
  const [client,setClient] = useState<ClientInterface>({})
  const {addClient} = useClientActions()
  const {getGenders} = useUserActions()
    
  const onHandleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addClient(client, token)
  }

  const onHandleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setClient({...client, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <ClientForm
                onHandleChange={onHandleChange}
                onHandleSubmit={onHandleSubmit}
                getGenders={getGenders}              
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
