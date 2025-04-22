import React from 'react';
import dynamic from 'next/dynamic';
import {formatAmount} from '../../utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

export const AccountApexCharts = ({graphData}) => {
  const GRAPH__DETAILS = graphData && [...graphData].map(item => item);
  // console.log('howfar bobo', GRAPH__DETAILS);

  const series = [
    {
      name: 'Revenue',
      data: GRAPH__DETAILS ? GRAPH__DETAILS?.map(item => item?.data?.credit) : null,
    },
    {
      name: 'Withdrawal',
      data: GRAPH__DETAILS ? GRAPH__DETAILS?.map(item => item?.data?.debit) : null,
    },
  ];
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      background: '#fff',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ['#12D8A0', '#FF6A6A'],

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '14%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#FCFCFC',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: GRAPH__DETAILS ? GRAPH__DETAILS?.map(item => item?.name?.slice(0, 3)) : null,
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: val => {
          return formatAmount(val);
        },
      },
      title: {
        text: '₦ (millions)',
      },
      axisBorder: {
        show: true,
        color: '#AAA',
        offsetX: 0,
        offsetY: 0,
      },
    },
    fill: {
      opacity: 1,
      colors: ['#12D8A0', '#FF6A6A'],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '₦' + formatAmount(val) + ' million';
        },
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={230} />
    </div>
  );
};
export default AccountApexCharts;
