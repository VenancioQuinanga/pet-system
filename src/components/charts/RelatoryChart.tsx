// components/PieChart.tsx
"use client";

import React from 'react';
import { Chart } from 'react-google-charts';

// Components
import Loader from '../layout/Loader';

type pieaChartType = {
  data: {
    users?: number, provisioners?: number, products?: number
  }
}

const RelatoryChart: React.FC<pieaChartType> = ({data}) => {

  const datas = [
    ['Categoria', 'Quantidade'],
    ['Usuários', data.users],
    ['Fornecedores', data.provisioners],
    ['Produtos', data.products],
  ];

  const options = {
    title: 'Relatório do sistema',
    colors: ['#0d6efd', '#181818', '#6c757d'], // Cores personalizadas
  };

  return (
    <>
      {datas?.length > 1 ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={datas}
          options={options}
        />
      ):(
        <Loader/>
      )}
      {datas?.length === 1 &&(
        <div className="text-dark lead center mb-3">Sem registros encontrados!</div>
      )}
    </>
  );
};

export default RelatoryChart;
