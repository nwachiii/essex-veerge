import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Button} from 'ui-lib';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import rescheduleIcon from '../../../images/requests/reschedule-icon.svg';
import avatar from '../../../images/avatar-12.png';

const InspectionApprovalAndRescheduling = ({children, info, dataKey, modalDisclosure}) => {
  const dummyRequest =
    dataKey === 'payment_plan'
      ? [
          {key: 'Request Date', value: info?.date},
          {key: 'Payment Type', value: info?.periodic},
          {
            key: 'Amount',
            value: info?.first_amount?.split('.')[0],
            decimal: `.${info?.first_amount?.split('.')[1]}`,
          },
          {
            key: 'Monthly Payment',
            value: info?.second_amount?.split('.')[0],
            decimal: `.${info?.second_amount?.split('.')[1]}`,
          },
        ]
      : [
          {key: 'Request Date', value: info?.date},
          {key: 'Amenity', value: info?.access},
          {key: 'Reservation Date', value: info?.date},
          {key: 'Reservation Time', value: info?.time},
        ];

  return (
    <>
      {children || (
        <HStack spacing="8px" h="40px">
          <Button
            mt={0}
            w="80px"
            h="40px"
            py="0px"
            variant="primary"
            bg="transparent"
            onClick={modalDisclosure.onOpen}
            border="1px  solid #E4E4E7"
            color="#27272A"
            borderRadius="72px"
            fontSize="14px"
            fontWeight="400"
            _hover={{
              opacity: '1',
            }}
          >
            View
          </Button>
        </HStack>
      )}
      <Drawer isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
        {' '}
        <DrawerOverlay bg="rgba(0,0,0,0.2)" />
        <DrawerContent pt="64px" w="100%" minW="450px">
          <VStack align={'stretch'} justify={'space-between'} h={'full'} w="full">
            <Box>
              <HStack
                py="12px"
                px="20px"
                justify={'space-between'}
                borderBottom={'0.5px solid #E4E4E7'}
              >
                <HStack spacing={'12px'}>
                  <ArrowBackIcon
                    onClick={modalDisclosure.onClose}
                    cursor={'pointer'}
                    fontSize={25}
                  />
                  <Text
                    color={'#18181B'}
                    fontSize="16px"
                    fontWeight="600"
                    lineHeight="140%"
                    letterSpacing="0.16px"
                  >
                    Request Details
                  </Text>
                </HStack>
                <CloseIcon onClick={modalDisclosure.onClose} cursor={'pointer'} fontSize={18} />
              </HStack>
              <Box px="20px" w="full" mt="20px">
                <Box border={'0.5px solid #E4E4E7'} p="16px" bg="#FAFAFA" borderRadius={'4px'}>
                  <HStack spacing={'8px'}>
                    <Image borderRadius={'full'} boxSize="24px" src={info.image} />
                    <Text
                      color={'#18181B'}
                      fontSize="11px"
                      fontWeight="500"
                      lineHeight="150%"
                      letterSpacing="0.33px"
                    >
                      {info?.name}
                    </Text>
                  </HStack>
                  <Text
                    mt="8px"
                    color={'#52525B'}
                    fontSize="11px"
                    fontWeight="500"
                    lineHeight="150%"
                    letterSpacing="0.33px"
                  >
                    {info?.project}
                  </Text>
                </Box>
                <VStack
                  align={'stretch'}
                  spacing={'14px'}
                  mt="16px"
                  border={'0.5px solid #E4E4E7'}
                  p="12px"
                  bg="#FAFAFA"
                  borderRadius={'4px'}
                >
                  {dummyRequest.map(request => (
                    <HStack spacing={'8px'} justify={'space-between'}>
                      <Text
                        color={'#424242'}
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.26px"
                      >
                        {request.key}
                      </Text>
                      <Text
                        color={'#27272A'}
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="150%"
                        letterSpacing="0.16px"
                      >
                        {request.value}
                        <Text as="span" color={'#A3A3A3'}>
                          {request?.decimal}
                        </Text>
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Box
                  mt="16px"
                  border={'0.5px solid #E4E4E7'}
                  py="10px"
                  px="16px"
                  bg="#FAFAFA"
                  borderRadius={'4px'}
                >
                  <Text
                    color={'#18181B'}
                    fontSize="11px"
                    fontWeight="500"
                    lineHeight="150%"
                    letterSpacing="0.33px"
                  >
                    {dataKey === 'payment_plan' ? 'Request Reason' : 'Reservation Purpose'}
                  </Text>
                  <Text
                    mt="8px"
                    color={'#52525B'}
                    fontSize="11px"
                    fontWeight="500"
                    lineHeight="150%"
                    letterSpacing="0.33px"
                    textTransform={'capitalize'}
                  >
                    {info?.inReview
                      ? `I experienced a temporary reduction in income after being
                       laid off on 28 March 2025. My new position begins on 1 June 2025,
                        but until my first paycheck 
                        I’m short on funds to cover the full assessment balance.`
                      : dataKey === 'payment_plan'
                        ? 'Job hours.'
                        : info?.for}
                  </Text>
                </Box>
              </Box>
            </Box>

            {info?.inReview ? (
              <Box
                w="full"
                spacing={'16px'}
                h="fit-content"
                p="20px"
                borderTop={'0.5px solid #E4E4E7'}
              >
                <HStack
                  align={'flex-start'}
                  w="full"
                  px="20px"
                  py="12px"
                  spacing={'18px'}
                  // border="1px solid #F97316"
                  bg="transparent"
                  borderRadius="full"
                  justify={'space-between'}
                >
                  <Image src={avatar.src} boxSize={'35px'} alt="info image" />
                  <VStack spacing={'6px'} align={'stretch'}>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="130%"
                      letterSpacing="0.16px"
                      color={'#27272A'}
                    >
                      <Text as="span" fontWeight="600" color={'#000'}>
                        Eric Collins
                      </Text>
                      -Payment-plan request currently in review.
                    </Text>
                    <Text as="span" fontSize={'12px'} fontWeight="300" color={'#71717A'}>
                      2 days ago
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ) : dataKey === 'payment_plan' ? (
              <HStack
                w="full"
                spacing={'16px'}
                h="fit-content"
                p="20px"
                borderTop={'0.5px solid #E4E4E7'}
              >
                <Button
                  onClick={modalDisclosure.onClose}
                  mt="0"
                  px="20px"
                  border="1px solid #E4E4E7"
                  bg="#FFF"
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="100%"
                  letterSpacing="0.16px"
                >
                  Decline
                </Button>
                <Button
                  onClick={modalDisclosure.onClose}
                  mt="0"
                  px="20px"
                  color="#fff"
                  bg="#18181B"
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="100%"
                  letterSpacing="0.16px"
                >
                  Approve
                </Button>
              </HStack>
            ) : (
              <VStack
                w="full"
                align={'stretch'}
                h="fit-content"
                p="20px"
                spacing={'12px'}
                borderTop={'0.5px solid #E4E4E7'}
              >
                <Button
                  onClick={modalDisclosure.onClose}
                  mt="0"
                  px="20px"
                  border="none"
                  color="#F97316"
                  bg="transparent"
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="100%"
                  letterSpacing="0.16px"
                  leftIcon={<Image src={rescheduleIcon.src} alt="reschedule" />}
                >
                  Reschedule
                </Button>
                <Button
                  onClick={modalDisclosure.onClose}
                  mt="0"
                  px="20px"
                  color="#fff"
                  bg="#18181B"
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="100%"
                  letterSpacing="0.16px"
                >
                  Approve
                </Button>
                <Button
                  onClick={modalDisclosure.onClose}
                  mt="0"
                  px="20px"
                  border="1px solid #E4E4E7"
                  bg="#FFF"
                  color="#EF4444"
                  borderRadius="full"
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="100%"
                  letterSpacing="0.16px"
                >
                  Decline
                </Button>
              </VStack>
            )}
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InspectionApprovalAndRescheduling;
