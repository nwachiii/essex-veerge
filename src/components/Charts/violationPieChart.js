import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Box} from '@chakra-ui/react'; // Removed unused imports

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ViolationPieChart = ({
  A = 0, // Default value for robustness
  B = 0, // Default value for robustness
  C = 0, // Default value for robustness - NEW PROP
  colorA = '#dc2626',
  colorB = '#4545fe',
  colorC = '#f97316', // Default color for C - NEW PROP (Example: Orange)
  // title, // Title was commented out in the original usage, keeping it commented
  size = 96,
  thickness = '75%',
  // Allow overriding the total value if needed, otherwise calculate it
  value: valueProp,
}) => {
  // Calculate total value if not provided explicitly
  const totalValue = valueProp !== undefined ? valueProp : A + B + C;

  const data = {
    datasets: [
      {
        // Ensure data corresponds to colors: A -> colorA, B -> colorB, C -> colorC
        // Filter out zero values if you don't want them to appear in the tooltip
        data: [A, B, C].filter(val => val > 0), // Pass A, B, C - Adjusted Order & Filter
        backgroundColor: [colorA, colorB, colorC].filter((_, index) => [A, B, C][index] > 0), // Pass corresponding colors - Adjusted Order & Filter
        borderWidth: 0,
      },
    ],
  };

  // If all values filtered out are 0, handle the empty state
  const displayValue = data.datasets[0].data.length > 0 ? totalValue : 0;

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
            // Tooltip will now correctly show the value for A, B, or C
            const dataset = tooltipItem.dataset;
            const value = dataset.data[tooltipItem.dataIndex];
            // Could add logic here to show a label if needed, e.g., based on index
            return `${Intl.NumberFormat('en-US').format(value)}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box position={'relative'} h={`${size}px`} w={`${size}px`}>
      {/* Use displayValue based on filtered data for empty state check */}
      {displayValue > 0 ? (
        <Doughnut data={data} options={options} height={size} width={size} />
      ) : (
        // Empty state remains the same visually
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
            boxSize={thickness} // Use thickness for inner cutout visualization
            bg="#ffffff"
            borderRadius="full"
          />
        </Box>
      )}
      {/* The AbsoluteCenter text block remains commented out as in the original */}
      {/* <AbsoluteCenter> ... </AbsoluteCenter> */}
    </Box>
  );
};

export default ViolationPieChart;
