'use client'

import styles from './ProductsToSaleTable.module.css'

// Components
import InputButton from '../../form/InputButton';

//Interface
import { ProductInterface } from '@/src/interfaces/others/ProductInterface';

type ProductProps = {
  products: ProductInterface[],
  setProducts: Function,
  removeItem: Function
}

export default function ProductsToInventoryTable({products, setProducts, removeItem}:ProductProps) {

  return (
    <section className={`${styles.shop_card} profile`}>
      <table className="table table-lg table-responsive">
        <thead>
          <tr>
            <th className={`${styles.th_title} bg-primary text-light`}>Id</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Descrição</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Preço</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Quantidade</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Tipo de Acerto</th>
            <th className={`${styles.th_title} bg-primary text-light`}>Remover</th>
          </tr>
        </thead>
        <tbody className={styles.font_frank}>
          {products.length !== 0 &&
            products?.map((product:any) => (
              <tr key={product.fk_product}>
                <td className={`text-dark`}>{product?.fk_product}</td>
                <td className={`text-dark`}>{product?.description}</td>
                <td className={`text-dark`}>{`${product?.price},00 kzs`}</td>
                <td className={`text-dark`}>{product?.quantity}</td>
                <td className={`text-dark`}>{product?.acert_type}</td>
                <td>
                  <InputButton
                    name='remove_button'
                    className='btn btn-danger'
                    value={<i className="bi bi-trash"></i>}
                    event={()=> removeItem(setProducts, product?.id)}
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
