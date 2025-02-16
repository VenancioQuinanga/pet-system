"use client"

// API
import api from '../utils/api'

// Components
import { useRouter } from 'next/navigation';
import { useFlashMessage } from '../context/FlashMessageContext';

// Hooks
import useAuth from './useAuth'

export default function useInvoicesActions() {
  const router = useRouter()
  const { setFlashMessage } = useFlashMessage();
  const {verifyAuthAndRequestError} = useAuth()
  
  async function addInvoice(invoice: any, token: any): Promise<void> {
    try{
      api.post(`/fatura`, invoice, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })

    } catch (error: any) {
      verifyAuthAndRequestError(error.response?.status, error.response?.data?.msg)
    }
  }

  async function addProformInvoice(invoice: any, token: any): Promise<void> {
    try {
  
      const res = await api.post(`/fatura`, invoice, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      localStorage.setItem('invoice', JSON.stringify(res.data))
      localStorage.setItem('size', JSON.stringify(invoice.size))
      setFlashMessage({ message: 'Fatura cadastrada com sucesso!', type: 'success'})
      router.replace('/produtos/fatura')
      
    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        error.response?.data?.msg
      );
    }
  }

  async function getInvoices(setInvoice: Function, token: any): Promise<void> {
    try {
      const res = await api.get('/fatura', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setInvoice(res.data);

    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }
  
  async function getInvoice(
    setInvoice: Function, 
    id: number, 
    token: any
  ): Promise<void> {
    try {
      const res = await api.get(`/fatura/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('data:', res)
      setInvoice(res.data);

    } catch (error: any) {
      verifyAuthAndRequestError(
        error.response?.status,
        'Erro ao carregar dados, tente novamente!'
      );
    }
  }

  function printInvoice(printRef: any, size: any,): void{
    if (printRef.current) {
      // Define o tamanho antes da impressão
      const invoiceElement = printRef.current;
      if (size === 'A4') {
        invoiceElement.style.width = '210mm';
        invoiceElement.style.height = '297mm';
        invoiceElement.style.textAlign = 'left';
        invoiceElement.style.marginLeft = '-10em';
        invoiceElement.style.visibility = 'hidden';
      } else if (size === 'A6') {
        invoiceElement.style.width = '105mm';
        invoiceElement.style.height = '148mm';
        invoiceElement.style.visibility = 'hidden';
      }
      
      setTimeout(() => {
        invoiceElement.style.visibility = 'visible';
        window.print();
        invoiceElement.style.width = '100%';
        invoiceElement.style.height = '100%';
        invoiceElement.style.textAlign = 'auto';
        invoiceElement.style.marginLeft = 'auto';
      }, 100);
    }
  }
  
  return { 
    addInvoice,
    addProformInvoice,
    getInvoice, 
    getInvoices,
    printInvoice
  }
}
