import { useEffect, useRef, useState } from 'react';
import Styles from '@/src/components/layout/Invoice.module.css';
import Loader from '@/src/components/layout/loader/Loader';
import useInventoryActions from '@/src/hooks/useInventoryActions';
import Authentication from '@/src/utils/auth/Authentication';

export default function InventoryPage({ params }: { params: { id: any } }) {  
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all'); // Estado para o filtro
  const { getInventory } = useInventoryActions();
  const printRef = useRef<HTMLDivElement>(null);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await localStorage.getItem('token');
      await getInventory(setProductsData, params.id, token);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Função para filtrar os produtos
  const filteredProducts = productsData.filter((product: any) => {
    if (filterType === 'positive') {
      return product.quantity > 0;
    } else if (filterType === 'negative') {
      return product.quantity < 0;
    }
    return true; // 'all'
  });

  return (
    <Authentication>
      {!isLoading ? (
        <div className="container">
          <div className="filter-options">
            <label>
              <input
                type="radio"
                value="all"
                checked={filterType === 'all'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              Todos
            </label>
            <label>
              <input
                type="radio"
                value="positive"
                checked={filterType === 'positive'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              Positivos
            </label>
            <label>
              <input
                type="radio"
                value="negative"
                checked={filterType === 'negative'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              Negativos
            </label>
          </div>
          <div className={`${Styles.invoice_container} mt-0`}>
            {filteredProducts.map((product: any) => (
              <div key={product['id']}>
                {/* Renderize os produtos aqui */}
                <p>{product['tb_product.tb_subProduct.description']} - Quantidade: {product.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Authentication>
  );
}
