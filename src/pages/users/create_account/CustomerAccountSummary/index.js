import {
  Box,
  Button,
  Container, HStack,
  Image, Stack,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CreateCustomerFooter from '../CustomerDetails/CreateCustomerFooter';
import UnitAllocation from './UnitAllocation';
import defaultAvatar from '/src/images/avatar.svg';
import houseIcon from '/src/images/icons/homeIcon.svg';
import docIcon from '/src/images/icons/docIcon.svg';
import rightIcon from '/src/images/icons/rightTriangleArrow.svg';

import { AnimatedLoader } from '../../../../components';
import EquitySummary from '@/components/Cards/customerCreationSummary';
import { useSmallerLaptopsBreakpoint } from 'ui-lib/ui-lib.hooks';


export default function CustomerAccountSummary({subPages, handleProgress, step}) {
  const router = useRouter();
    const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  const [showProgress, setShowProgress] = useState(false);
  const customerDetails =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('customerDetails'));

  const userId = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userId'));

  const equityDetails =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('equityDetails'));
  const allocationDetails =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('allocationDetails'));
  const customerEquityPayments =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('payments'))?.equities?.map(item => item.bundle);
  const EQUITY_DOCUMENTS =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('EQUITY_DOCUMENTS'));

  const completeCreateCustomerAccount = () => {
    const id = userId;
    setTimeout(() => {
      router.push(`/users/profile?userId=${id}`);
    }, 1500);
    setShowProgress(true);
    window.localStorage.removeItem('customerDetails');
    window.localStorage.removeItem('customer');
    window.localStorage.removeItem('equityDetails');
    window.localStorage.removeItem('allocationDetails');
    window.localStorage.removeItem('payments');
    window.localStorage.removeItem('userId');
  };
  return (
    <Box position={'relative'} w="full" pb={isSmallerLaptop ? '3em' : ''}>
      <Container
        minH={400}
        p="12"
        maxW={'1284px'}
        color="gray.900"
        borderRadius="2xl"
        background="#FFFFFF"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      >
        {showProgress == true ? (
          <AnimatedLoader />
        ) : (
          <>
            <VStack w="full">
              <Image
                alt=""
                border={'1px solid #e4e4e4'}
                objectFit={'cover'}
                src={customerDetails?.avatar || defaultAvatar.src}
                borderRadius="full"
                boxSize={168}
              />
              <Text fontWeight={700} fontSize="32px" lineHeight="41px">{`${
                customerDetails?.first_name ?? '-'
              } ${customerDetails?.last_name ?? '-'}`}</Text>
              <Text as="small">{customerDetails?.phone_number}</Text>
              <Text as="small" color={'#4545FE'}>
                <a href={`mailto:${customerDetails?.email ?? ''}`}>
                  {' '}
                  {customerDetails?.email ?? '-'}
                </a>
              </Text>
            </VStack>

            <VStack
              w="full"
              spacing="none"
              divider={<StackDivider mt="20px" h="1px" borderWidth="0px" mb="40px" />}
            >
              {equityDetails?.length > 0 &&
                equityDetails.map((item, idx) => (
                  <Stack spacing="25px" w="full" key={idx}>
                    {/* <ListingInfo my={8} listing={equityDetails?.[idx]} /> */}
                    <HStack spacing="24px" borderBottom="1px solid #E4E4E4" pb="39px" pl="27px">
                      <Image src={houseIcon.src} alt="house icon" />
                      <Stack spacing="4px">
                        <Text fontSize="40px" color="#000000" fontWeight="500">
                          {equityDetails?.[idx]?.project?.name ?? ''}
                        </Text>{' '}
                        <Text fontSize="24px" color="#919191" fontWeight="500">
                          {equityDetails?.[idx]?.unit?.unit_title ?? ''}
                        </Text>{' '}
                      </Stack>
                    </HStack>
                    {customerEquityPayments[idx]?.payment_class == 'custom' && (
                      <Stack spacing="22px">
                        <Text fontWeight={500} fontSize="24px">
                          Past payment(s)
                        </Text>
                        <EquitySummary data={customerEquityPayments?.[idx]?.paymentplan.payments} />
                      </Stack>
                    )}
                    {customerEquityPayments[idx]?.payment_class == 'custom' && (
                      <Stack pt="6px" spacing="22px">
                        <Text fontWeight={500} fontSize="24px">
                          Upcoming payment(s)
                        </Text>
                        <EquitySummary
                          data={customerEquityPayments?.[idx]?.paymentplan.upcomings}
                        />
                      </Stack>
                    )}
                    {customerEquityPayments?.[idx]?.payment_class == 'outright' && (
                      <div>
                        <Text fontWeight={500} fontSize="xl">
                          Outright payment
                        </Text>
                        <EquitySummary data={customerEquityPayments?.[idx]?.outright} />
                      </div>
                    )}
                    {allocationDetails ? (
                      <div>
                        <Text fontWeight={500} fontSize="xl">
                          Unit allocation
                        </Text>
                        <UnitAllocation data={allocationDetails?.[idx]} />
                      </div>
                    ) : null}
                    {false ? (
                      <Stack>
                        <Text fontSize="24px" color="#3D3D3D" fontWeight="500">
                          Document{' '}
                        </Text>
                        <Stack
                          spacing="none"
                          w="277px"
                          borderRadius="12px"
                          border="1px solid #E4E4E4"
                          p="16px 18px 14px"
                        >
                          <Image src={docIcon.src} boxSize="48px" alt="doc icon" />
                          <Text mt="7px" mb="19px" fontSize="18px" color="#191919" fontWeight="500">
                            Contract{' '}
                          </Text>
                          <HStack>
                            <Button
                              variant="ghost"
                              iconSpacing="4px"
                              _hover={{bg: 'transparent'}}
                              _active={{bg: 'transparent'}}
                              _focus={{bg: 'transparent'}}
                              p="0px"
                              h="fit-content"
                              fontSize="18px"
                              color="#4545FE"
                              fontWeight="500"
                              rightIcon={<Image src={rightIcon.src} alt="arrow icon" />}
                            >
                              View
                            </Button>
                          </HStack>
                        </Stack>
                      </Stack>
                    ) : null}
                  </Stack>
                ))}
            </VStack>
            {/* <>
              <Text
                my="15px"
                color="#3D3D3D"
                fontSize="24px"
                fontWeight="500"
                fontStyle="normal"
                lineHeight="normal"
                fontFamily="Euclid Circular B"
              >
                Note
              </Text>
              <Box
                w="full"
                minH="118px"
                pt="20px"
                px="20px"
                pb="20px"
                borderRadius="16px"
                background="#F5F5F5"
                h="fit-content"
              >
                <Text
                  bg="#FFFFFF"
                  minH="60px"
                  h="fit-content"
                  p="10px"
                  borderRadius="10px"
                  fontSize={'14px'}
                >
                  Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
                  voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos
                </Text>
              </Box>
            </> */}

            <Box my="75px" />
            <CreateCustomerFooter
              forCreationSummary={true}
              SubmitCustomerInfo={completeCreateCustomerAccount}
              handleProgress={handleProgress}
              subPages={subPages}
              step={step}
              disCardBtnStyle={{
                color: '#FF3636',
                border: '1px solid #FF3636',
                borderRadius: '12px',
              }}
              bg="#4545FE"
              borderRadius="12px"
            />
          </>
        )}
      </Container>
    </Box>
  );
}
