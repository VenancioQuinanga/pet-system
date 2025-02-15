'use client'

import Link from 'next/link';

//Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type RelatoriesProps = {
  relatories: any
}

export default function RelatoriesTable({ relatories }: RelatoriesProps) {
  
  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'start_date', headerName: 'Inicio', width: 200},
    {field: 'end_date', headerName: 'Fim', width: 200},
    {field: 'date', headerName: 'Data de criação', width: 300},
    {field: 'invoice_button', headerName: 'imprimir relatório', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/relatorios/${params.row.id}`}>
          <i className='bi bi-eye btn btn-dark'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de historicos</span>
      </div>
      {relatories?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={relatories}
            columns={columns}
            initialState={
              {
                pagination: {
                  paginationModel: {page: 0, pageSize: 5}
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
      {!relatories &&(
        <div className="text-dark lead center">Sem historicos encontrados!</div>
      )}
    </section>
  );
}
