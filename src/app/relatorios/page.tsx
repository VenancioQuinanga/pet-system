"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

//components
import LoginHistoriesTable from '@/src/components/layout/Tables/LoginHistoriesTable';
import MovimentsTable from '@/src/components/layout/Tables/MovimentsTable';
import SalesChart from '@/src/components/charts/SalesChart';
import RelatoryChart from '@/src/components/charts/RelatoryChart';
import Authentication from '@/src/utils/Authentication';
import InputButton from '@/src/components/form/InputButton';
import RelatoriesTable from '@/src/components/layout/Tables/RelatoriesTable';

// Hoosks
import useAuth from '@/src/hooks/useAuth';
import useGlobalsActions from '@/src/hooks/useGlobalsActions';
import useProductActions from '@/src/hooks/useProductActions';
import useProvisionerActions from '@/src/hooks/useProvisionerActions';
import useUserActions from '@/src/hooks/useUserActions';
import useMovimentsActions from '@/src/hooks/useMovimentsActions';
import useRelatoryActions from '@/src/hooks/useRelatoryActions';

// Interfaces
import { ProductInterface } from '@/src/interfaces/others/ProductInterface';
import { ProvisionerInterface } from '@/src/interfaces/others/ProvisionerInterface';
import { UserInterface } from '@/src/interfaces/others/UserInterface';

const relatories: React.FC = () => {
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
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    getUsers(setUsers, token)
    getProvisioners(setProvisioners, token)
    getProducts(setProducts, token)
    getTotSalesForMonth(setTotSales, token)
  },[])

  return (
    <>
      <Authentication>
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
            getRelatories={getRelatories}
          />
        </section>
        <section>
          <MovimentsTable
            getMoviments={getMoviments}
          />
        </section>
        <section>
          <LoginHistoriesTable 
            getLoginHistories={getLoginHistories}
          />
        </section>
      </Authentication>
    </>
  );
};

export default relatories;