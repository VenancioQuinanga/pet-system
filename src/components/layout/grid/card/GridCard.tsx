import styles from './GridCard.module.css'

type GridCardCardProps = {
  icon: string,
  title: string,
  value: any
}

export default function GridCard({ icon, title, value}: GridCardCardProps){
  return(
    <div className="col-md-3">
      <div className={`${styles.bg_fff} d-flex align-items-center gap-2 p-3 rounded text-dark shadow`}>
        <div className={`${styles.bg_ddd} p-2 rounded`}><i className={`${icon} fs-5 p-1 text-dark`}/></div>
        <div className="d-flex flex-column">
          <label htmlFor="" className="text-center text-dark">{title}</label>
          <label htmlFor="" className="fw-bold fs-5 ms-2">{value}</label>       
        </div>
    </div>
  </div>
  )
}
