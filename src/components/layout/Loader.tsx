import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [ loading, setLoading ] = useState<boolean>(true);

  const override: CSSProperties = {
    animationDuration: '1.5s',  // Controla a velocidade da rotação
    border: '10px solid #0d6efd',
  };

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 10000);
  },[])

  return (
    <>
      <div className="center">
        <ClipLoader color="#0d6efd" loading={loading} size={75}  cssOverride={override}/>
      </div>
    </>
  );
};

export default Loader;
