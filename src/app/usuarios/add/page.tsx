'use client'

import { ChangeEvent, FormEvent, useState } from "react";

// Components
import UserForm from "@/src/components/form/UserForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useUserActions from "@/src/hooks/useUserActions";

// Interfaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";

export default function AddUser() {
  const [user,setUser] = useState<UserInterface>({})
  const {addUser, getCategories, getGenders} = useUserActions()
    
  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addUser(user, token)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log('user:', user)
    console.log('valor:', e.target.value)
  }

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <UserForm
                onHandleChange={handleChange}
                onHandleSubmit={handleChange}
                getCategories={getCategories}
                getGenders={getGenders}              
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
