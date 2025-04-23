import React from 'react';
import {CSVLink} from 'react-csv';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';
import {themeStyles} from '../../../../../theme';
import {handleDateFormat} from '/src/utils/formatDate';
import backArrow from '/src/images/icons/back-arrow.png';
import collapseIcon from '/src/images/icons/collapse.png';

import downloadIcon from '/src/images/icons/download-icon.svg';
import {Box, Flex, HStack, Image, Heading, Button as ChakraBtn, Stack} from '@chakra-ui/react';
import SortBy from '../../../../../components/SortBy';
import Filter from './filter';

export default function CollapsedHeader({
  handleExpand,
  sort_params,
  setAddedParam,
  addedParam,
  isDraft,
  LISTINGS_DATA,
  forFilter,
  isTableValid,
}) {
  const router = useRouter();

  const handleBack = () => {
    // router.back(-1);
    // router.back();
    handleExpand();
  };
  const getDataFromJSON = obj => {
    const result = [];
    for (var i = 0; i < obj?.length; i++) {
      const sold = obj[i]?.units_sold;
      const total = obj[i]?.total_units;
      LISTINGS_DATA &&
        result.push({
          name: obj[i]?.name,
          location: obj[i]?.location_description ?? obj[i]?.landmark,
          created_date: handleDateFormat(obj[i]?.created_at),
          total_units: total,
          remaining_units: total - sold,
        });
    }
    return result;
  };
  return (
    <Box>
      <motion.div
        className="box"
        initial={{opacity: 0.8}}
        animate={{opacity: 1}}
        transition={{
          type: 'stiff',
          duration: 0.3,
          ease: 'easeIn',
        }}
      >
        <Stack w="full" spacing="15px" justify="space-between" mt="30px" mb={4}>
          <HStack onClick={handleBack}>
            <Image
              style={{cursor: 'pointer'}}
              mr={2}
              height="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading {...themeStyles.textStyles.h3}>Listings</Heading>
          </HStack>

          <HStack spacing="10px" justify="end" flexWrap="wrap-reverse" align="flex-end" minH="48px">
            <Button h="48px" mt="0px" variant="primary" onClick={handleExpand}>
              <Image alt="" src={collapseIcon.src} styles={{marginRight: '5px'}} width="20px" />{' '}
              Collapse List
            </Button>
            {isDraft == 'listings' && (
              <CSVLink data={getDataFromJSON(LISTINGS_DATA)}>
                <ChakraBtn
                  // variant="primary"
                  display="flex"
                  gap="3px"
                  w="177px"
                  height="48px"
                  border="1px solid #4545FE"
                  borderRadius="12px"
                  fontWeight="500"
                  fontSize="12px"
                  lineHeight="15px"
                  textAlign="center"
                  color="#4545FE"
                  bg="transparent"
                  isDisabled={!isTableValid}
                  _hover={{
                    bg: 'transparent',
                  }}
                >
                  <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                  Download as CSV
                </ChakraBtn>
              </CSVLink>
            )}
            <SortBy
              setUrl={setAddedParam}
              url={addedParam}
              sortFor="listing"
              btnStyle={{
                bg: '#fff',
              }}
              sort_params={sort_params}
            />
            (
            <Filter forFilter={forFilter} url={addedParam} setUrl={setAddedParam} />)
          </HStack>
        </Stack>
      </motion.div>
    </Box>
  );
}
