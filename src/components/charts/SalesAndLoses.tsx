"use client";

import React from 'react';
import { Chart } from 'react-google-charts';

type SalesAndLosesType = {
  totSales: number,
  totLoses: number

}
const SalesAndLoses: any = ({totSales, totLoses}:SalesAndLosesType) => {
  const data = [
    ['Tarefa', 'Horas por Dia'],
    ['Total vendas', totSales],
    ['Total perdas', totLoses],
  ];

  const options = {
    title: 'Vendas e perdas',
    pieHole: 0.4, // Faz um buraco no meio para formar o Donut Chart
    colors: ['#0d6efd', '#6c757d'], // Cores personalizadas
  };

  return (
    <>
      {data?.length > 1 && (
        <Chart
          chartType="PieChart"
          width="auto"
          height="400px"
          data={data}
          options={options}
        />
      )}
      {data?.length === 1 &&(
        <div className="text-dark lead center mb-3">Sem registros encontrados!</div>
      )}
    </>
  );
};

export default SalesAndLoses;
