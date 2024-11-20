'use client'

import { useEffect, useState } from 'react';

// Components
import {DataGrid} from '@mui/x-data-grid';
import Loader from '../Loader';

type Sales_productsProps = {
  id:number,
  getSale: Function,
}

export default function SalesProductsTable({ id, getSale}: Sales_productsProps) {
  const [salesProducts,setSalesProducts] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getSale(setSalesProducts, id, token)
  },[])

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'tb_product.name', headerName: 'Nome', width: 200},
    {field: 'tb_product.tb_subProduct.description', headerName: 'Descrição', width: 200},
    {field: 'quantity', headerName: 'Quantidade', width: 100},
    {field: 'tb_product.purchase_price', headerName: 'Preço de compra', width: 200},
    {field: 'tb_product.price', headerName: 'Preço de venda', width: 200},
    {field: 'tb_product.tb_type.type', headerName: 'Tipo', width: 200},
    {field: 'tb_product.tb_family.family', headerName: 'Família', width: 200},
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Detalhes da compra</span>
      </div>
      {salesProducts.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={salesProducts}
            columns={columns}
            initialState={
              {
                pagination:{
                  paginationModel:{page:0,pageSize:5}
                }
              }
            }
            pageSizeOptions={[5,10]}
            checkboxSelection
          />
        </div>
      ):(
        <Loader/>
      )}
      {!salesProducts &&(
        <div className="text-dark lead center">Sem detalhes da venda no momento!</div>
      )}
    </section>
  );
}
