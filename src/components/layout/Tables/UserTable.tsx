'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Components
import {DataGrid} from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type UserTableProps = {
  users: any
}

export default function UserTable({users}: UserTableProps) {

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Nome', width: 200},
    {field: 'email', headerName: 'Email',width: 200},
    {field: 'tb_telephone.telephone', headerName: 'Telefone', width: 200},
    {field: 'tb_gender.gender', headerName: 'Gênero', width: 200},
    {field: 'function', headerName: 'Função', width: 200},
    {field: 'edit_button', headerName: 'Editar', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/usuarios/${params.row.id}`}>
          <i className='bi bi-pencil btn btn-primary'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de usuários</span>
      </div>
      {users?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={users}
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
      {!users &&(
        <div className="text-dark lead center">Sem usuários cadastrados!</div>
      )}
    </section>
  );
}
