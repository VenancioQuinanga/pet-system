'use client'

import Link from 'next/link';

// Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type InventoryProps = {
  data: any,
}

export default function InventoryTable({ data }: InventoryProps) {

  const limit = process.env.NEXT_PUBLIC_TABLE_LIMIT as any
  const columns = [
    {field: 'id', headerName: 'Id', width: 200},
    {field: 'date', headerName: 'Data', width: 500},
    {field: 'invoice_button', headerName: 'Imprimir', width: 300, renderCell: (params: any)=>{
      return (
        <Link href={`/inventario/${params.row.id}`}>
          <i className='bi bi-eye btn btn-dark'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Inventários</span>
      </div>
      {data?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={data}
            columns={columns}
            initialState={
              {
                pagination: {
                  paginationModel: {page: 0, pageSize: limit as number}
                }
              }
            }
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      ):(
        <Loader/>
      )}
      {!data &&(
        <div className="text-dark lead center">Sem produtos no momento!</div>
      )}
    </section>
  );
}
