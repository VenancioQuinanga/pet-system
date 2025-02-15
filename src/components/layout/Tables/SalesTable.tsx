'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

//Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type SalesProps = {
  sales: any
}

export default function SalesTable({ sales }: SalesProps) {

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'payment', headerName: 'Pagamento', width: 100},
    {field: 'troco', headerName: 'Troco', width: 100},
    {field: 'tb_type_payment.type', headerName: 'Tipo de pagamento', width: 200},
    {field: 'tb_user.name', headerName: 'Vendedor', width: 200},
    {field: 'tb_client.name', headerName: 'Cliente', width: 200},
    {field: 'date', headerName: 'Data de venda', width: 200},
    {field: 'edit_button', headerName: 'Detalhes', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/vendas/${params.row.id}`}>
          <i className='bi bi-eye btn btn-primary'></i>
        </Link>
      )}
    },
    {field: 'invoice_button', headerName: 'Fatura', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/vendas/${params.row.id}/fatura`}>
          <i className='bi bi-eye btn btn-dark'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de vendas</span>
      </div>
      {sales?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={sales}
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
      {!sales &&(
        <div className="text-dark lead center">Sem vendas efetuadas no momento!</div>
      )}
    </section>
  );
}
