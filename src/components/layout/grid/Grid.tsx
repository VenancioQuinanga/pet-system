type GridProps = {
  children: React.ReactNode
}

export default function Grid({ children}:GridProps){
  return(
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        {children}
      </div>
    </div>
  )
}
