import Filter from './filter';
import {CSVLink} from 'react-csv';
import React, {useState} from 'react';
import SortBy from '../../../components/SortBy';
import {Flex, HStack, Image} from '@chakra-ui/react';
import {Button} from '../../../ui-lib/ui-lib.components';
import downloadIcon from '/src/images/icons/download-icon.svg';
import DownloadCsv from 'ui-lib/ui-lib.components/Button/downloadCsv';

export const ActionBtns = ({data, noAlphabets, isTableValid, noFilter, noSortBy}) => {
  const [addedParam, setAddedParam] = useState({
    sort: '',
    param: '',
    filter: '',
  });
  const forFilter = {
    max_price: 100,
    min_price: 10,
  };
  const sort_params = ['Highest to lowest', 'Lowest to highest', 'Recently Updated', 'A-Z', 'Z-A'];
  const sort_params_two = ['Highest to lowest', 'Lowest to highest', 'Recently Updated'];
  return (
    <Flex justify="flex-end" w="full" align="center">
      <Flex justify="flex-end" w="full" align="center">
        <HStack spacing={6} align="flex-end" h="48px">
          {noSortBy ? null : (
            <SortBy
              sortFor="user_wallet"
              defaultSortValue="highest_to_lowest_balance"
              sort_params={noAlphabets ? sort_params_two : sort_params}
            />
          )}
          {/* {{noFilter ? null : (
            <Filter forFilter={forFilter} url={addedParam} setUrl={setAddedParam} />
          )} */}

          {/* <CSVLink data={data}>
            <Button
              gap="3px"
              w="177px"
              height="46px"
              display="flex"
              color="#4545FE"
              fontSize="12px"
              bg="transparent"
              fontWeight="400"
              variant="primary"
              lineHeight="15px"
              textAlign="center"
              borderRadius="12px"
              border="1px solid #4545FE"
            >
              <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
              Download CSV
            </Button>
          </CSVLink> */}
          <DownloadCsv isTableValid={isTableValid} data={data} />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default ActionBtns;
