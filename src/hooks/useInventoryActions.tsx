"use client"

import { useRouter } from 'next/navigation'

// API
import api from '../utils/api'

// Interfaces
import { MovimentInterface } from '../interfaces/others/MovimentInterface'

// Contexts
import { useFlashMessage } from '@/src/context/FlashMessageContext'

// Hooks
import useAuth from './useAuth'

export default function useInventoryActions() {
  const router = useRouter();
  const {verifyAuthAndRequestError} = useAuth();
  const { setFlashMessage } = useFlashMessage();

  async function create(
    inventory: MovimentInterface | any,
    token: any,
    setIsProgressing: Function
  ): Promise<void> {
    setIsProgressing(true)
    
    try{
      api.post(`/inventario`, inventory, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((response) => {
          setIsProgressing(false)
          setFlashMessage({ message: 'Inventário realizado com sucesso!', type: 'success'})
          router.replace(`/inventario/${response.data.id}`)
        })

    } catch (error: any) {
      setIsProgressing(false)
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
    
  }

  async function getInventories (
    setInventories: Function,
    token:any,
    setIsLoading: Function
  ): Promise<void>{
      try{
        api.get('/inventario', {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then((res)=>{
          setInventories(res.data)
        })

        setIsLoading(false)
      }catch(error: any){
        setIsLoading(false)
          verifyAuthAndRequestError(error.response?.status,
            'Erro ao carregar dados, tente novamente!')
      } 
  }

  async function getInventory(
    setInventory: Function,
    id: number, 
    token: any
  ): Promise<void> {
      const inventoryData: any = await api.get(`/inventario/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        return res.data
      })
      .catch((error: any)=>{
        verifyAuthAndRequestError(error.response?.status, 
          'Erro ao carregar dados, tente novamente!')
      })

      setInventory(inventoryData)
      console.log('data:', inventoryData)
  }

  async function justIsOnCart(id: number): Promise<boolean> {
    let productsInCart: any = JSON.parse(localStorage.getItem('inventoryData') || '[]');
    
    if (productsInCart.length > 0) {
      const productInCart = productsInCart.find((p: any) => p.fk_product === id);
      return productInCart !== undefined
    } else {
      return false;
    }
  }
  
  async function addToCart(
    setProducts: Function,
    products: any[],
    product: any,
    token: any
  ) {

    if (product.fk_product !== undefined) {
      let InCart: boolean = await justIsOnCart(product.fk_product);

      if (!InCart) {
        
        try{
          let productData: any = null
          api.get(`/produtos/${product.fk_product}`, {
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          .then((res) => productData = res.data)
            .then((res)=>{
              api.get(`/estoque`)
              .then((res)=>{
              let stocks = res.data
              let stock: any = stocks.find((s: any)=> productData.id === s.fk_product)
              let productToSaveInCart = {
                fk_product: product.fk_product,
                quantity: (product.quantity == 0 || product.quantity == undefined) ?
                  1 : product.quantity,
                description: productData["tb_subProduct.description"],
                price: productData.price,
                acert_type: stock?.quantity <= product.quantity ? 'Positivo' : 'Negativo',
                fk_acert_type: stock?.quantity <= product.quantity ? 1 : 2
              };
  
              let newProducts: any[] = [...products, productToSaveInCart];
              localStorage.setItem('inventoryData', JSON.stringify(newProducts));
              setProducts(newProducts);
              
              setFlashMessage({
                message: 'Produto adicionado com sucesso!',
                type: 'success',
              });
            });
          });

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
        message: 'Quantidade inválida!',
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
    id: number
  ) {
    let productsInCart: any[] = JSON.parse(localStorage.getItem('inventoryData') || '[]');

    if (productsInCart) {
      productsInCart = productsInCart.filter((p: any) => p.id != id);
      setProducts(productsInCart)
      localStorage.setItem('inventoryData', JSON.stringify(productsInCart));
      
      setFlashMessage({
        message: 'Produto removido com sucesso!',
        type: 'success',
      });

    } else {
      setFlashMessage({
        message: 'Sem produtos!',
        type: 'error',
      });
    }
  }

  async function cancelInventory(
    setProducts: Function
  ) {
    let productsInCart: any[] = JSON.parse(localStorage.getItem('inventoryData') || '[]');

    if (productsInCart) {      
        productsInCart = []
        setProducts(productsInCart)
        localStorage.removeItem('inventoryData');
        
        setFlashMessage({
          message: 'Recolha de inventario cancelada com sucesso!',
          type: 'success',
        });

    } else {
      setFlashMessage({
        message: 'Sem produtos!',
        type: 'error',
      });
    }
  }

  async function generateInventory(
    setProducts: Function,
    products: any,
    token: any,
    setIsProgressing: Function
  ): Promise<void> {

    const data = {
      products: products
    };
    
    try{
      api.post(`/inventario`, data, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setProducts([])
        localStorage.removeItem('inventoryData');

        setIsProgressing(false)
        setFlashMessage({
          message: 'Recolha de inventário gerada com sucesso!',
          type: 'success',
        });
        router.replace(`/inventario`)
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        error.response?.data?.msg ||
        'Erro ao efetuar Recolha!, tente novamente!')
    } 
  }

  async function getAcertTypes (
    setAcertTypes: Function,
    token:any
  ): Promise<void>{
    try{
      api.get('/tipo_acerto', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((res)=>{
        setAcertTypes(res.data)
      })

    }catch(error: any){
      verifyAuthAndRequestError(error.response?.status,
        'Erro ao carregar dados, tente novamente!')
    } 
  }

  return { 
    addToCart,
    removeToCart,
    generateInventory, 
    cancelInventory,
    getInventories, 
    getInventory,
    getAcertTypes
  }
}
