'use client'

import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';

// Components
import Styles from '@/src/components/layout/Invoice.module.css'
import Loader from '@/src/components/layout/loader/Loader';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useRelatoryActions from '@/src/hooks/useRelatoryActions';

// Validators
import customDate from '@/src/components/validators/customDate';
import formatNumber from "@/src/components/layout/grid/validators/number";
import NumberToWords from '@/src/components/validators/numberToWords';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function ProductsInvoicePage({params}: {params: {id: any}}) {  
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getRelatoryData} = useRelatoryActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [relatoryData, setRelatoryData] = useState<any>([])
  const [size, setSize] = useState<string>('A4')

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      const sizeData: any = localStorage.getItem('size')
      
      await checkUserByToken(setUser, token as string) 
      await setSize(JSON.parse(sizeData))
      await getRelatoryData(setRelatoryData, params.id, token)
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
        invoiceElement.style.marginLeft = '-11em';
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

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const tot = relatoryData?.reduce((sum: any, data: any) =>
    sum += Number(data.tb_sale.payment - data.tb_sale.troco), 0)

  const totSales = relatoryData?.reduce((sum: any, data: any) => sum + 1, 0)

  return (
    <>
      <Authentication>
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
            <div className="container">
              <div className="row invoice-form">
                <div className="col-md-10 mt-5 mb-4 m-auto">
                  <form className="p-5 profile">
                    <div className="lead text-dark mb-2 center">
                      <p>Edite o tamanho da folha</p>
                    </div>
                    <div className="d-block mb-3">
                      <label className="mt-2 text-dark font-weight-bold">Tamanho</label>
                      <select
                        name="paperSize"
                        value={size}
                        className="mt-2 text-dark bg-ccc form-control p-3"
                        onChange={handleSizeChange}>
                        <option value="A4">Folha - A4</option>
                        <option value="A6">Folha - A6</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className={`${Styles.invoice_container} mt-0 `}>
                  {relatoryData && (
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

                      <strong>Relatório N.°</strong> {relatoryData[0]?.id}
                      <table className={`${Styles.invoice_table} invoice-border-full`}>
                        <thead className='pt-5'>
                          <tr>
                            <th>Data Inicial</th>
                            <th>Data Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{customDate(relatoryData[0]?.tb_history.start_date)}</td>
                            <td>{customDate(relatoryData[0]?.tb_history.end_date)}</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className={`${Styles.invoice_table} p-5 mt-5 invoice-border-top`}>
                        <thead className='pt-5'>
                          <tr>
                            <th>CÓDIGO</th>
                            <th>VALOR PAGO</th>
                            <th>VENDIDOS</th>
                            <th>DATA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {relatoryData &&
                            (relatoryData?.map((sale: any, index: any) => (
                              <tr key={index}>
                                <td>{sale?.tb_sale?.id}</td>
                                <td>{sale?.tb_sale?.payment} Kzs</td>
                                <td>{sale?.quantity}</td>
                                <td>{ customDate(sale?.tb_sale?.date)}</td>
                              </tr>
                            )))
                          }
                          {relatoryData?.length < 1 &&
                            <div className="text-dark font-weight-bold center">Sem vendas encontrados!</div>
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
                          <div className={`${Styles.tot_payment} d-flex`}>
                            <strong className='me-auto'>IMPOSTO/IVA:</strong> <span className="ms-auto">0.00</span>
                          </div>
                          <div className={`${Styles.tot_payment} d-flex`}>
                            <strong className='me-auto'>DESCONTO:</strong> <span className="ms-auto">0.00</span>
                          </div>
                          <div className={`${Styles.tot_payment} d-flex`}>
                            <strong className='me-auto'>Total de vendas:</strong> <span className="ms-auto">{totSales}</span>
                          </div>
                          <div className={`${Styles.tot_payment} d-flex pt-4 invoice-border-top`}>
                            <strong className='me-auto'>TOTAL:</strong> {`${formatNumber(tot)}`}
                          </div>
                          <small className='d-block'><strong>Extenso:</strong> {NumberToWords(tot)} KWANZAS</small>
                        </div>
                      </div>
                      <hr/>
                      <button onClick={handlePrint} className={Styles.print_button}>Imprimir Fatura</button>
                    </div>
                  )}
                  {!relatoryData && (
                    <div className="text-dark lead center">Erro ao carregar dados do relatório!</div>
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
