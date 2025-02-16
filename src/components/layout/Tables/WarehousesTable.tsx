'use client'

import Link from 'next/link';

// Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type WarehouseProps = {
  warehouses: any
}

export default function WarehousesTable({warehouses}: WarehouseProps) {

  const limit = process.env.NEXT_PUBLIC_TABLE_LIMIT as any
  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'description', headerName: 'Descrição', width: 300},
    {
      field: 'quantity',
      headerName: 'Quantidade de Produtos',
      width: 200,
      renderCell: (params: any) => {
        const value = params.value
        return (
          <div
            style={{
              color: value <= 10 ? 'red' : 'black',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {value}
          </div>
        );
      },
    },
    {field: 'edit_button', headerName: 'Editar', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/armazens/${params.row.id}`}>
          <i className='bi bi-pencil btn btn-primary'></i>
        </Link>
      )}
    },
    {field: 'add_moviment_button', headerName: 'Realizar movimento', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/armazens/${params.row.id}/movimento`}>
          <i className='bi bi-plus-circle btn btn-dark'></i>
        </Link>
      )}
    }
  ]

  return (
    <>
      <section className='mt-5'>
        <div className="lead text-primary mt-2 mb-4 center">
          <span className="display-6 font-weight-bold">Tabela de armazens</span>
        </div>
        {warehouses?.length > 0 ? (
          <div className="custom_table">
            <DataGrid
              rows={warehouses}
              columns={columns}
              initialState={
                {
                  pagination:{
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
        {!warehouses &&(
          <div className="text-dark lead center">Sem aramzens cadastrados!</div>
        )}
      </section>
    </>
  );
}
