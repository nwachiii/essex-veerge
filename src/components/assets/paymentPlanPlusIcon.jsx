const {Box} = require('@chakra-ui/react');

export const PlanIcon = ({baseColor = '#4545FE', ...rest}) => {
  return (
    <Box w="32px" h="33px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.6486 4.18217H10.7792C8.00591 4.1715 5.73257 6.38083 5.66724 9.15417V23.6195C5.62057 26.3528 7.79791 28.6075 10.5326 28.6555C10.6139 28.6555 10.6966 28.6555 10.7792 28.6528H21.4299C24.1886 28.6248 26.4072 26.3782 26.4032 23.6195V11.2195L19.6486 4.18217Z"
          stroke={baseColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.2988 4.1665V8.04517C19.2988 9.9385 20.8308 11.4732 22.7242 11.4785H26.3962"
          stroke={baseColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.0577 17.7185H12.5244"
          stroke={baseColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.7926 20.985V14.4517"
          stroke={baseColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
