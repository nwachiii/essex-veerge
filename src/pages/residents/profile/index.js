import {useRouter} from 'next/router';
import backArrow from '../../../images/icons/back-arrow.png';
import {AnimatedLoader} from '../../../components/common/loaders/AnimatedLoader';
import {LayoutView} from '../../../components/PageLayout/LayoutView';
import {
  Heading,
  HStack,
  Stack,
  Image,
  Box,
  useToast,
  Flex,
  Center,
  VStack,
  Text,
} from '@chakra-ui/react';

import {themeStyles} from '../../../theme';
import {CustomerProperties} from './properties';
import {useQuery} from '@tanstack/react-query';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';
import {fetchOneCustomer} from '../../../apis/customers';
import {CustomerBasicInfo} from '../../../components/Customers/BasicInfo';
import PageLoader from '../../../components/PageLayout/PageLoader';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import {ChevronLeftIcon, ChevronRightIcon, SmallAddIcon} from '@chakra-ui/icons';
import {Button} from 'ui-lib/ui-lib.components';
import ralph from '../../../images/resident-profile/ralph.png';
import calling from '../../../images/resident-profile/calling.svg';
import plus from '../../../images/resident-profile/plus.svg';
import info from '../../../images/resident-profile/info.svg';
import document from '../../../images/resident-profile/document.svg';
import ppt1 from '../../../images/resident-profile/ppt1.png';

const customScroll = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  scrollbarWidth: 'none',
};
export const SingleCustomerPage = ({userId}) => {
  const router = useRouter();
  const toast = useToast();
  const UniqueCustomer = useQuery(
    ['individual-customer-profile', userId],
    async () => await fetchOneCustomer(userId)
  );
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const handleBack = () => {
    router.back(-1);
  };

  if (router.isFallback) {
    return <PageLoader />;
  }

  return (
    <Box bg="#FAFAFA" mx="auto" minH="100vh" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        activePage={'users'}
        position="relative"
        pb="40px"
      >
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <HStack justify={'space-between'}>
            <Center w="50px" h="50px" borderRadius={'full'} border={'1px solid #E4E4E7'}>
              <ChevronLeftIcon color={'#000000'} fontSize={25} />
            </Center>

            <HStack spacing={'35px'}>
              <Button
                py="16px"
                px="40px"
                bg="#000"
                color="#fff"
                borderRadius="full"
                fontSize="16px"
                fontWeight="500"
                lineHeight="140%"
                letterSpacing="0.16px"
              >
                Transaction
              </Button>
              <Button
                py="16px"
                px="40px"
                bg="#fff"
                color="#000"
                borderRadius="full"
                fontSize="16px"
                fontWeight="500"
                lineHeight="140%"
                letterSpacing="0.16px"
                border="1px solid #A3A3A3"
              >
                More Options
              </Button>
            </HStack>
          </HStack>

          <HStack w="full" mt="18px" spacing={'41.5px'} align={'flex-start'}>
            <VStack
              w="30%"
              p="16px"
              spacing={'16px'}
              align={'center'}
              bg="#fff"
              border={'0.5px solid #E4E4E4'}
              borderRadius={'16px'}
            >
              <VStack spacing={'17px'}>
                <Image w="124px" h="124px" borderRadius={'full'} src={ralph.src} />
                <Text color={'#191919'} fontSize="28px" fontWeight="600" lineHeight="normal">
                  Ralph Edwards
                </Text>
              </VStack>

              <VStack
                align={'stretch'}
                w="full"
                divider={<Box w="full" borderBottom={'1px solid #F5F5F5'} />}
                spacing={'14px'}
              >
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Phone
                  </Text>

                  <VStack>
                    <Text fontSize="14px" fontWeight="600" lineHeight="normal">
                      +1 415 555 2671
                    </Text>
                    <HStack mt="7px" spacing={'9px'} align={'center'}>
                      <Button
                        mt="0"
                        leftIcon={<Image boxSize={'16px'} src={calling.src} />}
                        color="#4545FE"
                        bg="rgba(69, 69, 254, 0.10)"
                        px="12px"
                        h="23px"
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="normal"
                      >
                        Call now
                      </Button>
                      <Image src={plus.src} />
                    </HStack>
                  </VStack>
                </HStack>

                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Email
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#4545FE'}>
                    ralpheds@gmail.com
                  </Text>
                </HStack>
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Gender
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
                    Male
                  </Text>
                </HStack>
                <HStack justify={'space-between'} w="full">
                  <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
                    Preferred Contact
                  </Text>
                  <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
                    SMS
                  </Text>
                </HStack>
                <Button
                  leftIcon={<Image src={document.src} />}
                  h="49.87px"
                  px="16px"
                  bg="#E7FBF5"
                  borderRadius="full"
                  mt="0"
                  color="#064B38"
                >
                  Notes
                </Button>
              </VStack>
            </VStack>

            <VStack spacing={'30px'} align={'stretch'} w="full">
              <Box w="full" color={'#191919'}>
                <HStack w="full" justify={'space-between'}>
                  <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                    Portfolio
                  </Text>

                  <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      Link New Unit
                    </Text>
                    <SmallAddIcon fontSize={25} />
                  </HStack>
                </HStack>
                <VStack
                  mt="12px"
                  p="16px"
                  spacing={'16px'}
                  align={'stretch'}
                  border={'0.5px solid #E4E4E4'}
                  bg="#fff"
                  borderRadius={'16px'}
                >
                  {Array(3)
                    .fill(1)
                    .map(() => (
                      <HStack
                        px="20px"
                        py="18px"
                        spacing={'24px'}
                        border={'0.8px solid #E4E4E4'}
                        bg="#fff"
                        borderRadius={'16px'}
                      >
                        <Image src={ppt1.src} h="175px" w="180px" borderRadius={'15.265px'} />

                        <VStack w="full" spacing={'20px'} align={'stretch'}>
                          <HStack w="full" spacing={'24px'}>
                            <Box>
                              <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                                12-D
                              </Text>
                              <Text fontSize="14px" fontWeight="400" lineHeight="normal">
                                Oak Ridge
                              </Text>
                            </Box>
                            <Center
                              px="12px"
                              py="4px"
                              fontSize="14px"
                              fontWeight="500"
                              lineHeight="20px"
                              color={'#116932'}
                              bg="#F0FDF4"
                              borderRadius={'full'}
                            >
                              Owner-Occupied
                            </Center>
                          </HStack>

                          <HStack w="full" spacing={'24px'}>
                            <Box>
                              <Text
                                fontSize="11px"
                                fontWeight="400"
                                lineHeight="150%"
                                letterSpacing={'0.33px'}
                              >
                                Balance
                              </Text>
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                lineHeight="150%"
                                letterSpacing={'0.26px'}
                              >
                                -$800.00(credit)
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize="11px"
                                fontWeight="400"
                                lineHeight="150%"
                                letterSpacing={'0.33px'}
                              >
                                Open Requests
                              </Text>
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                lineHeight="150%"
                                letterSpacing={'0.26px'}
                              >
                                1
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize="11px"
                                fontWeight="400"
                                lineHeight="150%"
                                letterSpacing={'0.33px'}
                              >
                                Violation
                              </Text>
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                lineHeight="150%"
                                letterSpacing={'0.26px'}
                              >
                                0
                              </Text>
                            </Box>
                          </HStack>

                          <Button
                            mt="0"
                            h="40px"
                            w="152px"
                            borderRadius="full"
                            bg="#000"
                            color="#fff"
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="normal"
                          >
                            View Details
                          </Button>
                        </VStack>
                      </HStack>
                    ))}
                </VStack>
              </Box>

              <Box w="full" color={'#191919'}>
                <HStack w="full" justify={'space-between'}>
                  <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                    Requests / Work Orders
                  </Text>

                  <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      Link New Unit
                    </Text>
                    <ChevronRightIcon fontSize={25} />
                  </HStack>
                </HStack>
                <HStack
                  mt="12px"
                  p="16px"
                  spacing={'16px'}
                  align={'stretch'}
                  border={'0.5px solid #E4E4E4'}
                  bg="#fff"
                  borderRadius={'16px'}
                >
                  {Array(2)
                    .fill(1)
                    .map(() => (
                      <VStack
                        align={'stretch'}
                        w="256px"
                        p="12px"
                        spacing={'12px'}
                        border={'0.8px solid #E4E4E4'}
                        bg="#FBFCFC"
                        borderRadius={'16px'}
                      >
                        <HStack spacing={'8px'}>
                          <Center
                            borderRadius={'full'}
                            boxSize={'36px'}
                            border={'1px solid #E4E4E7'}
                            bg="#FAFAFA"
                          >
                            <Image src={info.src} />
                          </Center>
                          <Text
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing="0.26px"
                          >
                            Trash Can
                          </Text>
                        </HStack>
                        <HStack spacing={'8px'}>
                          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                            14-D
                          </Text>
                          <Center
                            px="12px"
                            py="4px"
                            fontSize="14px"
                            fontWeight="500"
                            lineHeight="20px"
                            color={'#116932'}
                            bg="#F0FDF4"
                            borderRadius={'full'}
                          >
                            Cured
                          </Center>
                        </HStack>

                        <HStack spacing={'8px'}>
                          <Text
                            fontSize="11px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                            color={'#52525B'}
                          >
                            WO - 8831
                          </Text>
                          <Box boxSize="3px" borderRadius={'full'} bg="#000" />
                          <Text
                            fontSize="11px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                            color={'#27272A'}
                          >
                            SLA 2 hours
                          </Text>
                        </HStack>
                      </VStack>
                    ))}
                </HStack>
              </Box>

              <Box w="full" color={'#191919'}>
                <HStack w="full" justify={'space-between'}>
                  <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                    Violation
                  </Text>

                  <HStack>
                    <Text fontSize="19px" fontWeight="500" lineHeight="130%">
                      View Violation History
                    </Text>
                    <ChevronRightIcon fontSize={25} />
                  </HStack>
                </HStack>
                <HStack
                  mt="12px"
                  p="16px"
                  spacing={'16px'}
                  align={'stretch'}
                  border={'0.5px solid #E4E4E4'}
                  bg="#fff"
                  borderRadius={'16px'}
                >
                  {Array(2)
                    .fill(1)
                    .map(() => (
                      <VStack
                        align={'stretch'}
                        w="256px"
                        p="12px"
                        spacing={'12px'}
                        border={'0.8px solid #E4E4E4'}
                        bg="#FBFCFC"
                        borderRadius={'16px'}
                      >
                        <HStack spacing={'8px'}>
                          <Center
                            borderRadius={'full'}
                            boxSize={'36px'}
                            border={'1px solid #E4E4E7'}
                            bg="#FAFAFA"
                          >
                            <Image src={info.src} />
                          </Center>
                          <Text
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing="0.26px"
                          >
                            Trash Can
                          </Text>
                        </HStack>
                        <HStack spacing={'8px'}>
                          <Text fontSize="20px" fontWeight="600" lineHeight="normal">
                            14-D
                          </Text>
                          <Center
                            px="12px"
                            py="4px"
                            fontSize="14px"
                            fontWeight="500"
                            lineHeight="20px"
                            color={'#116932'}
                            bg="#F0FDF4"
                            borderRadius={'full'}
                          >
                            Cured
                          </Center>
                        </HStack>

                        <HStack spacing={'8px'}>
                          <Text
                            fontSize="11px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                            color={'#52525B'}
                          >
                            WO - 8831
                          </Text>
                          <Box boxSize="3px" borderRadius={'full'} bg="#000" />
                          <Text
                            fontSize="11px"
                            fontWeight="500"
                            lineHeight="150%"
                            letterSpacing={'0.33px'}
                            color={'#27272A'}
                          >
                            SLA 2 hours
                          </Text>
                        </HStack>
                      </VStack>
                    ))}
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
        {/* <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          {UniqueCustomer?.isLoading ? (
            <Box position="relative" display="grid" placeItems="center" mx="auto" mt="10vh">
              <AnimatedLoader />
            </Box>
          ) : UniqueCustomer?.isError ? (
            toast({
              title: 'An error occured fetching user profile',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            })
          ) : (
            <Stack
              mx="auto"
              columns={2}
              zIndex={700}
              justify="flex-end"
              align="start"
              position={'relative'}
              spacing={{base: '20px', xl: '56px'}}
              direction={{base: 'column', md: 'row'}}
            >
              <Box
                css={customScroll}
                w="full"
                maxW={{base: '300px', lg: '371px'}}
                mx={'auto'}
                top="calc(clamp(52px,calc(11.4vh + 40px),96px) + 44px)"
                position={'sticky'}
                overflowY="auto"
                h="calc(100vh - calc(clamp(52px,calc(11.4vh + 40px),96px) + 44px)) "
              >
                <HStack onClick={handleBack} mb={4}>
                  <Image
                    style={{cursor: 'pointer'}}
                    mr={2}
                    height="50px"
                    src={backArrow.src}
                    alt="back_arrow"
                    zIndex={1200}
                  />
                  <Heading {...themeStyles.textStyles.h3}>Back</Heading>
                </HStack>
                <CustomerBasicInfo
                  referral={UniqueCustomer?.data?.data?.referred_by}
                  customerInfo={UniqueCustomer?.data?.data?.user_info}
                />
              </Box>
              <Box w="full" maxW={{base: '60vw', xl: '888px'}} minH="100vh">
                <CustomerProperties
                  id={UniqueCustomer?.id}
                  refetch={UniqueCustomer.refetch}
                  customerInfo={UniqueCustomer?.data?.data}
                />
              </Box>
            </Stack>
          )}
        </Box> */}
      </LayoutView>
    </Box>
  );
};

export default SingleCustomerPage;

export async function getServerSideProps(context) {
  const {query} = context;
  const userId = query.userId;

  return {
    props: {
      userId,
    },
  };
}
