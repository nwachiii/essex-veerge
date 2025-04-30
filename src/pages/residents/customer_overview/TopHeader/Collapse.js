import React from 'react';
import {theme} from '../../../../theme';
import {extendTheme, Flex, Heading, Image, HStack, Text} from '@chakra-ui/react';
import {Button} from '../../../../ui-lib/ui-lib.components';
import {useRouter} from 'next/router';
import collapseIcon from '/src/images/icons/collapse.png';
import backArrow from '/src/images/icons/back-arrow.png';
import downloadIcon from '/src/images/icons/download-icon.svg';
import sortByIcon from '/src/images/icons/sort-by-icon.svg';
import {FilterByDate, FilterByStatus} from './Filters';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {fetchCustomers} from '/src/apis/customers';
import {CSVLink} from 'react-csv';
import {handleDateFormat} from '/src/utils/formatDate';
import SortBy from '../../../../components/SortBy';

const styles = extendTheme({...theme});

const CollapseOverview = ({handleExpand, sort_params}) => {
  // const customers = useQuery(['customer-meta-data'], fetchCustomers);

  const customerOverviewData = customers?.[`page${1}`]

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i].response?.name,
          email: data[i].response?.email,
          phone: data[i].response?.phone,
          joined_date: handleDateFormat(data[i].response?.date_joined),
          status: data[i]?.response.status,
        });
    }
    return result;
  };
  const router = useRouter();
  const handleBack = () => {
    router.back(-1);
  };
  return (
    <HStack justify="space-between" w="1284px" pt={0} px={10}>
      <HStack onClick={handleBack}>
        <Image
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          width="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading {...styles.textStyles.h3}>Back</Heading>
      </HStack>
      <Flex justify="flex-end" gap="11px" w="full" align="center">
        <Button h="48px" variant="primary" onClick={handleExpand}>
          <Image alt="" src={collapseIcon.src} styles={{marginRight: '5px'}} width="20px" />{' '}
          collapse
        </Button>
        <CSVLink data={getDataFromJSON(customerOverviewData?.data)}>
          <Button
            variant="primary"
            display="flex"
            gap="3px"
            w="177px"
            height="46px"
            border="1px solid #4545FE"
            borderRadius="12px"
            fontWeight="500"
            fontSize="12px"
            lineHeight="15px"
            textAlign="center"
            color="#4545FE"
            bg="transparent"
          >
            <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
            Download as CSV
          </Button>
        </CSVLink>
        {/* <Button variant='primary' bg='transparent' fontWeight='400' fontSize='14px' lineHeight='18px' color='#191919' display='flex' gap='3px' width='144px' height='48px' border='1px solid #E4E4E4' borderRadius='12px'>
					<Image w='18px' h='18px' src={sortByIcon.src} alt='' /> Sort By
				</Button> */}
        <SortBy sort_params={sort_params} />
      </Flex>
    </HStack>
  );
};

export default CollapseOverview;
