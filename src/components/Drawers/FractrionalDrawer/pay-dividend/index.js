import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  VStack,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Stack,
  Tooltip,
  Image,
  Box,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {toastForError} from 'utils/toastForErrors';
import {
  fetchFractionalDividendPaymentHistory,
  fetchFractionalGrouping,
  payFractionalDividend,
} from 'apis/listings';
import {AnimatedLoader} from '@/components/common/loaders';
import historyIcon from '/src/images/icons/historyIcon.svg';
import GroupBuyersView from '../view-summary/GroupBuyersDrawer';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {Button} from 'ui-lib/ui-lib.components';
import PayDividendHistory from './PayDividendHistory';
import MakeDividendPayment from './MakeDividendPayment';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const PayDividendDrawer = ({
  unitInfo,
  handleScreen,
  fractionalInfo,
  customScrollbarStyles,
  isBuildingTypeSingleFamilyResidential,
}) => {
  const FRACTIONAL_GROUPING_QUERY = useQuery(['fractional-grouping'], () =>
    fetchFractionalGrouping(`${Number(unitInfo?.id)}?purchased=true`)
  );
  const toast = useToast();
  const GroupBuyersDisclosure = useDisclosure();
  const DividendPaymentHistory = useDisclosure();
  const MakePaymentDisclosure = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState({});

  const mutation = useMutation(
    {mutationFn: formData => payFractionalDividend(formData), retry: 0},
    {
      onSuccess: async res => {
        DrawerDisclosure.onClose();
        return toast({
          render: () => <MatadorCustomToast description={'Dividend paid successfully'} />,
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        });
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const initiatePaymentOnSubmit = arg => {
    mutation.mutate(arg);
  };

  const FRACTIONAL_GROUPING_DATA =
    FRACTIONAL_GROUPING_QUERY?.data && FRACTIONAL_GROUPING_QUERY?.data?.data?.data?.length
      ? FRACTIONAL_GROUPING_QUERY?.data?.data?.data
      : [];

  const serialNumbering = arg => {
    return `${arg <= 9 ? 0 : ''}${arg}`;
  };

  const handleSelectGroup = (indx, grp, equityId) => {
    const copy = [...FRACTIONAL_GROUPING_DATA];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        setSelectedGroup({id: serialNumbering(indx + 1), group: grp, equityId: equityId});
      }
    }
    GroupBuyersDisclosure.onOpen();
  };

  // fetchFractionalDividendPaymentHistory
  const DIVIDEND_HISTORY = useQuery(['dividend-history', unitInfo?.id], () =>
    fetchFractionalDividendPaymentHistory(unitInfo?.id)
  );

  const DIVIDEND_HISTORY_DATA_LENGTH = DIVIDEND_HISTORY?.data?.data?.data.length;

  return (
    <>
      <DrawerContent
        p="0px"
        bg="#fff"
        zIndex={100}
        mt="65.12px"
        position="relative"
        minW="fit-content"
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
          <Flex gap="5px" align={'center'} onClick={handleScreen('options')} cursor="pointer">
            <Image alt="back icon" src={backIcon.src} />
            <Heading fontSize="18.9px" fontWeight="700">
              Pay Dividend
            </Heading>
          </Flex>
          <HStack spacing="15px">
            {DIVIDEND_HISTORY_DATA_LENGTH ? (
              <Tooltip
                h="29.6px"
                bg="#191919"
                label="History"
                p="7.8px 5.2px"
                fontWeight="400"
                fontSize="10.87px"
                whiteSpace="nowrap"
                aria-label="History"
                borderRadius="3.62px"
              >
                <Image
                  alt="historyIcon"
                  cursor={'pointer'}
                  src={historyIcon.src}
                  onClick={DividendPaymentHistory.onOpen}
                />
              </Tooltip>
            ) : null}
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
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>
        <DrawerBody
          sx={customScrollbarStyles}
          paddingTop="1rem"
          mr="2px"
          w="400px"
          position={'relative'}
        >
          {FRACTIONAL_GROUPING_QUERY?.isLoading ? (
            <AnimatedLoader />
          ) : FRACTIONAL_GROUPING_QUERY?.isError ? (
            err => toastForError(err, true, toast)
          ) : FRACTIONAL_GROUPING_DATA ? (
            <Stack h="82%" pr={3}>
              {FRACTIONAL_GROUPING_DATA.map((item, idx) => (
                <Box key={idx}>
                  <Flex
                    // key={idx}
                    width="350px"
                    padding="24px"
                    cursor={'pointer'}
                    alignItems="center"
                    borderRadius="8px"
                    background="#F8F8F8"
                    justify="space-between"
                    onClick={() => handleSelectGroup(idx, item?.fractional_cowners, item?.id)}
                  >
                    <Text
                      color="#191919"
                      fontSize="14px"
                      fontWeight="500"
                      fontStyle="normal"
                      lineHeight="normal"
                    >{`Unit ${serialNumbering(idx + 1)}`}</Text>
                    {isBuildingTypeSingleFamilyResidential ? null : (
                      <Text
                        color="#3D3D3D"
                        fontSize="14px"
                        fontWeight="400"
                        fontStyle="normal"
                        lineHeight="normal"
                      >
                        {item?.allocation ? item.allocation : 'Not Allocated Yet'}
                      </Text>
                    )}
                  </Flex>
                </Box>
              ))}
            </Stack>
          ) : null}
          <Button
            bottom="8%"
            color="#000"
            width="350px"
            fontWeight="400"
            fontStyle="normal"
            position="absolute"
            fontSize="14.617px"
            variant={'secondary'}
            borderRadius="9.745px"
            border="1px solid #000"
            fontFamily="Euclid Circular B"
            onClick={MakePaymentDisclosure.onOpen}
          >
            Pay All
          </Button>
        </DrawerBody>
      </DrawerContent>
      <GroupBuyersView
        isDividend
        unitInfo={unitInfo}
        handleScreen={handleScreen}
        selectedGroup={selectedGroup}
        customScrollbarStyles={customScrollbarStyles}
        DrawerDisclosure={GroupBuyersDisclosure}
      />
      <PayDividendHistory
        unitId={Number(unitInfo?.id)}
        DrawerDisclosure={DividendPaymentHistory}
        customScrollbarStyles={customScrollbarStyles}
      />
      <MakeDividendPayment
        mutation={mutation}
        paymentSource={'Everyone'}
        handleScreen={handleScreen}
        DrawerDisclosure={MakePaymentDisclosure}
        payload={{unitId: unitInfo?.id, equityId: null}}
        initiatePaymentOnSubmit={initiatePaymentOnSubmit}
      />
    </>
  );
};

export default PayDividendDrawer;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};
