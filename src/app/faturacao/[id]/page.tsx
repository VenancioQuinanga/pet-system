'use client'

import { useEffect, useState } from 'react';

// Components
import SalesProductsTable from '@/src/components/layout/Tables/SalesProductsTable';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Hooks
import useSalesActions from "@/src/hooks/useSalesActions";

// Utils
import Authentication from '@/src/utils/auth/Authentication';

export default function SeeSalesProducts({ params }: { params: { id: any } }) {  
  const [isLoading, setIsLoading] = useState(true)
  const [salesProducts, setSalesProducts] = useState([])
  const { getSale } = useSalesActions()
    
  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await getSale(setSalesProducts, params.id, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <div className="main">
            <SalesProductsTable
              salesProducts={salesProducts}
            />
          </div>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
}
