"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

//components
import LoginHistoriesTable from '@/src/components/layout/Tables/LoginHistoriesTable';
import MovimentsTable from '@/src/components/layout/Tables/MovimentsTable';
import SalesChart from '@/src/components/charts/SalesChart';
import RelatoryChart from '@/src/components/charts/RelatoryChart';
import InputButton from '@/src/components/form/InputButton';
import RelatoriesTable from '@/src/components/layout/Tables/RelatoriesTable';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Loader from "@/src/components/layout/loader/Loader";

// Hoosks
import useAuth from '@/src/hooks/useAuth';
import useGlobalsActions from '@/src/hooks/useGlobalsActions';
import useProductActions from '@/src/hooks/useProductActions';
import useProvisionerActions from '@/src/hooks/useProvisionerActions';
import useUserActions from '@/src/hooks/useUserActions';
import useMovimentsActions from '@/src/hooks/useMovimentsActions';
import useRelatoryActions from '@/src/hooks/useRelatoryActions';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

// Interfaces
import { ProductInterface } from '@/src/interfaces/others/ProductInterface';
import { ProvisionerInterface } from '@/src/interfaces/others/ProvisionerInterface';
import { UserInterface } from '@/src/interfaces/others/UserInterface';

const relatories: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getTotSalesForMonth } = useGlobalsActions()
  const { getLoginHistories } = useAuth()
  const { getMoviments } = useMovimentsActions()
  const { getProducts } = useProductActions()
  const { getProvisioners } = useProvisionerActions()
  const { getRelatories } = useRelatoryActions()
  const { getUsers } = useUserActions()
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [users, setUsers] = useState<UserInterface[]>([])
  const [provisioners, setProvisioners] = useState<ProvisionerInterface[]>([])
  const [totSales, setTotSales] = useState<any[]>([])
  const [relatories, setRelatories] = useState([])
  const [moviments, setMoviments] = useState([])
  const [loginHistories, setLoginHistories] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')

      await checkUserByToken(setUser, token as string) 
      await getUsers(setUsers, token as string)
      await getProvisioners(setProvisioners, token as string)
      await getProducts(setProducts, token as string)
      await getTotSalesForMonth(setTotSales, token as string)
      await getRelatories(setRelatories, token as string)
      await getMoviments(setMoviments, token as string)
      await getLoginHistories(setLoginHistories, token as string)
      setIsLoading(false)
    }

    fetchData()
  },[])

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <main className="main">
              <Link href='/relatorios/add'>
                <InputButton
                  name='add_relatory_button'
                  className='btn btn-dark p-3'
                  value='Gerar relatorio'
                />
              </Link>
              <section className="mt-5">
                <SalesChart
                  monthSales={totSales}
                />
              </section>
              <section className="mt-5">
                <RelatoryChart
                  data={{  
                    users: users.length,
                    provisioners: provisioners.length,
                    products: products.length
                  }}
                />
              </section>
              <section>
                <RelatoriesTable
                  relatories={relatories}
                />
              </section>
              <section>
                <MovimentsTable
                  moviments={moviments}
                />
              </section>
              <section>
                <LoginHistoriesTable 
                  loginHistories={loginHistories}
                />
              </section>
            </main>
          </AdminProtected>   
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
};

export default relatories;