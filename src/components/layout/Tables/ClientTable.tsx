'use client'

import Link from 'next/link';

// Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type ClientTableProps = {
  clients: any
}

export default function ClientTable({clients}: ClientTableProps) {

  const limit = process.env.NEXT_PUBLIC_TABLE_LIMIT as any
  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Nome', width: 200},
    {field: 'email', headerName: 'Email',width: 200},
    {field: 'nif', headerName: 'NIF',width: 200},
    {field: 'tb_telephone.telephone', headerName: 'Telefone', width: 200},
    {field: 'tb_gender.gender', headerName: 'Gênero', width: 200},
    {field: 'edit_button', headerName: 'Editar', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/clientes/${params.row.id}`}>
          <i className='bi bi-pencil btn btn-primary'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de clientes</span>
      </div>
      {clients?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={clients}
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
      {!clients &&(
        <div className="text-dark lead center">Sem clientes cadastrados!</div>
      )}
    </section>
  );
}
