import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {AbsoluteCenter, Box, Center, Text, VStack} from '@chakra-ui/react';

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ListingsPieChart = ({
  A,
  B,
  colorA = '#12b76a',
  colorB = '#f04438',
  title,

  value = A + B,
  size = 96,
  thickness = '75%',
}) => {
  const data = {
    datasets: [
      {
        data: [B, A],
        backgroundColor: [colorA, colorB],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: thickness,
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = dataset.data[tooltipItem.dataIndex];
            return `${Intl.NumberFormat('en-US').format(value)}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box position={'relative'} h={`${size}px`} w={`${size}px`}>
      {value > 0 ? (
        <Doughnut data={data} options={options} height={size} width={size} />
      ) : (
        <Box
          w="full"
          border="0.5px solid #e4e4e4"
          bg="#f9fafb"
          pos="relative"
          h="full"
          borderRadius="full"
        >
          <Box
            m=" auto"
            top="0"
            border="0.5px solid #e4e4e4"
            bottom="0"
            left="0"
            right="0"
            pos="absolute"
            boxSize="75%"
            bg="#ffffff"
            borderRadius="full"
          />
        </Box>
      )}
      {/* <AbsoluteCenter>
        <Text fontWeight="400" fontSize={fontSize} textAlign="center" mx="auto" color="#191919">
          {Intl.NumberFormat('en-US').format(value)}
        </Text>
        <Text
          w="max-content"
          mx="auto"
          fontWeight="400"
          fontSize="16.4186px"
          lineHeight="21px"
          textAlign="center"
          color="rgba(25, 25, 25, 0.6)"
          whiteSpace="normal"
        >
          {title}
        </Text>
      </AbsoluteCenter> */}
    </Box>
  );
};

export default ListingsPieChart;
