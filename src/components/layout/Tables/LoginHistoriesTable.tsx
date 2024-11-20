'use client'

import { useEffect, useState } from 'react';

// Components
import {DataGrid} from '@mui/x-data-grid';
import Loader from '../Loader';

type LoginHistoriesTableProps = {
  getLoginHistories: Function
}

export default function LoginHistoriesTable({getLoginHistories}: LoginHistoriesTableProps) {
  const [loginHistories,setLoginHistories] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getLoginHistories(setLoginHistories, token)
  },[])

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'tb_user.name', headerName: 'Nome', width: 200},
    {field: 'tb_user.email', headerName: 'Email',width: 200},
    {field: 'tb_user.tb_telephone.telephone', headerName: 'Telefone', width: 200},
    {field: 'tb_user.tb_gender.gender', headerName: 'Gênero', width: 200},
    {field: 'tb_user.tb_category.category', headerName: 'Categória', width: 200},
    {field: 'date', headerName: 'Data', width: 200},
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de Logins</span>
      </div>
      {loginHistories.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={loginHistories}
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
      {!loginHistories && (
        <div className="text-dark lead center">Sem historicos encontrados!</div>
      )}
    </section>
  );
}
