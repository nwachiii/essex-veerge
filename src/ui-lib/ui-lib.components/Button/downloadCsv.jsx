import {Button, Image, Tooltip} from '@chakra-ui/react';
import React from 'react';
import {CSVLink} from 'react-csv';
import downloadIcon from '/src/images/icons/download-icon.svg';

const DownloadCsv = ({data, isTableValid = true}) => {
  return (
    <CSVLink data={data}>
      <Tooltip
        placeContent="center"
        px="5.2px"
        h="29.6px"
        bg="black"
        borderRadius="3.62px"
        label="Download as CSV"
      >
        <Button
          display="flex"
          bg="#ffffff"
          p="10px"
          justifyContent="center"
          alignItems="center"
          border="0.5px solid #e4e4e4"
          boxSize="36px"
          _hover={{
            bg: 'rgba(0,0,0,0.1)',
            borderColor: '#919191',
            img: {filter: 'grayscale(100%)'},
          }}
          minW="36px"
          borderRadius="8.12px"
          isDisabled={!isTableValid}
        >
          <Image w="18px" h="18px" src={downloadIcon.src} alt="download csv icon" />
        </Button>
      </Tooltip>
    </CSVLink>
  );
};

export default DownloadCsv;
