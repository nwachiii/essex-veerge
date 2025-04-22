import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Box, Text} from '@chakra-ui/react';
import {data, options} from '../../../components/Charts/BarChartDashboard';
import dynamic from 'next/dynamic';
import {formatAmount} from '../../../utils';
import {getAccountGraphDetails} from '../../../apis/account';
import {useQuery} from '@tanstack/react-query';
import {GraphLoader} from '../../../components/common/loaders/GraphLoader';
import {formatAmountWithDecimal} from '../../../utils/formatAmount';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

export const LegacyDashboardApexChart = ({filterValue}) => {
  const DASHBOARD_GRAPH_OVERVIEW = useQuery(['dashboard-graph-overview', filterValue], () =>
    getAccountGraphDetails(filterValue)
  );

  const GRAPH_DATA =
    DASHBOARD_GRAPH_OVERVIEW && DASHBOARD_GRAPH_OVERVIEW?.data?.data?.data?.graph_data;

  const defaultLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    DASHBOARD_GRAPH_OVERVIEW?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const series = [
    {
      name: 'Inflow',
      data: GRAPH_DATA ? GRAPH_DATA?.map(item => item?.data?.credit) : null,
    },
    {
      name: 'Outflow',
      data: GRAPH_DATA ? GRAPH_DATA?.map(item => item?.data?.debit) : null,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 175,
      width: '100%',
      background: '#fff',
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
      toolbar: {
        show: false,
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
      categories: GRAPH_DATA
        ? GRAPH_DATA?.map(item => (typeof item?.name == 'string' ? item?.name : item?.name))
        : defaultLabel.map(item => item),
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: false,
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
          return '₦ ' + formatAmount(val);
        },
      },
      title: {
        // text: '₦ (millions)',
      },
      axisBorder: {
        show: false,
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
          return '₦ ' + formatAmount(val);
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
    <Box id="chart" w="52%" h="full">
      {DASHBOARD_GRAPH_OVERVIEW?.isFetching ? (
        <GraphLoader />
      ) : DASHBOARD_GRAPH_OVERVIEW?.data ? (
        <ReactApexChart options={options} series={series} type="bar" height={165} />
      ) : null}
    </Box>
  );
};
export default LegacyDashboardApexChart;
