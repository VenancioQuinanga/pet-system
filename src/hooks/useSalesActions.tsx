"use client"

// API
import api from '../utils/api'

// Interfaces
import { SaleInterface } from '../interfaces/others/SaleInterface'
import { ProductInterface } from '../interfaces/others/ProductInterface'
import { UserInterface } from '../interfaces/others/UserInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'
import useInvoicesActions from './useInvoicesActions'

export default function useSalesActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const {addInvoice} = useInvoicesActions()
  const { setFlashMessage } = useFlashMessage();

  async function getSales(setSales: Function, token: any): Promise<void> {
    try {
      const res = await api.get('/venda_produto', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSales(res.data);
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }
  
  async function getSale(setSale: Function, id: number, token: any): Promise<void> {
    try {
      const res = await api.get(`/venda_produto/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSale(res.data);
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  async function editSale(sale: SaleInterface, token: any): Promise<void> {
    try{
      api.patch(`/venda_produto/${sale.id}`, sale, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Venda atualizada com sucesso!', type: 'success'})
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function deleteSale(id: number, token: any): Promise<void> {
    try{
      api.delete(`/venda_produto/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Venda deletada com sucesso!', type: 'success'})
      })

    }catch(error: any){
      console.log("Error:",error) 
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }
    
  async function justIsOnCart(id: number): Promise<boolean> {
    let productsInCart: any = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (productsInCart.length > 0) {
      const productInCart = productsInCart.find((p: any) => p.id === id);
      return productInCart !== undefined;
    } else {
      return false;
    }
  }

  async function calcPayment(
    sale: SaleInterface) {

    let productsInCart: any[] = JSON.parse(localStorage.getItem('products') || '[]');
    sale.tot_to_pay = 0
    sale.payment = 0
    sale.change = 0

    let tot = sale.tot_to_pay || 0
    let payment = sale.payment || sale.tot_to_pay || 0
    sale.tot_to_pay = tot

    productsInCart.map((product:any)=>{
      tot = sale.tot_to_pay || 0
      sale.tot_to_pay = Number(tot) + 
      Number(product.quantity) * Number(product.price)
    })

    sale.payment = payment || sale.tot_to_pay
    if(sale.payment < sale.tot_to_pay) sale.payment = sale.tot_to_pay
    sale.change = Number(payment) - Number(sale.tot_to_pay)
    if(sale.change < 0) sale.change = 0
  }

  async function addToCart(
    sale: SaleInterface,
    setProducts: Function,
    products: ProductInterface[],
    product: ProductInterface | any,
    token: any
  ) {

    if (product.id !== undefined) {
      let newProduct: any 
      let InCart: boolean = await justIsOnCart(product.id);

      if (!InCart) {
        
        try{
          api.get(`produtos/${product.id}`, {
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          .then((res) => newProduct = res.data)
          .then((res)=>{
            api.get(`/estoque`)
            .then((res)=>{
              let stocks = res.data
              let stock: any = stocks.find((s: any)=> newProduct.id === s.fk_product)
              newProduct['tb_stock.quantity'] = stock.quantity
              newProduct['tb_stock.unity'] = stock.unity

              if (
                product.quantity > stock.quantity ||
                stock.quantity <= 0
              ) {
                setFlashMessage({
                  message: 'O stock é inferior a quantidade requisitada!',
                  type: 'error',
                });
              } else {
                let productToSaveInCart = {
                  id: product.id,
                  quantity: (product.quantity == 0 || product.quantity == undefined) ?
                    1 : product.quantity,
                  name: newProduct.name,
                  description: newProduct['tb_subProduct.description'],
                  price: newProduct.price,
                  Stock: newProduct['tb_stock.quantity']
                };
        
                let tot = sale.tot_to_pay || 0
                sale.tot_to_pay = Number(tot) + 
                Number(productToSaveInCart.quantity) * Number(productToSaveInCart.price)
    
                let payment = sale.payment || sale.tot_to_pay
                if(payment < sale.tot_to_pay) payment = sale.tot_to_pay
                sale.payment = payment
                sale.change = Number(payment ? payment : sale.tot_to_pay) - Number(sale.tot_to_pay)
                if(sale.change < 0) sale.change = 0
    
                let newProducts: any[] = [...products, productToSaveInCart];
                localStorage.setItem('products', JSON.stringify(newProducts));
                setProducts(newProducts);
                
                setFlashMessage({
                  message: 'Produto adicionado com sucesso!',
                  type: 'success',
                });
              }
              
            })
            .catch((error: any)=>{
              verifyAuthAndRequestError(error.response?.status,
                'Erro ao carregar dados, tente novamente!')
            })
          })

        }catch(error: any){
          console.log("Error:",error) 
          verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
        }
  
      } else {
        setFlashMessage({
          message: 'O produto já foi adicionado!',
          type: 'error',
        });
      }

    } else if (product.quantity <= 0) {
      setFlashMessage({
        message: 'O produto não tem stock disponivel!',
        type: 'error',
      });
    } else {
      setFlashMessage({
        message: 'Selecione o produto!',
        type: 'error',
      });
    }
    
  }

  async function removeToCart(
    setProducts: Function,
    sale: any,
    id: number
  ) {
    let productsInCart: any[] = JSON.parse(localStorage.getItem('products') || '[]');

    if (productsInCart) {      
          
        let products: any = productsInCart.filter((p: any) => p.id == id) || [];

        products.map((product: any)=>{
          let tot = sale.tot_to_pay || 0
          sale.tot_to_pay = tot - (product.quantity * product.price)
          let payment = sale.payment - (product.quantity * product.price)
          
          sale.payment = payment || 0
          if(sale.payment < sale.tot_to_pay) sale.payment = sale.tot_to_pay
          sale.change = payment - sale.tot_to_pay
          if(sale.change < 0) sale.change = 0
        })

        productsInCart = productsInCart.filter((p: any) => p.id != id);
        setProducts(productsInCart)
        localStorage.setItem('products', JSON.stringify(productsInCart));
        
        setFlashMessage({
          message: 'Produto removido com sucesso!',
          type: 'success',
        });

    } else {
      setFlashMessage({
        message: 'Não há produtos no carrinho!',
        type: 'error',
      });
    }
  }

  async function cancelSale(
    setProducts: Function,
    sale: any
  ) {
    let productsInCart: any[] = JSON.parse(localStorage.getItem('products') || '[]');

    if (productsInCart) {      
        productsInCart = []
        setProducts(productsInCart)
        localStorage.removeItem('products');
        sale.tot_to_pay = 0
        sale.payment = 0
        sale.change = 0
        
        setFlashMessage({
          message: 'Venda cancelada com sucesso!',
          type: 'success',
        });

    } else {
      setFlashMessage({
        message: 'Não há produtos no carrinho!',
        type: 'error',
      });
    }
  }

  async function doSale(
    setSale: Function,
    sale: SaleInterface | any, 
    setProducts: Function,
    products: ProductInterface | any, 
    user: UserInterface, 
    sales: SaleInterface[],
    years: any[],
    token: any,
    setIsProgressing: Function
  ): Promise<void> {

    const data = {
      products: products,
      fk_payment_type: sale.fk_payment_type,
      payment: sale.payment,
      troco: sale.change,
      fk_client: sale.fk_client,
      fk_user: user.id
    };
    let date: Date = new Date()
    let permition: Boolean = true
    let aproved: Boolean = false

    sales.map((sale: any)=>{
      let saleDate: Date = new Date(sale.date)
      if (saleDate >= date) {
        permition = false
      }
    })
    
    years.map((year: any)=>{
      let yearDate: Date = new Date(year.end_date)
      if (yearDate >= date
      ){
        aproved = true
      }
    })

    if(
      sale.payment === undefined || sale.fk_payment_type === undefined
      || sale.change === undefined || sale.fk_client === undefined
    ){
      setIsProgressing(false)
      setFlashMessage({
        message: 'Preencha todos os campos!',
        type: 'error',
      });

    } else if(sale.payment < sale.tot_to_pay){
      setIsProgressing(false)
      setFlashMessage({
        message: 'O valor pago não pode ser menor que o total á pagar!',
        type: 'error',
      });

    } else if(!permition){
      setIsProgressing(false)
      setFlashMessage({
        message: 'Não podem ser efetudas 2 vendas no mesmo instante!',
        type: 'error',
      });

    }else if(!aproved){
      setIsProgressing(false)
      setFlashMessage({
        message: 'Contacte a equipe técnica para cadastrar um novo ano!',
        type: 'error',
      });

    }else{
      try{
        api.post(`/venda_produto`, data, {
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          .then((res)=>{
            setProducts([])
            setSale({})
            localStorage.removeItem('products');
            sale.tot_to_pay = 0
            sale.payment = 0
            sale.change = 0

            let date = new Date()
            let code = `FR/${date.getFullYear()}/${res.data.sale.id}${date.getTime()}`
            let invoice = {fk_sale: res.data.sale.id, code: code}
            addInvoice(invoice, token)

            setIsProgressing(false)
            setFlashMessage({
              message: 'Venda efetuada com sucesso!',
              type: 'success',
            });
          })

      }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          error.response?.data?.msg ||
          'Erro ao efetuar venda!, tente novamente!')
      } 

    }
  }

  async function getPaymentTypes(
    setSales: Function, 
    token: any
  ): Promise<void> {
    try{
      api.get('/tipo_pagamento', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
          setSales(res.data)
      })

    }catch(error: any){
        verifyAuthAndRequestError(error.response?.status,
          'Erro ao carregar dados, tente novamente!')
    } 
  }

  return { 
    getPaymentTypes,
    getSale,
    getSales,
    editSale,
    deleteSale,
    calcPayment,
    addToCart,
    removeToCart,
    cancelSale,
    doSale
  }
}
