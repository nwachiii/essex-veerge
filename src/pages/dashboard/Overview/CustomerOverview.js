import React from 'react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  extendTheme,
  Image,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {theme, themeStyles} from '../../../theme';

import customerIcon from '../../../images/icons/profileIcon.svg';
import {useRouter} from 'next/router';
import CustomToolTip from '../../../components/common/CustomToolTip';
import {abbrevNum} from 'utils/formatAmount';
import HoverText from '@/components/common/Hovertext/HoverText';
import HoverForPopUp from 'utils/HoverForPopUp';

const styles = extendTheme({...theme});

export const CustomerOverview = ({data}) => {
  const router = useRouter();
  const INACTIVE_TOOL_TIP_MODAL = useDisclosure();
  const ACTIVE_TOOL_TIP_MODAL = useDisclosure();
  const NEW_TOOL_TIP_MODAL = useDisclosure();
  const viewAllCustomers = () => {
    router.push('/users');
  };
  return (
    <Stack
      w="100%"
      h={`100%`}
      // minH="157px"

      bg="#FFFFFF"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      border="1px solid #e4e4e4"
      borderRadius="16px"
      justify="start"
      spacing={'none'}
      p="0px"
      pb="16px"
      // overflow="hidden"
    >
      <HStack
        align="center"
        h="50px"
        px="16px"
        mb="20px"
        borderTopRadius="16px"
        borderBottom="0.5px solid #e4e4e4"
        bg="#f9fafb"
        justify="space-between"
      >
        <HStack spacing={3}>
          <Image alt="" src={customerIcon.src} width="24px" height="24px" />
          <Text>Users Overview</Text>
        </HStack>
        <Button
          cursor={'pointer'}
          fontSize="12px"
          fontWeight="500"
          onClick={() => (data ? viewAllCustomers() : null)}
          as="small"
          color={data ? themeStyles.color.primary : '#CBCBCB'}
          borderColor={themeStyles.color.primary}
          variant="ghost"
          rightIcon={<ChevronRightIcon />}
        >
          view all
        </Button>
      </HStack>
      <SimpleGrid px="16px" columns={4} spacing={2}>
        <Box {...styles.xs_Box} w={88}>
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Total
          </Text>
          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.total_users ?? 0)}
          </Text>
        </Box>
        <Box
          {...styles.xs_Box}
          w={88}
          onMouseEnter={NEW_TOOL_TIP_MODAL.onOpen}
          onMouseLeave={NEW_TOOL_TIP_MODAL.onClose}
          position={'relative'}
          cursor={'default'}
        >
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            New
          </Text>

          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.total_new_user ?? 0)}
          </Text>

          <CustomToolTip
            mt="4rem"
            CUSTOM_TOOL_TIP_MODAL={NEW_TOOL_TIP_MODAL}
            info={'These are newly registered users who have joined within the past 30 days'}
          />
        </Box>
        <Box
          {...styles.xs_Box}
          w={88}
          onMouseEnter={ACTIVE_TOOL_TIP_MODAL.onOpen}
          onMouseLeave={ACTIVE_TOOL_TIP_MODAL.onClose}
          position="relative"
          cursor={'default'}
        >
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Active
          </Text>
          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.total_active_users ?? 0)}
          </Text>
          <CustomToolTip
            mt="4rem"
            CUSTOM_TOOL_TIP_MODAL={ACTIVE_TOOL_TIP_MODAL}
            info={'These are registered users with assets in their portfolio.'}
          />
        </Box>
        <Box
          {...styles.xs_Box}
          w={88}
          onMouseEnter={INACTIVE_TOOL_TIP_MODAL.onOpen}
          onMouseLeave={INACTIVE_TOOL_TIP_MODAL.onClose}
          position={'relative'}
          cursor={'default'}
        >
          <Text fontWeight="500" lineHeight="20px" fontSize={'14px'} color="#525252">
            Inactive
          </Text>

          <Text fontWeight="600" lineHeight="38px" fontSize={'24px'} color="#141414">
            {abbrevNum(data?.total_inactive_users ?? 0)}
          </Text>
          <CustomToolTip
            mt="4rem"
            CUSTOM_TOOL_TIP_MODAL={INACTIVE_TOOL_TIP_MODAL}
            info={'These are registered users without assets in their portfolio'}
          />
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default CustomerOverview;
