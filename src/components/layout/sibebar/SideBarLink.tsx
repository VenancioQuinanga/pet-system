import { usePathname } from 'next/navigation';
import Link from 'next/link';

type SideBarLink = {
  name: string;
  link: string;
  icon: string;
  event?: any;
};

export default function SideBarLink({ name, link, icon, event }: SideBarLink) {
  // Obtém o caminho atual da URL
  const pathname = usePathname();

  return (
    <>
      <li 
        className={pathname === `/${link}` ? 'bg-primary text-light' : 'myHidden'}
        onClick={event}
      >
        <Link 
          href={link !== '' ? `/${link}` : '#'}
          className={pathname === `/${link}` ? 'text-light' : 'text-secondary'}
        >
          <i className={icon}></i>
          <span>{name}</span>
        </Link>
      </li>
    </>
  );
}
