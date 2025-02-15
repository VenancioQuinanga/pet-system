'use client'

import Image from 'next/image'

// Components
import Styles from '../../Navbar/Navbar.module.css'
import SideBarLink from '../SideBarLink'

// Hooks
import useAuth from '@/src/hooks/useAuth'

export default function AdminSideBar() {
  const { logout } = useAuth()

  return (
    <>
      <aside>
        <nav id={Styles.dropdown} className='dropDown'>
          <div>
            <Image
              src='/favicon.png'
              alt='logo'
              width={90}
              height={90}
              className={`${Styles.logo} bg-primary p-1`}
            />
            <h2 className={`${Styles.logo_title} text-dark`}>Gest-Vet</h2>
          </div>
          <ul>
            <SideBarLink name='Dashboard' link='dashboard' icon='bi bi-grid' />
            <SideBarLink name='Clientes' link='clientes' icon='bi bi-tag' />
            <SideBarLink name='Usuarios' link='usuarios' icon='bi bi-people' />
            <SideBarLink name='Produtos' link='produtos' icon='bi bi-tag' />
            <SideBarLink name='Vendas' link='vendas' icon='bi bi-bag-check' />
            <SideBarLink name='Armazens' link='armazens' icon='bi bi-tag' />
            <SideBarLink name='Relatorios' link='relatorios' icon='bi bi-clipboard-data' />
            <SideBarLink name='Fornecedores' link='fornecedores' icon='bi bi-person' />
            <SideBarLink name='Logout' link='#' icon='bi bi-box-arrow-right' event={logout}/>
          </ul>
        </nav>
      </aside>
    </>
  );
}
