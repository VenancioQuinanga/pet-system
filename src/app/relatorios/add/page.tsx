'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Components
import RelatoryForm from "@/src/components/form/RelatoryForm";
import Authentication from "@/src/utils/Authentication";

// Hooks
import useRelatoryActions from "@/src/hooks/useRelatoryActions";
import useSalesActions from "@/src/hooks/useSalesActions";

export default function MakeRelatory() {
  const [date,setDate] = useState<any>({})
  const [sales,setSales] = useState<any>({})
  const {getSales} = useSalesActions()
  const {addRelatory} = useRelatoryActions()
    
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    addRelatory(sales, date.startDate, date.endDate, token)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setDate({...date, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getSales(setSales, token)
  },[])

  return (
    <>
      <Authentication>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 mb-5 m-auto">
              <RelatoryForm
                onHandleChange={handleChange}
                onHandleSubmit={handleSubmit} 
              />
            </div>  
          </div>
        </div>
      </Authentication>
    </>
  );
}
