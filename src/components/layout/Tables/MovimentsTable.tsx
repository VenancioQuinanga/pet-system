'use client'

import { useEffect, useState } from 'react';

//Components
import {DataGrid} from '@mui/x-data-grid';
import Loader from '../Loader';

type MovimentsProps = {
  getMoviments: Function
}

export default function MovimentsTable({getMoviments}: MovimentsProps) {
  const [moviments,setMoviments] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    getMoviments(setMoviments, token)
  },[])

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'tb_product.name', headerName: 'Produto', width: 200},
    {field: 'tb_product.tb_subProduct.description', headerName: 'Descrição', width: 200},
    {field: 'quantity', headerName: 'Quantidade', width: 200},
    {field: 'tb_warehouse.description', headerName: 'Armazem', width: 200},
    {field: 'date', headerName: 'Data de movimento', width: 200}
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de movimentos</span>
      </div>
      {moviments.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={moviments}
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
      {!moviments &&(
        <div className="text-dark lead center">Sem movimentos efetuados!</div>
      )}
    </section>
  );
}
