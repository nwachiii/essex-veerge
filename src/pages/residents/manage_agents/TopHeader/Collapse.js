import React from 'react';
import {extendTheme, Flex, Heading, HStack, Text, Image} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import collapseIcon from '/src/images/icons/collapse.png';
import backArrow from '/src/images/icons/back-arrow.png';
import {FilterByDate, FilterByStatus} from './Filters';
import {theme} from '../../../../theme';
import {Button} from '../../../../ui-lib/ui-lib.components';
import SortBy from '../../../../components/SortBy';

const styles = extendTheme({...theme});

const CollapseOverview = ({handleExpand, sort_params}) => {
  const router = useRouter();
  const handleBack = () => {
    router.back(-1);
  };
  return (
    <HStack justify="space-between" pt="60px">
      <HStack>
        <Image
          onClick={handleBack}
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          width="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading {...styles.textStyles.h3} fontSize="24px">
          Agents
        </Heading>
      </HStack>
      <Flex justify="flex-end" w="full" align="center">
        <HStack spacing={6} align="center" h="48px">
          {/* <Text>Showing 10 of 120</Text> */}
          <Button h="48px" mb={3} variant="primary" onClick={handleExpand}>
            <Image alt="" src={collapseIcon.src} styles={{marginRight: '5px'}} width="20px" />{' '}
            collapse
          </Button>
          {/* <FilterByStatus /> */}

          <SortBy sort_params={sort_params} />
          <FilterByDate />
        </HStack>
      </Flex>
    </HStack>
  );
};

export default CollapseOverview;
