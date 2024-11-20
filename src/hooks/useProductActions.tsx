"use client"

// API
import api from '../utils/api'

// Interfaces
import { ProductInterface } from '@/src/interfaces/others/ProductInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useProductActions() {
  const {verifyAuthAndRequestError} = useAuth()
  const { setFlashMessage } = useFlashMessage();

  async function addProduct(
    product: ProductInterface | any, 
    token:any
  ): Promise<void> {
    try {
      api.post(`/produtos`, product, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })

      setFlashMessage({ message: 'Cadastro realizado com sucesso!', type: 'success'})

    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function getProducts(
    setProducts: Function, 
    token: any
  ): Promise<void> {
    try {
      // Busca todos os produtos
      const productResponse = await api.get('/produtos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const products = productResponse.data;
  
      // Busca todos os estoques
      const stockResponse = await api.get('/estoque', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const stocks = stockResponse.data;
  
      // Relaciona cada produto ao seu respectivo estoque
      const productsWithStock = products.map((product: any) => {
        const stock = stocks.find((s: any) => s.fk_product === product.id);
  
        if (stock) {
          product['tb_stock.quantity'] = stock.quantity;
          product['tb_stock.unity'] = stock.unity;
        } else {
          product['tb_stock.quantity'] = 0; 
          product['tb_stock.unity'] = 0; 
        }
  
        return product;
      });
  
      setProducts(productsWithStock);
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  async function getProduct(
    setProducts: Function, 
    id: number, 
    token: any
  ): Promise<void> {
    let productData: any
    try{
      api.get(`/produtos/${id}`, {
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
            let stock: any = stocks.find((s: any)=> productData.id === s.fk_product)
            productData['tb_stock.quantity'] = stock.quantity
            productData['tb_stock.unity'] = stock.unity
            setProducts(productData)
          })
          .catch((error: any)=>{
            verifyAuthAndRequestError(error.response?.status,
              'Erro ao carregar dados, tente novamente!')
          })

        })

    }catch(error: any){
      console.log("Error:",error) 
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    } 
  }

  async function editProduct(
    product: ProductInterface, 
    id: number, 
    token: any
  ): Promise<void> {
    try{
      api.patch(`/produtos/${id}`, product, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ 
          message: 'Produto atualizado com sucesso!', 
          type: 'success'
        })
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function deleteProduct(
    id: number, 
    token: any
  ){
    try{
      api.delete(`/produtos/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setFlashMessage({ message: 'Produto deletado com sucesso!', type: 'success'})
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    } 
  }

  async function getProductsTypes(
    setProductsTypes: Function, 
    token: any
  ): Promise<void> {
    try{      
      api.get('/tipo', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setProductsTypes(res.data)
      })
        
    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    }
  }

  async function getProductsFamilies(
    setProductsTypes: Function, 
    token: any
  ): Promise<void> {
    try{      
      api.get('/familia', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setProductsTypes(res.data)
      })
        
    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    }
  }
  
  async function getProductsProvisioners(
    setProductsProvisioners: Function, 
    token: any
  ): Promise<void> {
    try{      
      api.get('/fornecedor', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setProductsProvisioners(res.data)
      })
        
    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    }
  }

  return { 
    addProduct, 
    getProductsTypes, 
    getProductsFamilies, 
    getProductsProvisioners,
    getProduct, 
    getProducts, 
    editProduct, 
    deleteProduct 
  }
}
