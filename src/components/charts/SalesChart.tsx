"use client";

import React from 'react';
import { Chart } from 'react-google-charts';

type salesChartType = {
  monthSales: Array<any>
}

const SalesChart: React.FC<salesChartType> = ({monthSales}) => {

  const options = {
    title: 'Vendas realizadas',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#0d6efd'],
    lineWidth: 3,
  };

  return (
    <>
      {monthSales?.length > 1 && (
        <Chart
          chartType="LineChart"
          width="auto"
          height="400px"
          data={monthSales}
          options={options}
        />
      )}
      {monthSales?.length === 1  &&(
        <div className="text-dark lead center mb-3">Sem registros encontrados!</div>
      )}
    </>
  );
};

export default SalesChart;
