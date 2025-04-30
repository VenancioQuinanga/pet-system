'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Components
import Styles from '@/src/components/layout/Invoice.module.css'
import Loader from '@/src/components/layout/loader/Loader';

// Validators
import formatNumber from "@/src/components/layout/grid/validators/number";
import NumberToWords from '@/src/components/validators/numberToWords';

// Hooks
import useProductActions from '@/src/hooks/useProductActions';
import useAuth from '@/src/hooks/useAuth';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function NormalInventoryPage() {  
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getProducts } = useProductActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [productsData, setProductsData] = useState<any[]>([])
  
  useEffect(() => {
    const fetchData = async()=>{
      const token = await localStorage.getItem('token')

      const sizeData: any = await localStorage.getItem('size')
      await checkUserByToken(setUser, token as string)
      await getProducts(setProductsData, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handlePrint = () => {
    if (printRef.current) {
      // Define o tamanho antes da impressão
      const invoiceElement = printRef.current;
      invoiceElement.style.width = '210mm';
      invoiceElement.style.height = '297mm';
      invoiceElement.style.textAlign = 'left';
      invoiceElement.style.marginLeft = '-11em';
      invoiceElement.style.visibility = 'hidden';
      
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
          <AdminProtected is_admin={user?.is_admin}>
            <div className="container">
              <div className="row">
                <div className={`${Styles.invoice_container} mt-0 `}>
                  {productsData && (
                    <div ref={printRef} className={`${Styles.invoice} mt-0`}>
                      <Image
                        src='/tecangola.jpg'
                        alt='tecangola'
                        width={200}
                        height={150}
                        className="mb-3"
                      />
                      <h3><strong className={`${Styles.invoice_title} mt-0 mb-0`}>{process.env.NEXT_PUBLIC_ENTERPRISE_NAME}</strong></h3>
                      <div className="d-flex mb-5">
                        <div className='me-auto'>
                          <p className='mt-0 mb-0'>{process.env.NEXT_PUBLIC_ENTERPRISE_ADDRESS}</p>
                          <p className='mt-0 mb-0'><strong>Contribuente:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_NIF}</p>
                          <p className='mt-0 mb-0'><strong>Tel:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_TEL}</p>
                          <p className='mt-0 mb-0'><strong>Email:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_EMAIL}</p>
                          <p className='mt-0 mb-0'><strong>Site:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_WEBSITE}</p>
                        </div>
                      </div>

                      <table className={`${Styles.invoice_table} p-5 mt-5 invoice-border-top`}>
                        <thead className='pt-5'>
                          <tr>
                            <th>CÓDIGO</th>
                            <th>DESCRIÇÃO</th>
                            <th>P.UNIT.</th>
                            <th>QTD</th>
                            <th>UNID.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsData &&
                            (productsData?.map((product: any, index: any) => (
                            <>
                              <tr key={product?.['id']} className='min-border-bottom'>
                                <td>{product?.['id']}</td>
                                <td>{product?.['tb_subProduct.description']}</td>
                                <td>{formatNumber(product?.['price'])}</td>
                                <td>{product?.['tb_stock.quantity']}</td>
                                <td>{product?.['tb_stock.unity']}</td>
                              </tr>
                            </>
                          )))
                          }
                          {productsData.length < 1 &&
                            <div className="text-dark font-weight-bold center">Sem produtos encontrados!</div>
                          }
                        </tbody>
                      </table>
                      <div className="d-flex gap-5 mt-5">
                        <div className="me-auto w-50">
                          <table className={Styles.invoice_table}>
                            <thead>
                              <tr>
                                <th className='invoice-border-bottom'>TAXA</th>
                                <th>BASE</th>
                                <th>IVA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>0%</td>
                                <td>{tot ? formatNumber(tot) : 0.00}</td>
                                <td>0.00</td>
                              </tr>
                            </tbody>
                          </table>
                        <div className="mt-5 pt-5">
                          <small><strong>Aos cuidados de:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_NAME} </small>
                          <small className='d-block'><strong>Doc. impresso por:</strong> {process.env.NEXT_PUBLIC_ENTERPRISE_NAME} </small>
                        </div>
                        </div>
                        <div className="w-50 pe-5">
                          <h2 className="invoice-border-bottom ms-auto">SUMÁRIO</h2>
                          <div className={`${Styles.tot_payment} d-flex`}>
                            <strong>TOTAL ILÍQUIDO:</strong> <span className="ms-auto">{`${tot ? formatNumber(tot) : 0.00}`}</span>
                          </div>
                          <div className={`${Styles.tot_payment} d-flex pt-4 invoice-border-top`}>
                            <strong className='me-auto'>TOTAL:</strong> {`${formatNumber(tot)}`}
                          </div>
                          <small className='d-block'><strong>Extenso:</strong> {NumberToWords(tot)} KWANZAS</small>
                        </div>
                      </div>
                      <hr/>
                      <button onClick={handlePrint} className={Styles.print_button}>Imprimir Inventário</button>
                    </div>
                    )}
                  {!productsData && (
                    <div className="text-dark lead center">Erro ao carregar dados!</div>
                  )}
                </div>
              </div>
            </div>
          </AdminProtected>
        ) : (
          <Loader />
        )}       
      </Authentication>
    </>
  );
};
