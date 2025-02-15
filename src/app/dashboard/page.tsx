"use client"

import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

// Components
import Loader from "@/src/components/layout/loader/Loader";
import DateFilter from '../../components/layout/DateFilter';
import GainsChart from '../../components/charts/GainsChart';
import SalesAndLoses from '../../components/charts/SalesAndLoses';
import ProductTable from '../../components/layout/Tables/ProductTable';
import Grid from "../../components/layout/grid/Grid";
import GridCard from "../../components/layout/grid/card/GridCard";
import Navbar from '@/src/components/layout/Navbar/Navbar';

// Validators
import formatNumber from "../../components/layout/grid/validators/number";

// Hoosks
import useAuth from '@/src/hooks/useAuth';
import useProductActions from '../../hooks/useProductActions';
import useSalesActions from '../../hooks/useSalesActions';
import useGlobalsActions from '../../hooks/useGlobalsActions';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getProducts } = useProductActions()
  const { getSales } = useSalesActions()
  const
    {
      getTotSales,
      getTotLoses,
      getTotGainsForMonth,
      getTotSalesProducts,
      getTotGainsForDateInterval
    } = useGlobalsActions()
  const [products, setProducts] = useState([])
  const [totSalesProducts, setTotSalesProducts] = useState([])
  const [sales, setSales] = useState([])
  const [totSales, setTotSales] = useState<any>(0)
  const [totLoses, setTotLoses] = useState<any>()
  const [totGains, setTotGains] = useState([])
  const [date, setDate] = useState<any>({})

  const handleFilter = async () => {
    getTotGainsForDateInterval(setTotGains, sales, date.startDate, date.endDate)
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setDate({...date, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await checkUserByToken(setUser, token as string) 
      await getSales(setSales, token)
      await getTotSales(setTotSales, token)
      await getTotLoses(setTotLoses, token)
      await getTotSalesProducts(setTotSalesProducts, token)
      await getTotGainsForMonth(setTotGains, token)
      await getProducts(setProducts, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Authentication>
        <Navbar />
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <main className="main">
              <Grid>
                <GridCard
                  title="Total de vendas"
                  value={`${totSales > 0 ? formatNumber(totSales as any) : 0.00}kz`}
                  icon="bi bi-currency-dollar"
                />
                <GridCard
                  title='Total produtos'
                  value={products?.length || 0}
                  icon="bi bi-cart"
                />
                <GridCard
                  title='Total vendidos'
                  value={totSalesProducts?.length || 0}
                  icon="bi bi-shop"
                />
                <GridCard
                  title='Total perdidos'
                  value={`${totLoses?.value > 0 ? formatNumber(totLoses?.value as any) : 0.00}kz`}
                  icon="bi bi-arrow-down-circle"
                />
                <div className='mt-5'>
                  <DateFilter 
                    onFilter={handleFilter}
                    onHandleChange={onHandleChange}
                  />
                </div>
                <div className="mb-3">
                  <GainsChart
                    monthGains={totGains}
                  />
                </div>
                <div className="mt-5">
                  <SalesAndLoses
                    totSales={sales?.length || 0}
                    totLoses={totLoses?.loses || 0}
                  />
                </div>
                <div>
                  <ProductTable
                    products={products}
                  />
                </div>
              </Grid>
            </main>
          </AdminProtected>
        ) : (
          <Loader />
        )}
      </Authentication>
    </>
  );
}
