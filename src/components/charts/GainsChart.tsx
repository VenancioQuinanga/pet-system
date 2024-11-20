import React from 'react';
import { Chart } from 'react-google-charts';

// Components
import Loader from '../layout/Loader';

type AreaChartType = {
  monthGains: Array<any>
}

const GainsChart: React.FC<AreaChartType> = ({monthGains}) => {

  const options = {
    title: 'Total de lucros',
    hAxis: {
      title: 'Mês',
      format: 'MMM dd, yyyy', // Formata a data no eixo
      gridlines: { count: 15 }, // Define o número de linhas de grade
    },
    vAxis: { title: 'Lucros' },
    legend: { position: 'bottom' },
    colors: ['#0d6efd'],
    areaOpacity: 0.7,
    lineWidth: 2,
    backgroundColor: '#fff',
    isStacked: true,
    curveType: 'function',
  };  

  return (
    <>
      {monthGains?.length > 1 ? (
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={monthGains}
          options={options}
        />
      ):(
        <Loader/>
      )}
      {monthGains?.length === 1  &&(
        <div className="text-dark lead center mb-3">Sem lucros encontrados!</div>
      )}
    </>
  );
};

export default GainsChart;
