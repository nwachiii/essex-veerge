import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {Box, Text, Skeleton} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import {Chart} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController
);

import {useQuery} from '@tanstack/react-query';
import {formatToCurrency} from 'utils/formatAmount';
import {getAccountGraphDetails} from 'apis/account';
import {GraphLoader} from '@/components/common/loaders/GraphLoader';

export const AccountApexChart = ({filterValue}) => {
  const defaultLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [labels, setLabel] = useState([]);

  const [series, setSeries] = useState([]);

  const DASHBOARD_GRAPH_OVERVIEW = useQuery(
    ['dashboard-graph-overview', filterValue],
    () => getAccountGraphDetails(filterValue),
    {
      onSuccess: res => {
        const graph_data = res?.data?.data?.graph_data;
        const series = [
          {
            label: 'In-flow',
            backgroundColor: '#12D8A0',
            data: graph_data ? graph_data?.map(item => item?.data?.credit) : [],
            barThickness: 3,
            inflateAmount: 1,
            type: 'bar',
          },
          {
            label: 'Out-flow',
            inflateAmount: 1,
            barThickness: 3,
            type: 'bar',
            backgroundColor: '#FF6A6A',
            data: graph_data ? graph_data?.map(item => item?.data?.debit) : [],
          },
        ];

        const options = graph_data
          ? graph_data?.map(item => (typeof item?.name == 'string' ? item?.name : item?.name))
          : defaultLabel.map(item => item);

        setSeries(series);
        setLabel(options);
      },
    }
  );

  useEffect(() => {
    DASHBOARD_GRAPH_OVERVIEW?.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const options = {
    responsive: true,
    animation: {
      duration: 1200,
      delay: 50,
      easing: 'easeInOutSine',
    },
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.parsed.y || '';

            if (label || label >= 0) {
              return formatToCurrency(label);
            }
            return label;
          },
        },
      },
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        display: false,
        ticks: {
          callback: function (value, index, values) {
            return;
          },

          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          autoSkip: true,
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
          noData: {
            text: 'no data available',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '14px',
              fontFamily: undefined,
            },
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: series,
  };

  return (
    <Box flex={`1`} alignItems="flex-end" justifyItems="flex-end" id="chart" maxW="550px" w="100%">
      {DASHBOARD_GRAPH_OVERVIEW?.isFetching ? (
        <GraphLoader height="100%" justifyContent="end" pb="0px" />
      ) : (
        <Chart type="bar" data={data} height="139px" width="100%" options={options} />
      )}
    </Box>
  );
};
export default AccountApexChart;
