import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  VStack,
  DrawerOverlay,
  Drawer,
  Text,
  Box,
  Stack,
} from '@chakra-ui/react';
import {formatAmountWithDecimal} from 'utils';
import {useQuery} from '@tanstack/react-query';
import {fetchFractionalDividendPaymentHistory} from 'apis/listings';
import {AnimatedLoader} from '@/components/common/loaders';
import {handleDateFormat} from 'utils/formatDate';

export const PayDividendHistory = ({
  DrawerDisclosure,
  DIVIDEND_HISTORY,
  customScrollbarStyles,
  unitId,
}) => {
  const DIVIDEND_HISTORY_DATA = DIVIDEND_HISTORY?.data?.data?.data;

  return (
    <>
      <Drawer
        autoFocus={false}
        borderRadius="16px"
        onClose={DrawerDisclosure.onClose}
        isOpen={DrawerDisclosure.isOpen}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          p="0px"
          bg="#fff"
          zIndex={100}
          mt="65.12px"
          position="relative"
          minW="fit-content"
          fontFamily="Euclid Circular B"
          sx={customScrollbarStyles}
        >
          <HStack
            py="30px"
            px="25px"
            h="49.699px"
            bg="#F5F5F5"
            align="center"
            position="relative"
            justify="space-between"
            fontFamily="Euclid Circular B"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Dividend Payment History
            </Heading>
            <HStack spacing="15px">
              <VStack
                w="30px"
                h="30px"
                _hover={{
                  width: '30px',
                  height: '30px',
                }}
                align="center"
                justify="center"
                position="relative"
                borderRadius="5px"
                transition="0.3s ease-in-out"
              >
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} paddingTop="1rem" mr="2px" w="400px">
            {DIVIDEND_HISTORY?.isLoading ? (
              <AnimatedLoader />
            ) : (
              <>
                {DIVIDEND_HISTORY_DATA?.map((item, idx) => (
                  <Stack spacing="13px" key={idx}>
                    <HistoryCards data={item} />
                  </Stack>
                ))}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PayDividendHistory;

const HistoryCards = props => {
  return (
    <Stack
      borderRadius="12px"
      border="1px solid #E4E4E4"
      background="#FFF"
      width="350px"
      padding="16px 10px"
    >
      <Text color={'#191919'} fontSize="14px" fontStyle="normal" fontWeight="500">
        {props?.data?.group?.allocatio ?? 'No allocation'}
      </Text>
      <HStack h="43px" spacing="12px">
        {/* <Image boxSize={'42px'} borderRadius={'full'} src={props?.data?.paid_by?.avatar} alt="" /> */}
        <DividendHistoryIcon />
        <VStack align="flex-start">
          <Text
            color="#3D3D3D"
            fontWeight="400"
            textAlign="center"
            fontStyle="normal"
            fontSize="7.216px"
            lineHeight="normal"
          >
            Amount
          </Text>
          <Text
            color=" #4545FE"
            textAlign="center"
            fontSize="12px"
            fontStyle="normal"
            fontWeight="600"
          >
            {formatAmountWithDecimal(props?.data?.amount)}
          </Text>
        </VStack>
        <VStack align="flex-start">
          <Text
            color="#3D3D3D"
            fontWeight="400"
            textAlign="center"
            fontStyle="normal"
            fontSize="7.216px"
            lineHeight="normal"
          >
            Date
          </Text>
          <Text
            color=" #191919"
            textAlign="center"
            fontSize="12px"
            fontStyle="normal"
            fontWeight="600"
          >
            {handleDateFormat(props?.data?.created_at)}
          </Text>
        </VStack>
      </HStack>
      <Box
        mx="auto"
        width="330px"
        padding="9.429px 11.314px"
        borderRadius="6.301px"
        background="#F5F5F5"
      >
        <Text fontSize="9.429px" fontStyle="normal" fontWeight="500">
          Note
        </Text>
        <Text fontSize="9.429px" fontStyle="normal" fontWeight="300">
          {props?.data?.note}
        </Text>
      </Box>
    </Stack>
  );
};

const DividendHistoryIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
      <circle cx="21.4811" cy="21.4811" r="21.4811" fill="#4545FE" fillOpacity="0.1" />
    </svg>
  );
};
