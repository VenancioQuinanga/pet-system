'use client'

import Image from 'next/image'
import Styles from './Navbar.module.css'
import  Link  from 'next/link'
import SideBar from './SideBar'

//Images
import menu from '../../../assets/img/icons/menu-hamburguer.png'
import avatar from '../../../assets/img/usuarios/user.jpg'
 
function Navbar() {
  
  function toogle_navbar(): void {
    const aside: any = document.querySelector(".dropDown")
    const main: any = document.querySelector("main.main")

    if (aside.style.display == "block") {
      aside.style.display = "none"
      main.style.marginLeft = "0px"
  
    } else{
  
      aside.style.display = "block"
      main.style.marginLeft = "255px"
    }
    
  }
  
  return (
    <header>
      <nav id={Styles.navbar}>
        <div>
          <ul></ul>
        </div>
        <ul>
          <li>
            <a>
              <Image 
               src={menu} 
               alt='Menu hamburguer' 
               className="first-closer" 
               id={Styles.menuButton}
               onClick={toogle_navbar}
              />
            </a>
          </li>
          <li>
            <Image
              src={avatar} 
              alt='Avatar' 
              className='border-full mb-1' 
              width="50"
              height="50" 
              id="icon"
            />  
          </li>
        </ul>
      </nav>
      <SideBar/>
    </header>
  )
}

export default Navbar
