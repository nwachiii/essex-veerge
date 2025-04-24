import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import See_review from '../properties/reviews/See_review';
import {Button} from '../../../../ui-lib/ui-lib.components';
import {formatAmountWithDecimal} from '../../../../utils/formatAmount';
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import {EmptyState} from '../../../../components/common/Table';
import TransactionDetailsDrawer from '@/components/Drawers/transactionDetails';

// NOTE: Customer equities === investments made by customer
export const CustomerEquities = ({customerInfo, refetch, customerEquities}) => {
  const {query} = useRouter();
  const transactionDrawer = useDisclosure();
  const [equityId, setEquityId] = useState();
  const [unit, setUnit] = useState();
  const [runQuery, setRunQuery] = useState(false);
  const [txnToView, setTxnToView] = useState(null);

  const [isBelowXL] = useMediaQuery('(max-width: 1280px)');
  const OpenDrawer = (item, idx) => {
    transactionDrawer.onOpen();
    setEquityId(item?.equity_id);
    setUnit(item?.unit);
    setTxnToView(customerInfo?.[idx]);
    setRunQuery(true);
  };

  return (
    <div>
      <Text mb="15px">
        <b>Portfolio</b>
      </Text>

      <Stack
        py={{md: 4, xl: 2}}
        px={4}
        minH="230px"
        maxH="550px"
        maxW="888px"
        h="fit-content"
        borderRadius="16px"
        background="#FFFFFF"
        border={{md: '0.3px solid #E5E5E5', xl: '1px solid #E5E5E5'}}
        boxShadow={{xl: '0px 4px 4px rgba(0, 0, 0, 0.02)'}}
        overflowY={'auto'}
        divider={<Divider display={{md: 'none', xl: 'flex'}} borderColor="#F5F5F5" />}
        gap={{md: '12px', xl: 0}}
      >
        {customerInfo?.length == 0 ? (
          <EmptyState description="Nothing has been purchased yet" icon={<HouseSVG />} />
        ) : (
          customerInfo?.map((propInfo, index) => (
            <Flex
              key={propInfo?.id || index}
              pt={4}
              pb={{base: 4, xl: 2}}
              gap={'28px'}
              direction={{base: 'column', md: 'row'}}
              border={{md: '0.6px solid', xl: 'none'}}
              borderColor={{md: '#E5E5E5', xl: 'none'}}
              px={{base: 4, xl: 0}}
              pr="10px"
              rounded={{base: '16px', xl: 0}}
              w="full"
            >
              <Box spacing={'19px'}>
                <Image
                  borderRadius={'14px'}
                  h={{base: '119px', xl: '214px'}}
                  w={{base: '120px', xl: '283px'}}
                  minW={{base: '120px', xl: '283px'}}
                  src={propInfo.project?.project?.photos[0]?.photo}
                  alt={propInfo.project?.project?.name}
                  objectFit="cover"
                />
              </Box>
              <Stack spacing="15px">
                <HStack justify={{xl: 'space-between'}}>
                  <Box>
                    <Text
                      fontWeight="600"
                      fontSize={{base: '13px', xl: '24px'}}
                      lineHeight={{base: '15px', xl: '30px'}}
                      color="#191919"
                    >
                      {propInfo.project?.project?.name}
                    </Text>
                    <Text
                      textTransform={'capitalize'}
                      fontWeight="400"
                      fontSize={{base: '10px', xl: '14px'}}
                      lineHeight={{base: '14px', xl: '18px'}}
                      color="#606060"
                    >
                      {propInfo?.project?.status}
                    </Text>
                  </Box>
                  <StatusCard
                    propInfo={propInfo}
                    val={
                      propInfo?.status === 'SUSPENDED' || propInfo?.status === 'TERMINATED'
                        ? propInfo?.status
                        : propInfo?.is_disputed
                          ? 'dispute'
                          : propInfo?.defaulting
                    }
                  />
                </HStack>
                <VStack w="full" align={'flex-start'} justify={'space-between'} h="full">
                  <Grid
                    w="full"
                    templateColumns={
                      propInfo?.co_owners?.length
                        ? 'repeat(4, minmax(min-content, max-content))'
                        : 'repeat(3, minmax(min-content, max-content))'
                    }
                    gap={{md: '10px', xl: '18px'}}
                    // autoFlow="column dense"
                  >
                    <GridItem>
                      <VStack h="full" spacing="7px" justifyContent="space-between" align="left">
                        <Text
                          fontWeight="400"
                          fontSize={{base: '9px', lg: '12px'}}
                          lineHeight={{base: '12px', lg: '15px'}}
                          color="#606060"
                        >
                          {`${propInfo?.defaulting == 'Fractional' ? 'Fractional' : (propInfo?.project?.payment_plan ?? 'Outright')} price`}
                        </Text>
                        <Text
                          fontWeight="500"
                          whiteSpace="break-spaces"
                          wordBreak="break-all"
                          fontSize={{base: '10px', lg: '14px'}}
                          lineHeight={{base: '14px', lg: '18px'}}
                          color="#191919"
                        >
                          {propInfo?.defaulting == 'Fractional'
                            ? formatAmountWithDecimal(propInfo?.total_paid)
                            : formatAmountWithDecimal(propInfo?.offer_price)}
                        </Text>
                      </VStack>
                    </GridItem>

                    {propInfo?.defaulting !== 'Fractional' &&
                      propInfo?.current_outstanding_balance !== '0.00' && (
                        <GridItem>
                          <VStack
                            spacing="7px"
                            h="full"
                            justifyContent="space-between"
                            align="left"
                          >
                            <Text
                              fontWeight="400"
                              fontSize={{base: '9px', lg: '12px'}}
                              lineHeight={{base: '12px', lg: '15px'}}
                              color="#606060"
                            >
                              Outstanding balance
                            </Text>
                            <Text
                              display={'flex'}
                              gap="10px"
                              fontWeight="500"
                              whiteSpace="break-spaces"
                              wordBreak="break-all"
                              fontSize={{base: '10px', lg: '14px'}}
                              lineHeight={{base: '14px', lg: '18px'}}
                              color="#191919"
                            >
                              {formatAmountWithDecimal(propInfo?.current_outstanding_balance)}
                            </Text>
                          </VStack>
                        </GridItem>
                      )}
                    {propInfo?.defaulting !== 'Fractional' && (
                      <GridItem>
                        <VStack h="full" justifyContent="space-between" spacing="7px" align="left">
                          <Text
                            fontWeight="400"
                            fontSize={{base: '9px', lg: '12px', xl: '12px'}}
                            lineHeight={{base: '12px', lg: '15px', xl: '15px'}}
                            color="#606060"
                          >
                            Unit type
                          </Text>
                          <Text
                            fontWeight="500"
                            noOfLines={1}
                            whiteSpace="break-spaces"
                            wordBreak="break-all"
                            fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                            lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                            color="#191919"
                          >
                            {propInfo?.unit_type}
                          </Text>
                        </VStack>
                      </GridItem>
                    )}
                    {/* {propInfo?.project?.payment_plan && (
                      <VStack spacing="7px" 
                      h="full" justifyContent="space-between" align="left">
                        <Text fontWeight="400"     fontSize={{base: '9px', lg: '12px'}}
                        lineHeight={{base: '12px', lg: '15px'}} color="#606060">
                          Payment
                        </Text>
                        <Text fontWeight="500"      fontSize={{base: '10px', lg: '14px'}}
                        lineHeight={{base: '14px', lg: '18px'}} color="#191919">
                          {propInfo?.project?.payment_plan}
                        </Text>
                      </VStack>
                    )} */}
                    {propInfo?.defaulting !== 'Fractional' && (
                      <GridItem>
                        <VStack spacing="7px" h="full" justifyContent="space-between" align="left">
                          <Text
                            fontWeight="400"
                            fontSize={{base: '9px', lg: '12px', xl: '12px'}}
                            lineHeight={{base: '12px', lg: '15px', xl: '15px'}}
                            color="#606060"
                          >
                            Total paid
                          </Text>
                          <Text
                            fontWeight="500"
                            whiteSpace="break-spaces"
                            wordBreak="break-all"
                            fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                            lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                            color="#191919"
                          >
                            {formatAmountWithDecimal(propInfo.total_paid)}
                          </Text>
                        </VStack>
                      </GridItem>
                    )}
                    {/* {propInfo.project?.unit_size?.search('onesqm') > 0
                      ? null
                      : propInfo?.defaulting !== 'Fractional' && (
                          <VStack spacing="7px" 
                          h="full" justifyContent="space-between" align="left">
                            <Text
                              fontWeight="400"
                              fontSize="12px"
                              lineHeight="15px"
                              color="#606060"
                            >
                              Unit size
                            </Text>
                            <Text
                              fontWeight="500"
                              fontSize="14px"
                              lineHeight="18px"
                              color="#191919"
                            >
                              {`${propInfo.project?.unit_size}`}
                            </Text>
                          </VStack>
                        )} */}
                    {propInfo?.defaulting == 'Fractional' && (
                      <GridItem>
                        <VStack spacing="7px" h="full" justifyContent="space-between" align="left">
                          <Text
                            fontWeight="400"
                            fontSize={{base: '9px', lg: '12px', xl: '12px'}}
                            lineHeight={{base: '12px', lg: '15px', xl: '15px'}}
                            color="#606060"
                          >
                            Fractional Value
                          </Text>
                          <Text
                            fontWeight="500"
                            fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                            lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                            color="#191919"
                          >
                            {formatAmountWithDecimal(Number(propInfo?.total_fractions_value))}
                          </Text>
                        </VStack>
                      </GridItem>
                    )}
                    {propInfo?.defaulting == 'Fractional' && (
                      <GridItem>
                        <VStack spacing="7px" h="full" justifyContent="space-between" align="left">
                          <Text
                            fontWeight="400"
                            fontSize={{base: '9px', lg: '12px', xl: '12px'}}
                            lineHeight={{base: '12px', lg: '15px', xl: '15px'}}
                            color="#606060"
                          >
                            Total Fractions
                          </Text>
                          <Text
                            fontWeight="500"
                            fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                            lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                            color="#191919"
                          >
                            {`${propInfo?.total_fractions}`}
                          </Text>
                        </VStack>
                      </GridItem>
                    )}
                    {propInfo?.co_owned ? (
                      <GridItem>
                        <AvatarGroup size="md" max={1}>
                          {propInfo?.co_owners?.map((item, indx) => (
                            <Avatar
                              key={indx}
                              border="1px solid lightgray"
                              name={`${item?.invitee?.first_name} ${item?.invitee?.last_name}`}
                              src={item?.invitee?.avatar}
                            />
                          ))}
                        </AvatarGroup>
                      </GridItem>
                    ) : null}
                  </Grid>

                  <HStack spacing={4} justifySelf={'flex-end'}>
                    {propInfo?.is_disputed ? (
                      <Link
                        prefetch={false}
                        href={`/residents/profile/customer_equities/edit_disputed_equity/?equityId=${propInfo?.equity_id}&user=${query.userId}`}
                      >
                        <Button
                          mt={0}
                          py="0px"
                          cursor="pointer"
                          h={{md: '40px', xl: '48px'}}
                          w={{md: '120px', xl: '205px'}}
                          fontWeight={{base: 400, md: 500}}
                          border={'1px solid #4545FE'}
                          rounded="72px"
                          fontSize={{base: '12px', xl: '16px'}}
                          variant={'secondary'}
                        >
                          Edit details
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        mt={0}
                        py="0px"
                        cursor="pointer"
                        variant={'dark'}
                        h={{md: '40px', xl: '48px'}}
                        w={{md: '150px', xl: '205px'}}
                        fontWeight={{base: 400, md: 500}}
                        rounded={'72px'}
                        fontSize={{base: '12px', xl: '16px'}}
                        onClick={() => OpenDrawer(propInfo, index)}
                      >
                        View transactions
                      </Button>
                    )}
                    <See_review
                      forDispute={propInfo?.is_disputed}
                      customerEquities={customerEquities}
                      customerInfo={customerInfo}
                      feedbacks={propInfo?.feedback?.feedback}
                      equityInfo={propInfo}
                      refetch={refetch}
                    />
                  </HStack>
                </VStack>
              </Stack>
            </Flex>
          ))
        )}
      </Stack>
      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={runQuery}
        equityId={equityId}
        mainRefetch={refetch}
        userId={query?.userId}
        unit={unit}
        customerInfo={customerInfo}
        isFractionalTxn={txnToView?.total_fractions}
        isCoownership={txnToView?.co_owned}
      />
    </div>
  );
};

export default CustomerEquities;

export const StatusCard = ({val, propInfo}) => {
  let statusValue = val?.toLowerCase();
  let color =
    statusValue == 'completed'
      ? '#381E87'
      : statusValue == 'defaulting'
        ? '#FF9103'
        : statusValue == 'terminated' || statusValue == 'dispute'
          ? '#FF3636'
          : statusValue == 'not defaulting'
            ? '#08C48F'
            : statusValue == 'fractional' || statusValue == 'suspended'
              ? '#606060'
              : 'lightgray';
  let bg =
    statusValue == 'completed'
      ? 'rgba(103, 169, 210, 0.2)'
      : statusValue == 'defaulting'
        ? 'rgba(255, 145, 3, 0.1)'
        : statusValue == 'terminated' || statusValue == 'dispute'
          ? 'rgba(255, 54, 54, 0.10)'
          : statusValue == 'not defaulting'
            ? '#DBFFF5'
            : statusValue == 'fractional' || statusValue == 'suspended'
              ? '#F5F5F5'
              : '#FFFFFF';
  return (
    <HStack spacing={6}>
      <Tag
        p={{md: '6px 9px', xl: '8px 13px'}}
        w="fit-content"
        color={color}
        bg={bg}
        borderRadius="48px"
      >
        <TagLabel
          noOfLines={2}
          fontSize={{md: '10px', xl: '16px'}}
          mx="auto"
          textTransform="capitalize"
        >
          {statusValue}
        </TagLabel>
      </Tag>
    </HStack>
  );
};

export const HouseSVG = () => {
  return (
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M29.8327 30.334H3.16602C2.61935 30.334 2.16602 29.8807 2.16602 29.334C2.16602 28.7873 2.61935 28.334 3.16602 28.334H29.8327C30.3793 28.334 30.8327 28.7873 30.8327 29.334C30.8327 29.8807 30.3793 30.334 29.8327 30.334Z"
        fill="#606060"
      />
      <path
        d="M5.43311 29.3336H3.43311L3.49978 13.2936C3.49978 12.1603 4.01977 11.107 4.91311 10.4136L14.2464 3.14695C15.5664 2.12029 17.4198 2.12029 18.7531 3.14695L28.0864 10.4003C28.9664 11.0936 29.4998 12.1736 29.4998 13.2936V29.3336H27.4998V13.3069C27.4998 12.8003 27.2598 12.307 26.8598 11.987L17.5264 4.73362C16.9264 4.26696 16.0864 4.26696 15.4731 4.73362L6.13978 12.0003C5.73978 12.307 5.49978 12.8003 5.49978 13.3069L5.43311 29.3336Z"
        fill="#606060"
      />
      <path
        d="M23.1663 30.3346H9.83301C9.28634 30.3346 8.83301 29.8813 8.83301 29.3346V16.668C8.83301 15.0146 10.1797 13.668 11.833 13.668H21.1663C22.8197 13.668 24.1663 15.0146 24.1663 16.668V29.3346C24.1663 29.8813 23.713 30.3346 23.1663 30.3346ZM10.833 28.3346H22.1663V16.668C22.1663 16.1213 21.713 15.668 21.1663 15.668H11.833C11.2863 15.668 10.833 16.1213 10.833 16.668V28.3346Z"
        fill="#606060"
      />
      <path
        d="M13.833 24.668C13.2863 24.668 12.833 24.2146 12.833 23.668V21.668C12.833 21.1213 13.2863 20.668 13.833 20.668C14.3797 20.668 14.833 21.1213 14.833 21.668V23.668C14.833 24.2146 14.3797 24.668 13.833 24.668Z"
        fill="#606060"
      />
      <path
        d="M18.4995 11.001H14.4995C13.9528 11.001 13.4995 10.5476 13.4995 10.001C13.4995 9.45431 13.9528 9.00098 14.4995 9.00098H18.4995C19.0462 9.00098 19.4995 9.45431 19.4995 10.001C19.4995 10.5476 19.0462 11.001 18.4995 11.001Z"
        fill="#606060"
      />
    </svg>
  );
};
