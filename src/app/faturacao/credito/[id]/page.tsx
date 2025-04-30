'use client'

import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';

// Components
import Loader from '@/src/components/layout/loader/Loader';
import Styles from '@/src/components/layout/Invoice.module.css'

// Validators
import customDate from '@/src/components/validators/customDate';
import formatNumber from "@/src/components/layout/grid/validators/number";
import NumberToWords from '@/src/components/validators/numberToWords';

// Hooks
import useCreditActions from '@/src/hooks/useCreditActions';
import useInvoicesActions from '@/src/hooks/useInvoicesActions';

// Utils
import Authentication from '@/src/utils/auth/Authentication';

export default function CreditInvoicePage({ params }: { params: { id: any } }) {  
  const [isLoading, setIsLoading] = useState(true)
  const { getSale } = useCreditActions()
  const {getCreditInvoice, printInvoice} = useInvoicesActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [productsData, setProductsData] = useState<any[]>([])
  const [sales, setSales] = useState<any>({})
  const [size, setSize] = useState<string>('A4');

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      
      await getCreditInvoice(setSales, params.id, token)
      await getSale(setProductsData, params.id, token)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handlePrint = () => {
    printInvoice(printRef, size)
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  return (
    <>
      <Authentication>
        {!isLoading ? (
          <div className="container">
            <div className="row invoice-form">    
              <div className="col-md-10 mt-3 m-auto">
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
              {sales && (
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
                    <div className='ms-auto mt-5 pt-4 pe-5'>
                      <strong>Exmo.(s) Sr.(s)</strong>
                      <p>{sales?.['tb_credit.tb_client.nif'] !== null ? sales?.['tb_credit.tb_client.nif'] : sales.client_nif || 'Consumidor final'}</p>
                    </div>
                  </div>

                  <strong>Fatura Crédito N.°</strong> {sales?.code}
                  <table className={`${Styles.invoice_table} invoice-border-full`}>
                    <thead className='pt-5'>
                      <tr>
                        <th>Data</th>
                        <th>Contribuente</th>
                        <th className='pe-5'>V/Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{customDate(sales?.['tb_credit.date'])}</td>
                        <td>{sales?.['tb_credit.tb_client.nif'] !== null ? sales?.['tb_credit.tb_client.nif'] : sales.client_nif || 'Consumidor final'}</td>
                        <td>{sales?.code}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className={`${Styles.invoice_table} p-5 mt-5 invoice-border-top`}>
                    <thead className='pt-5'>
                      <tr>
                        <th>CÓDIGO</th>
                        <th>DESCRIÇÃO</th>
                        <th>P.UNIT.</th>
                        <th>QTD</th>
                        <th>DESC.</th>
                        <th>SUB-TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData &&
                        (productsData?.map((product: any, index: any) => (
                          <tr key={index} className='min-border-bottom'>
                            <td>{product?.['tb_product.id']}</td>
                            <td>{product?.['tb_product.tb_subProduct.description']}</td>
                            <td>{formatNumber(product?.['tb_product.price'])}</td>
                            <td>{product?.quantity}</td>
                            <td>0.00</td>
                            <td>{formatNumber(product?.['tb_product.price'])}</td>
                          </tr>
                        )))
                      }
                      {productsData.length < 1 &&
                        <tr className="text-dark font-weight-bold center">
                          <td>Sem produtos encontrados!</td>
                        </tr>
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
                            <td>{sales?.['tb_credit.payment'] ? formatNumber(sales?.['tb_credit.payment']) : 0.00}</td>
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
                        <strong>TOTAL ILÍQUIDO:</strong> <span className="ms-auto">{`${sales?.['tb_credit.payment'] ? formatNumber(sales?.['tb_credit.payment']) : 0.00}`}</span>
                      </div>
                      <div className={`${Styles.tot_payment} d-flex`}>
                        <strong className='me-auto'>IMPOSTO/IVA:</strong> <span className="ms-auto">0.00</span>
                      </div>
                      <div className={`${Styles.tot_payment} d-flex`}>
                        <strong className='me-auto'>DESCONTO:</strong> <span className="ms-auto">0.00</span>
                      </div>
                      <div className={`${Styles.tot_payment} d-flex`}>
                        <strong className='me-auto'>TROCO(kzs):</strong> <span className="ms-auto">{sales?.['tb_credit.troco']}</span>
                      </div>
                      <div className={`${Styles.tot_payment} d-flex pt-4 invoice-border-top`}>
                        <strong className='me-auto'>TOTAL:</strong> {`${formatNumber(sales?.['tb_credit.payment'] - sales?.['tb_credit.troco'])}`}
                      </div>
                      <small className='d-block'><strong>Extenso:</strong> {NumberToWords(sales?.['tb_credit.payment'] - sales?.['tb_credit.troco'])} KWANZAS</small>
                    </div>
                  </div>
                  <hr/>
                  <button onClick={handlePrint} className={Styles.print_button}>Imprimir Fatura</button>
                </div>
                )}
                {!sales && (
                  <div className="text-dark lead center">Erro ao carregar dados da fatura!</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Authentication>
    </>
  );
};
