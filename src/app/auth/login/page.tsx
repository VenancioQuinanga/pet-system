'use client'

// Components
import { ChangeEvent, FormEvent, useState } from "react";
import LoginForm from "@/src/components/form/LoginForm";

// Hooks
import useAuth from "@/src/hooks/useAuth";

// Interfaces
import { UserInterface } from "@/src/interfaces/others/UserInterface";

export default function Login() {
  const [user, setUser] = useState<UserInterface>({})
  const {login} = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    login(user)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  return (
    <main>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-7 mb-5 m-auto">
            <LoginForm
              onHandleChange={handleChange}
              onHandleSubmit={handleSubmit}
            />
          </div>  
        </div>
      </div>
    </main>
  );
}
