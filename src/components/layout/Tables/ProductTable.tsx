'use client'

import Link from 'next/link';

// Components
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../loader/Loader';

type ProductProps = {
  products: any
}

export default function ProductTable({ products }: ProductProps) {

  const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Nome', width: 200},
    {field: 'tb_subProduct.description', headerName: 'Descrição', width: 200},
    {field: 'purchase_price', headerName: 'Preço de compra', width: 200},
    {field: 'price', headerName: 'Preço de venda',width: 200},
    {
      field: 'tb_stock.quantity',
      headerName: 'Quantidade em stock',
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
    {field: 'manufacturing_date', headerName: 'Data de fabricação', width: 200},
    {field: 'expiry_date', headerName: 'Data de expiração', width: 200},
    {field: 'tb_type.type', headerName: 'Tipo', width: 200},
    {field: 'tb_family.family', headerName: 'Família', width: 200},
    {field: 'tb_provisioner.name', headerName: 'Fornecedor', width: 200},
    {field: 'tb_provisioner.email', headerName: 'Email', width: 200},
    {field: 'tb_provisioner.tb_telephone.telephone', headerName: 'Telefone', width: 200},
    {field: 'edit_button', headerName: 'Editar', width: 200, renderCell: (params: any)=>{
      return (
        <Link href={`/produtos/${params.row.id}`}>
          <i className='bi bi-pencil btn btn-primary'></i>
        </Link>
      )}
    }
  ]

  return (
    <section className='mt-5'>
      <div className="lead text-primary mt-2 mb-4 center">
        <span className="display-6 font-weight-bold">Tabela de produtos</span>
      </div>
      {products?.length > 0 ? (
        <div className="custom_table">
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      ):(
        <Loader/>
      )}
      {!products &&(
        <div className="text-dark lead center">Sem produtos cadastrados!</div>
      )}
    </section>
  );
}
