import Styles from './Grid.module.css'

type GridProps = {
  children: React.ReactNode
}

export default function Grid({ children}:GridProps){
  return(
    <div className={`${Styles.gridContainer} container mb-5`}>
      <div className="row g-4">
        {children}
      </div>
    </div>
  )
}
