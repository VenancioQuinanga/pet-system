'use client'

import { useEffect, useRef, useState, ChangeEvent } from 'react';

// Components
import Styles from '@/src/components/layout/Invoice.module.css'
import Loader from '@/src/components/layout/loader/Loader';
import customDate from '@/src/components/validators/customDate';

// Hooks
import useAuth from '@/src/hooks/useAuth';
import useRelatoryActions from '@/src/hooks/useRelatoryActions';

// Utils
import Authentication from '@/src/utils/auth/Authentication';
import AdminProtected from "@/src/utils/auth/Admin";

export default function ProductsInvoicePage({params}: {params: {id: any}}) {  
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { checkUserByToken } = useAuth()
  const { getRelatory, getRelatoryData} = useRelatoryActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [relatoryData, setRelatoryData] = useState<any>([])
  const [relatory, setRelatory] = useState<any>({})
  const [size, setSize] = useState<string>('A4')

  useEffect(()=>{
    const fetchData = async()=>{
      const token = localStorage.getItem('token')
      const sizeData: any = localStorage.getItem('size')
      
      await checkUserByToken(setUser, token as string) 
      await setSize(JSON.parse(sizeData))
      await getRelatory(setRelatory, params.id, token)
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

  return (
    <>
      <Authentication>
        {!isLoading ? (
          <AdminProtected is_admin={user?.is_admin}>
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
                <div className={Styles.invoice_container}>
                  {relatoryData && (
                    <div ref={printRef} className={`${Styles.invoice}`}>
                      <h1 className={Styles.invoice_title}>{process.env.NEXT_PUBLIC_ENTERPRISE_NAME}</h1>
                      <div className="center">
                        <p>Contacto: {process.env.NEXT_PUBLIC_ENTERPRISE_CONTACT}</p>
                        <p>{process.env.NEXT_PUBLIC_ENTERPRISE_ADDRESS}</p>
                        <p>Contribuente: {process.env.NEXT_PUBLIC_ENTERPRISE_NIF}</p>
                      </div>
                      <hr/>
                      <p><strong>Data:</strong> {customDate(relatory?.date)}</p>
                      <p><strong>Relatório:</strong> {relatory?.id}</p>
                      <p><strong>Endereço:</strong> Luanda</p>
                      <hr/>
                      <table className={`${Styles.invoice_table}`}>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Valor pago</th>
                            <th>Troco</th>
                            <th>Vendidos</th>
                            <th>Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {relatoryData &&
                            (relatoryData?.map((sale: any, index: any) => (
                              <tr key={index}>
                                <td>{sale?.tb_sale?.id}</td>
                                <td>{sale?.tb_sale?.payment} Kzs</td>
                                <td>{sale?.tb_sale?.troco} Kzs</td>
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
                        <h3 className={Styles.tot_payment}>Total de produtos: {relatoryData?.tot_sales_products}</h3>
                        <h3 className={Styles.tot_payment}>Total: {tot} Kzs</h3>
                        <hr/>
                      <div className="center">
                        <p>Os bens/serviços foram processados pelo sistema em {customDate(relatory?.date)}</p>
                        <p><strong>Obrigado. volte sempre...</strong></p>
                      </div>
                      <button onClick={handlePrint} className={Styles.print_button}>Imprimir Recibo</button>
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
