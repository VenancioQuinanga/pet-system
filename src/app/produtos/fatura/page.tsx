'use client'

// Components
import { useEffect, useRef, useState } from 'react';
import Loader from '@/src/components/layout/Loader';
import Styles from '@/src/components/layout/Invoice.module.css'

// Hooks
import useProductActions from '@/src/hooks/useProductActions';
import useInvoicesActions from '@/src/hooks/useInvoicesActions';

export default function ProductsInvoicePage() {  
  const {getProducts} = useProductActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [productsData, setProductsData] = useState<any[]>([])
  const [invoice, setInvoice] = useState<any>({})
  const [size, setSize] = useState<string>('A4')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const invoiceData: any = localStorage.getItem('invoice')
    const sizeData: any = localStorage.getItem('size')
    setSize(JSON.parse(sizeData))
    setInvoice(JSON.parse(invoiceData))
    getProducts(setProductsData, token)
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
     sum += Number(product.price * product['tb_stock.quantity']), 0)

  return (
    <div className={Styles.invoice_container}>
      {invoice.data ? (
      <div ref={printRef} 
        className={`${Styles.invoice}`}>
        <h1 className={Styles.invoice_title}>Petshop Azura, LDA</h1>
        <div className="center">
          <p>Contacto: 934567456/953456574 petshopazura@gmail.com</p>
          <p>Avenida Pedro de Castro Van-Dúnem Loy</p>
          <p>Contribuente: 93006745040574</p>
        </div>
        <hr/>
        <p><strong>Data:</strong> {invoice.data.createdAt}</p>
        <p><strong>Fatura Recibo:</strong> {invoice.data.code}</p>
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
                <td>{product['tb_subProduct.description']}</td>
                <td>{product['tb_stock.quantity']}</td>
                <td>{product['tb_stock.unity']}</td>
                <td>{product['price']} Kzs</td>
              </tr>
            )))
            }
            {productsData.length < 1 &&
            <div className="text-dark font-weight-bold center">Sem produtos encontrados!</div>
            }
          </tbody>
        </table>
          <h3 className={Styles.tot_payment}>Total: {tot} Kzs</h3>
          <hr/>
        <div className="center">
          <p>Os bens/serviços foram colacados a disposição do cliente em {invoice.data.createdAt}</p>
          <p><strong>Obrigado. volte sempre...</strong></p>
        </div>
        <button onClick={handlePrint} className={Styles.print_button}>Imprimir Fatura</button>
      </div>
      ) : (
        <Loader />
      )}
      {!invoice.data && (
        <div className="text-dark lead center">Erro ao carregar dados da fatura!</div>
      )}
    </div>
  );
};
