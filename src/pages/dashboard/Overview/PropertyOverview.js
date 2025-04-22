import React from 'react';
import {theme, themeStyles} from '../../../theme';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Button, extendTheme, Image, HStack, SimpleGrid, Stack, Text} from '@chakra-ui/react';

import propertyIcon from '/src/images/icons/listingOverviewHomeIcon.svg';
import {useRouter} from 'next/router';
import {abbrevNum} from 'utils/formatAmount';

const styles = extendTheme({...theme});

export const PropertyOverview = ({data}) => {
  const router = useRouter();
  const viewAllProperties = () => {
    router.push('/listings');
  };
  return (
    <Stack
      w={`100%`}
      h={`100%`}
      // minH="157px"
      bg="#FFFFFF"
      borderRadius="16px"
      justify="start"
      border="1px solid #e4e4e4"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      spacing={'none'}
      p="0px"
      pb="16px"
      overflow="hidden"
    >
      <HStack
        align="center"
        h="50px"
        px="16px"
        mb="20px"
        borderBottom="0.5px solid #e4e4e4"
        bg="#f9fafb"
        justify="space-between"
      >
        <HStack>
          <Image alt="" src={propertyIcon.src} width="24px" height="24px" />
          <Text>Listing Overview</Text>
        </HStack>
        <Button
          cursor={'pointer'}
          fontSize="12px"
          fontWeight="500"
          onClick={() => (data ? viewAllProperties() : null)}
          as="small"
          color={data ? themeStyles.color.primary : '#CBCBCB'}
          borderColor={themeStyles.color.primary}
          variant="ghost"
          rightIcon={<ChevronRightIcon />}
        >
          view all{' '}
        </Button>
      </HStack>
      <SimpleGrid px="16px" columns={3} spacing={2}>
        <Box {...styles.xs_Box}>
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Total
          </Text>
          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.total_project ?? 0)}
          </Text>
        </Box>
        <Box {...styles.xs_Box}>
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Available
          </Text>
          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.available_projects ?? 0)}
          </Text>
        </Box>
        <Box {...styles.xs_Box}>
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Sold Out
          </Text>
          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.sold_out ?? 0)}
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default PropertyOverview;
