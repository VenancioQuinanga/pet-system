"use client"

// API
import api from '../utils/api'

// Interfaces
import { SaleInterface } from '../interfaces/others/SaleInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useGlobalsActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function getTotSales(
    setTotSales: Function, 
    token: any
  ): Promise<void> {
    try{
      let payment = 0
      const data = await api.get('/venda_produto', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        return res.data
      })
        
      data.map((d:any)=>{  payment = Number(payment) + Number(d.payment)  })
      setTotSales(payment)

    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getTotLoses(
    setTotLoses: Function, 
    token: any
  ): Promise<void> {
    try{
      let productData: any
      api.get('/produtos', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=> productData = res.data)
      .then((res)=>{
        api.get(`/estoque`, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          let stocks = res.data
          let stock: any
          productData.map((product: any) => {
            stock = stocks.find((s: any) => product.id === s.fk_product)
            product['quantity'] = stock?.quantity
          })
          
          const ActualDate = new Date()
          const expiredProducts = productData.filter((p: any) => new Date(p.expiry_date) < ActualDate)
          const TotLoses = expiredProducts.reduce((sum: number, product: any) => 
            Number(sum) + Number(product.purchase_price * product.quantity ), 0)

          setTotLoses({
            value: TotLoses,
            loses: expiredProducts.length
          })
        })
      })
      
    }catch(error: any){
        console.log("Error:",error)  
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  const getMonthName = (
    data: Date
  ): string => {
    const opcoes: Intl.DateTimeFormatOptions = { month: 'long' };
    return new Intl.DateTimeFormat('pt-br', opcoes).format(data);
  };

  function filterSalesByMonth(
    sales: SaleInterface[], 
    year: number, 
    month: number
  ): SaleInterface[] {
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);      
      return saleDate.getFullYear() === year && saleDate.getMonth() + 1 === month;
    });
  }

  function filterSalesByDateInterval(
    sales: SaleInterface[], 
    startDate: Date,
    endDate: Date
  ): SaleInterface[] {
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);      
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
  }

  async function getTotSalesForDateInterval(
    setTotSales: Function,
    sales: SaleInterface[],
    startDate: Date,
    endDate: Date
  ): Promise<void> {
    // O array começa com o cabeçalho correto
    let mySalesForDateInterval: any = [['Data', 'Vendas']];  
  
    let filteredSales = filterSalesByDateInterval(sales, startDate, endDate);
    let totalSales = 0;
  
    if (filteredSales.length > 0) {
      // Calcula o total das vendas no intervalo
      filteredSales.forEach((ms: any) => {
        totalSales += Number(ms.payment)  - Number(ms.troco);
      });
  
      mySalesForDateInterval.push([new Date(startDate), totalSales]);
    }
  
    // Definir os dados processados no estado
    setTotSales(mySalesForDateInterval);
  }  

  async function getTotSalesForMonth(
    setTotSales: Function, 
    token: any
  ): Promise<void>{
    try{
      const sales = await api.get('/venda_produto', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        return res.data
      })
      
      const year = new Date().getFullYear()

      let mySalesForMonth: any = [
        ['Mês','Vendas']
      ]  

      for(let i = 0; i <= 12; i++){        
        let monthSales = filterSalesByMonth(sales, year, i);
        let monthGain = 0

        if (monthSales.length > 0) {
          monthSales.map((ms: any)=> monthGain = Number(monthGain) + (Number(ms.payment)  - Number(ms.troco)));
          let mySaleName = getMonthName(new Date(monthSales[0].date))
          mySalesForMonth.push([ mySaleName, Number(monthGain) ]) 
        }
      }
      
      setTotSales(mySalesForMonth)
    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getTotGainsForMonth(
    setTotGains: Function, 
    token: any
  ): Promise<void>{
    try{
      const sales = await api.get('/venda_produto', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
          return res.data
      })
      
      const year = new Date().getFullYear()

      let myGainsForMonth: any = [
        ['Mês','Lucros']
      ]  

      for(let i = 0; i <= 12; i++){        
        let monthGains = filterSalesByMonth(sales, year, i);
        let monthGain: number = 0

        if (monthGains.length > 0) {
          monthGains.map((ms: any)=> monthGain = Number(monthGain) + (Number(ms.payment)  - Number(ms.troco)));
          let myMonthName = getMonthName(new Date(monthGains[0].date))
          myGainsForMonth.push([ myMonthName, Number(monthGain) ]) 
        }
      }
      
      setTotGains(myGainsForMonth)
    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getTotGainsForDateInterval(
    setTotGains: Function,
    sales: SaleInterface[],
    startDate: Date,
    endDate: Date  
  ): Promise<void> {
    if (startDate == null || endDate == null) {
      setFlashMessage({
        message: 'Preencha todos os campos!',
        type: 'error',
      });
    } else {
      let myGainsForDateInterval: any = [['Data', 'Lucros']];  
      
      let gains = filterSalesByDateInterval(sales, startDate, endDate);
      let gain: number = 0;
    
      if (gains.length > 0) {
        gains.forEach((ms: any) => gain += Number(ms.payment) - Number(ms.troco));
        myGainsForDateInterval.push([getMonthName(new Date(startDate)), Number(gain)]); 
      }
      
      setTotGains(myGainsForDateInterval);
    }
  }

  async function getTotSalesProducts(
    setTotSalesProducts: Function, 
    token: any
  ): Promise<void>{
    try{
      api.get('/produtos_vendidos', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setTotSalesProducts(res.data)
      })
        
    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function getUserByToken(
    setUser: Function, 
    token: any
  ): Promise<void> {
    api.get(`/getUserByToken/${token}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=> setUser(res.data))
      .catch((error: any)=>{
        setFlashMessage({
          message: 'Erro de autenticação, faça login de novo!',
          type: 'error',
        });
      })
  }

  return { 
    filterSalesByMonth,
    filterSalesByDateInterval,
    getTotSales, 
    getTotLoses,
    getTotSalesForMonth, 
    getTotGainsForMonth, 
    getTotSalesForDateInterval,
    getTotGainsForDateInterval,
    getTotSalesProducts,
    getUserByToken
  }
}
