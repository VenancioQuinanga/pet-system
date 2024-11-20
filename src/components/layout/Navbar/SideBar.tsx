'use client'

// Components
import Styles from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Images
import logo from '../../../assets/img/icons/logo.png'

// Hooks
import useAuth from '@/src/hooks/useAuth'

export default function SideBar() {
  
  const [Active,setActive] = useState('/')
  const {logout} = useAuth()

  const handleLinkClick = (link: string)=>{
    setTimeout(()=>setActive(link),2000)
  }

  const DoLogout = async ()=>{
    await logout()
  }

  return (
    <>
      <aside>
        <nav id={Styles.dropdown} className='dropDown'>
          <div>
            <Image 
              src={logo} 
              alt='logo' 
              className={`${Styles.logo} bg-primary`}
            />
            <h2 className={`${Styles.logo_title} text-dark`}>Pet-System</h2>
          </div>
          <ul>
            <li className={Active == '/' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/' className={Active == '/'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/')}>
               <i className="bi bi-grid"></i>
               <span>Dashboard</span>
              </Link>
            </li>
            <li className={Active == '/clientes' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/clientes' className={Active == '/clientes'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/clientes')}>
               <i className="bi bi-tag"></i>
               <span>Clientes</span>
              </Link>
            </li>
            <li className={Active == '/usuarios' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/usuarios' className={Active == '/usuarios'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/usuarios')}>
               <i className="bi bi-people"></i>
               <span>Usuários</span>
              </Link>
            </li>
            <li className={Active == '/produtos' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/produtos' className={Active == '/produtos'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/produtos')}>
               <i className="bi bi-tag"></i>
               <span>Produtos</span>
              </Link>
            </li>
            <li className={Active == '/vendas' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/vendas' className={Active == '/vendas'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/vendas')}>
               <i className="bi bi-bag-check"></i>
               <span>Vendas</span>
              </Link>
            </li>
            <li className={Active == '/armazens' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/armazens' className={Active == '/armazens'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/armazens')}>
               <i className="bi bi-tag"></i>
               <span>Armazens</span>
              </Link>
            </li>
            <li className={Active == '/relatorios' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/relatorios' className={Active == '/relatorios'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/relatorios')}>
               <i className="bi bi-clipboard-data"></i>
               <span>Relatórios</span>
              </Link>
            </li>
            <li className={Active == '/fornecedores' ? 'bg-primary text-light' : 'myHidden'}>
              <Link href='/fornecedores' className={Active == '/fornecedores'  ? 'text-light' : 'text-secondary'} onClick={()=> handleLinkClick('/fornecedores')}>
               <i className="bi bi-person"></i>
               <span>Fornecedores</span>
              </Link>
            </li>
            <li className='myHidden'>
              <a className='text-secondary' onClick={()=> DoLogout()}>
               <i className="bi bi-box-arrow-right"></i>
               <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
