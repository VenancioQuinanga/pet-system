'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { ChangeEvent } from 'react';

//Components
import DateFilter from '../components/layout/DateFilter';
import MinCard from '../components/layout/MinCard';
import GainsChart from '../components/charts/GainsChart';
import SalesAndLoses from '../components/charts/SalesAndLoses';
import ProductTable from '../components/layout/Tables/ProductTable';
import Authentication from '../utils/Authentication';

// Hoosks
import useProductActions from '../hooks/useProductActions';
import useSalesActions from '../hooks/useSalesActions';
import useGlobalsActions from '../hooks/useGlobalsActions';

export default function Dashboard() {
  const { getProducts } = useProductActions()
  const { getSales } = useSalesActions()
  const 
    { 
      getTotSales, 
      getTotLoses, 
      getTotGainsForMonth, 
      getTotSalesProducts ,
      getTotGainsForDateInterval
    } = useGlobalsActions()  
  const [products, setProducts] = useState([])
  const [totSalesProducts, setTotSalesProducts] = useState([])
  const [sales, setSales] = useState([])
  const [totSales, setTotSales] = useState()
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
    const token = localStorage.getItem('token')
    getSales(setSales, token)
    getTotSales(setTotSales, token)
    getTotLoses(setTotLoses, token)
    getTotSalesProducts(setTotSalesProducts, token)
    getTotGainsForMonth(setTotGains, token)
    getProducts(setProducts, token)
  },[])

  return (
    <>
      <Authentication>
        <div className="container-xxl">
          <div className="d-block">
            <section className={styles.dashboard_cards}>
              <MinCard
                title='Total vendas'
                value={`${totSales || 0}kz`}
                icone='bi bi-currency-dollar'
              />
              <MinCard
                title='Total produtos'
                value={products?.length || 0}
                icone='bi bi-cart'
              />
              <MinCard
                title='Produtos vendidos'
                value={totSalesProducts?.length || 0}
                icone='bi bi-shop'
              />
              <MinCard
                title='Total perdidos'
                value={`${totLoses?.value || 0}kz`}
                icone='bi bi-arrow-down-circle'
              />
            </section>
            <section className='mt-5'>
              <DateFilter 
                onFilter={handleFilter}
                onHandleChange={onHandleChange}
              />
            </section>
            <section className="mt-5 mb-4">
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
            </section>
            <section>
              <ProductTable
                getProducts={getProducts}
              />
            </section>
          </div>
        </div>
      </Authentication>
    </>
  );
}
