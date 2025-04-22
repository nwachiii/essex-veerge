import {
  Box,
  HStack,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, {Fragment} from 'react';
import {Button} from '../../ui-lib';
import Link from 'next/link';
import {BsDashLg} from 'react-icons/bs';

export const CtaModal = ({modal, plan, amount, freq, mutation}) => {
  let annual_sub_total;
  let annual_total;
  let six_months_total;
  let six_months_sub_total;

  if (freq == 'annually') {
    annual_sub_total = amount * 12;
    annual_total = annual_sub_total - 0.1 * annual_sub_total;
  }
  if (freq == 'six-months') {
    six_months_sub_total = amount * 6;
    six_months_total = six_months_sub_total - 0.05 * six_months_sub_total;
  }

  return (
    <Modal isCentered isOpen={modal.isOpen} onClose={modal.onClose} px={0}>
      <ModalOverlay />
      <ModalContent borderRadius="16px" minW="699px">
        <ModalCloseButton mt={4} fontWeight={'500'} fontSize={'10px'} />
        <ModalBody width="100%" mt="26px" pb="11px" minH="457px" h="fit-content">
          <Stack w="full">
            <HStack
              color="#191919"
              fontFamily="Euclid Circular B"
              fontSize="20px"
              fontStyle="normal"
              fontWeight="600"
              borderBottom={'1px solid #CBCBCB'}
              w="full"
            >
              <Text>Summary</Text>
              <Text fontSize={'16px'}>{`(${plan} plan)`}</Text>
            </HStack>
            <HStack
              w="full"
              h="64px"
              mt="20px"
              px={'10px'}
              color="#FFFFFF"
              borderRadius="8px"
              background="#191919"
              justify={'space-between'}
            >
              <Text>Offer</Text>
              <Center display={'flex'} alignContent="center">
                {`$ ${amount}/month`}
                {!(freq == 'monthly' || freq == 'annually') ? (
                  <small style={{paddingLeft: '.7em'}}> (5% off)</small>
                ) : null}
              </Center>
            </HStack>
            {freq == 'monthly' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$ ${amount}`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'six-months' && plan == 'standard' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Subtotal</Text>
                  <Text>{`$1,500.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`5% off`}</Text>
                  <Text>{`- $ 75.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$1,425.00`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'six-months' && plan == 'premium' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Subtotal</Text>
                  <Text>{`$1,800.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`5% off`}</Text>
                  <Text>{`- $90.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`VAT`}</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$1,710.00`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'six-months' && plan == 'platinum' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Subtotal</Text>
                  <Text>{`$2,100.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`5% off`}</Text>
                  <Text>{`- $ 105.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$1,995.00`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'annually' && plan == 'standard' ? (
              <Fragment>
                <HStack
                  w="full"
                  py={'10px'}
                  color="#191919"
                  fontSize="14px"
                  textAlign="right"
                  fontWeight="400"
                  justify={'space-between'}
                  fontFamily="Euclid Circular B"
                >
                  <Text>Subtotal</Text>
                  <Text>{`$3,000.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`10% off`}</Text>
                  <Text>{`- $300.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$2,700.00/yr`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'annually' && plan == 'premium' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Subtotal</Text>
                  <Text>{`$3,600.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`10% off`}</Text>
                  <Text>{`- $360.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$3,240.00/yr`}</Text>
                </HStack>
              </Fragment>
            ) : freq == 'annually' && plan == 'platinum' ? (
              <Fragment>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Subtotal</Text>
                  <Text>{`$4,200.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>{`10% off`}</Text>
                  <Text>{`- $420.00`}</Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="400"
                  py={'10px'}
                  w="full"
                  justify={'space-between'}
                >
                  <Text>VAT</Text>
                  <Text>
                    <BsDashLg />
                  </Text>
                </HStack>
                <HStack
                  color="#191919"
                  textAlign="right"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontWeight="600"
                  w="full"
                  justify={'space-between'}
                >
                  <Text>Total</Text>
                  <Text>{`$3,780.00/yr`}</Text>
                </HStack>
              </Fragment>
            ) : null}
          </Stack>
          <Stack w="full" bg="#F5F5F5" mt="20px" pb="30px" px={'10px'} borderRadius={'10px'}>
            <Text
              w="full"
              mt="20px"
              color="#000"
              fontSize="14px"
              fontWeight="400"
              textAlign="center"
              fontFamily="Euclid Circular B"
            >
              By clicking “subscribe” you agree with the{' '}
              <Link
                href="/terms-conditions"
                style={{color: '#4545FE', textDecoration: 'underline'}}
              >
                Terms of service.
              </Link>
              {` You will be billed ${
                freq == 'monthly' && plan == 'standard'
                  ? '$250.00'
                  : freq == 'monthly' && plan == 'premium'
                    ? '$300.00'
                    : freq == 'monthly' && plan == 'platinum'
                      ? '$350.00'
                      : freq == 'six-months' && plan == 'standard'
                        ? '$ 1,425.00'
                        : freq == 'six-months' && plan == 'premium'
                          ? '$ 1,710.00'
                          : freq == 'six-months' && plan == 'platinum'
                            ? '$ 1,995.00'
                            : freq == 'annually' && plan == 'standard'
                              ? '$2,700.00'
                              : freq == 'annually' && plan == 'premium'
                                ? '$3,240.00'
                                : freq == 'annually' && plan == 'platinum'
                                  ? '$3,780.00'
                                  : '$0.00'
              } upfront, this will be deducted from your Veerge wallet
                and your subscription will be renewed ${
                  freq == 'monthly' ? 'monthly' : freq == 'annually' ? 'annually' : 'every 6 months'
                } until you cancel (price subject to
                change). You can cancel any time via - `}
              <Link
                href="/terms-conditions"
                style={{color: '#4545FE', textDecoration: 'underline'}}
              >
                Veerge Support.
              </Link>
            </Text>
            <Button
              mx="auto"
              w="146px"
              mt="20px"
              h="40px"
              variant={'primary'}
              isDisabled={mutation?.isLoading}
              onClick={() => mutation.mutate({plan: plan})}
            >
              {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : 'Subscribe'}
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CtaModal;
