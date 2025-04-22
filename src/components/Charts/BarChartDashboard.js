import React from 'react';

import {Bar} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export const data = graphData => ({
  labels: graphData ? graphData?.deposits?.graph_data?.map(item => item.month.slice(0, 3)) : null,
  datasets: [
    {
      label: 'Deposits',
      data: graphData.deposits ? graphData.deposits.graph_data.map(item => item.amount) : null,
      width: '4px',
      backgroundColor: '#12D8A0',
    },
    {
      label: 'Withdrawals',
      data: graphData.withdrawals
        ? graphData.withdrawals.graph_data.map(item => item.amount)
        : null,
      width: '4px',
      backgroundColor: '#FF6A6A',
    },
  ],
});

export const OverviewBarChart = () => {
  return <Bar options={options} data={data} />;
};
