'use client'

import styles from './ProductsToSaleTable.module.css'

// Components
import InputButton from '../../form/InputButton';

//Interface
import { ProductInterface } from '@/src/interfaces/others/ProductInterface';
import { SaleInterface } from '@/src/interfaces/others/SaleInterface';

type ProductProps = {
  sale: SaleInterface,
  products: ProductInterface[],
  setProducts: Function,
  removeItem: Function
}

export default function ProductsToSaleTable({sale, products, setProducts, removeItem}:ProductProps) {

  return (
    <section className={`${styles.shop_card} profile`}>
      <table className="table table-lg table-responsive">
        <thead>
          <tr>
            <th className={`${styles.th_title} bg-primary text-light`}>Nome</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Descrição</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Preço</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Quantidade</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Remover</th>
          </tr>
        </thead>
        <tbody className={styles.font_frank}>
          {
            products?.map((product:any) => (
              <tr key={product.id}>
                <td className={`text-dark`}>{product?.name}</td>
                <td className={`text-dark`}>{product?.description}</td>
                <td className={`text-dark`}>{`${product?.price},00 $`}</td>
                <td className={`text-dark`}>{product?.quantity}</td>
                <td>
                  <InputButton
                    name='remove_button'
                    className='btn btn-danger'
                    value={<i className="bi bi-trash"></i>}
                    event={()=> removeItem(setProducts, sale, product?.id)}
                  />
                </td> 
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}
