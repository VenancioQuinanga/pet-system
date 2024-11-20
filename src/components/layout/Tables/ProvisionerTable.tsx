'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

//Components
import {DataGrid} from '@mui/x-data-grid';
import Loader from '../Loader';

type ProvisionerProps = {
  getProvisioners: Function
}

export default function ProvisionerTable({getProvisioners}: ProvisionerProps) {
  const [provisioners,setProvisioners] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getProvisioners(setProvisioners,token)
  },[])

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Nome', width: 250},
    {field: 'email', headerName: 'Email', width: 250},
    {field: 'tb_telephone.telephone', headerName: 'Telefone', width: 200},
    {field: 'edit_button', headerName: 'Editar', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/fornecedores/${params.row.id}`}>
          <i className='bi bi-pencil btn btn-primary'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de fornecedores</span>
      </div>
      {provisioners.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={provisioners}
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
      {!provisioners &&(
        <div className="text-dark lead center">Sem fornecedores cadastrados!</div>
      )}
    </section>
  );
}
