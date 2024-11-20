'use client'

// Components
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Loader from '@/src/components/layout/Loader';
import Styles from '@/src/components/layout/Invoice.module.css'

// Hooks
import useSalesActions from '@/src/hooks/useSalesActions';
import useInvoicesActions from '@/src/hooks/useInvoicesActions';

export default function SaleInvoicePage({params}: {params: {id: any}}) {  
  const {getSale} = useSalesActions()
  const {getInvoice, printInvoice} = useInvoicesActions()
  const printRef = useRef<HTMLDivElement>(null)
  const [productsData, setProductsData] = useState<any[]>([])
  const [sales, setSales] = useState<any>({})
  const [size, setSize] = useState<string>('A4');

  useEffect(() => {
    const token = localStorage.getItem('token')
    getInvoice(setSales, params.id, token)
    getSale(setProductsData, params.id, token)
  }, [])

  const handlePrint = () => {
    printInvoice(printRef, size)
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  return (
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
        <div className={`${Styles.invoice_container}`}>
          {sales ? (
          <div ref={printRef} 
            className={`${Styles.invoice}`}>
            <h1 className={Styles.invoice_title}>Petshop Azura, LDA</h1>
            <div className="center">
              <p>Contacto: 934567456/953456574 petshopazura@gmail.com</p>
              <p>Avenida Pedro de Castro Van-Dúnem Loy</p>
              <p>Contribuente: 93006745040574</p>
            </div>
            <hr/>
            <p><strong>Data:</strong> {sales['tb_sale.date']}</p>
            <p><strong>Fatura Recibo:</strong> {sales.code}</p>
            <p><strong>Cliente:</strong> {sales['tb_sale.tb_client.name']}</p>
            <p><strong>NIF:</strong> {sales['tb_sale.tb_client.nif']}</p>
            <p><strong>Endereço:</strong> Luanda</p>
            <hr/>

            <table className={`${Styles.invoice_table}`}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {productsData &&
                  (productsData?.map((product: any, index: any) => (
                  <tr key={index}>
                    <td>{product['tb_product.tb_subProduct.description']}</td>
                    <td>{product.quantity}</td>
                    <td>{product['tb_product.price']} Kzs</td>
                  </tr>
                )))
                }
                {productsData.length < 1 &&
                <div className="text-dark font-weight-bold center">Sem produtos encontrados!</div>
                }
              </tbody>
            </table>
            <div className={Styles.tot_payment}>
              <strong>Total:</strong> {`${sales['tb_sale.payment'] - sales['tb_sale.troco']}`} Kzs
            </div>
            <div className={Styles.tot_payment}>
              <strong>Pago:</strong> {sales['tb_sale.payment']} Kzs
            </div>
            <div className={Styles.tot_payment}>
              <strong>Troco:</strong> {sales['tb_sale.troco']} Kzs
            </div>
            <hr/>
            <div className="center">
              <p>Os bens/serviços foram colacados a disposição do cliente em {sales['tb_sale.date']}</p>
              <p><strong>Obrigado. volte sempre...</strong></p>
            </div>
            <button onClick={handlePrint} className={Styles.print_button}>Imprimir Fatura</button>
          </div>
          ) : (
            <Loader />
          )}
          {!sales && (
            <div className="text-dark lead center">Erro ao carregar dados da fatura!</div>
          )}
        </div>
      </div>
    </div>
  );
};
