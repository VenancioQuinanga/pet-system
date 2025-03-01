'use client'

import { useEffect, useRef, useState } from 'react';

// Components
import Styles from '@/src/components/layout/Invoice.module.css'
import Loader from '@/src/components/layout/loader/Loader';
import customDate from '@/src/components/validators/customDate';

// Hooks
import useProductActions from '@/src/hooks/useProductActions';

// Utils
import Authentication from '@/src/utils/auth/Authentication';

export default function ProductsInvoicePage() {  
  const [isLoading, setIsLoading] = useState(true)
  const { getProducts } = useProductActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [productsData, setProductsData] = useState<any[]>([])
  const [invoice, setInvoice] = useState<any>({})
  const [size, setSize] = useState<string>('A4')

  useEffect(() => {
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      const invoiceData: any = localStorage.getItem('invoice')
      const sizeData: any = localStorage.getItem('size')
      await setSize(JSON.parse(sizeData))
      await setInvoice(JSON.parse(invoiceData))
      await getProducts(setProductsData, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handlePrint = () => {
    if (printRef.current) {
      // Define o tamanho antes da impressão
      const invoiceElement = printRef.current;
      if (size === 'A4') {
        invoiceElement.style.width = '210mm';
        invoiceElement.style.height = '297mm';
        invoiceElement.style.textAlign = 'left';
        invoiceElement.style.marginLeft = '-2em';
        invoiceElement.style.visibility = 'hidden';
      } else if (size === 'A6') {
        invoiceElement.style.width = '105mm';
        invoiceElement.style.height = '148mm';
        invoiceElement.style.textAlign = 'left';
        invoiceElement.style.marginRight = '4em';
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
  };

  const tot = productsData.reduce((sum: any, product: any) =>
     sum += Number(product?.price * product?.['tb_stock.quantity']), 0)

  return (
    <>
      <Authentication>
        {!isLoading ? (
          <div className={Styles.invoice_container}>
            {invoice?.data && (
              <div ref={printRef} className={`${Styles.invoice}`}>
                <h1 className={Styles.invoice_title}>{process.env.NEXT_PUBLIC_ENTERPRISE_NAME}</h1>
                <div className="center">
                  <p>Contacto: {process.env.NEXT_PUBLIC_ENTERPRISE_CONTACT}</p>
                  <p>{process.env.NEXT_PUBLIC_ENTERPRISE_ADDRESS}</p>
                  <p>Contribuente: {process.env.NEXT_PUBLIC_ENTERPRISE_NIF}</p>
                </div>
                <hr/>
                <p><strong>Data:</strong> {customDate(invoice?.data?.createdAt)}</p>
                <p><strong>Fatura Recibo:</strong> {invoice?.data?.code}</p>
                <p><strong>Endereço:</strong> Luanda</p>
                <hr/>
                <table className={`${Styles.invoice_table}`}>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                      <th>Unidade</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData &&
                      (productsData?.map((product: any, index: any) => (
                      <tr key={index}>
                        <td>{product?.['tb_subProduct.description']}</td>
                        <td>{product?.['tb_stock.quantity']}</td>
                        <td>{product?.['tb_stock.unity']}</td>
                        <td>{product?.['price']} Kzs</td>
                      </tr>
                    )))
                    }
                    {productsData?.length < 1 &&
                    <div className="text-dark font-weight-bold center">Sem produtos encontrados!</div>
                    }
                  </tbody>
                </table>
                  <h3 className={Styles.tot_payment}>Total: {tot} Kzs</h3>
                  <hr/>
                <div className="center">
                  <p>Os bens/serviços foram colacados a disposição do cliente em {customDate(invoice?.data?.createdAt)}</p>
                  <p><strong>Obrigado. volte sempre...</strong></p>
                </div>
                <button onClick={handlePrint} className={Styles.print_button}>Imprimir Fatura</button>
              </div>
            )}
            {!invoice?.data && (
              <div className="text-dark lead center">Erro ao carregar dados da fatura!</div>
            )}
          </div>   
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
};
