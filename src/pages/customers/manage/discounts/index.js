import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {Fragment} from 'react';
import {LayoutView} from '../../../../components/PageLayout/LayoutView';
import {themeStyles} from '../../../../theme';
import {Button} from '../../../../ui-lib/ui-lib.components';
import backArrow from '/src/images/icons/back-arrow.png';
import manageDiscountsBg from '/src/images/bgs/manage-discount.png';
import {SENT_OFFERS} from '../../../../constants/customersProfile';
import {Container2} from '../../../../components/common/containers';
import {ComingSoonModal} from '../../../../components/ComingSoonModal';
import {formatAmount} from '../../../../utils';
import {formatToCurrency} from 'utils/formatAmount';

export default function ManageDiscount({data = SENT_OFFERS}) {
  const router = useRouter();
  const handleBack = () => {
    router.back(-1);
  };
  return (
    <Fragment>
      <LayoutView activePage={'listings'} />
      <Box
        mt="-83rem"
        bgImage={manageDiscountsBg.src}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        h="121px"
        minW="100vw"
      >
        <Flex
          w="full"
          justify="space-between"
          mt={-6}
          mb={4}
          maxW="1284px"
          align="center"
          h="full"
          mx="auto"
        >
          <HStack onClick={handleBack} zIndex={100}>
            <Image
              style={{cursor: 'pointer'}}
              mr={2}
              height="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading {...themeStyles.textStyles.h3} color="#FFFFFF" fontSize="20px">
              Manage Discounts
            </Heading>
          </HStack>

          <ComingSoonModal
            btnText={'Create Discount'}
            modalHeader="Create Discount"
            variant="primary"
            color="#FFFFFF"
            w="199px"
            border="none"
          />
        </Flex>
      </Box>

      <Container2 p={22} my="27px" maxW="1284px" mx="auto" border="none" borderRadius="sm">
        {data.map((item, idx) => (
          <Stack
            key={idx}
            borderRadius="16px"
            border="1px solid #e5e5e5"
            boxShadow="md"
            w="full"
            mb="20px"
            p="20px"
            pb="24px"
          >
            <Flex justify="space-between" w="full" direction={{base: 'column', lg: 'row'}} gap={6}>
              <HStack spacing={4}>
                <Image alt="" src={item.image.src} boxSize={100} />
                <Box>
                  <Text fontSize="32px" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text>{item.construction_status} </Text>
                </Box>
              </HStack>
              <Center height="90px">
                <Divider orientation="vertical" color="gray.300" />
              </Center>
              {item.fractions_available && (
                <HStack spacing={8} justify={{base: 'center', lg: 'flex-start'}}>
                  <Box>
                    <Text>Fractions available</Text>
                    <Text fontSize="18px">
                      <b>{item.fractions_available}</b>{' '}
                    </Text>
                  </Box>
                  <Box>
                    <Text>Price per fraction</Text>
                    <Text fontSize="18px">
                      <b>{formatToCurrency(item.price_per_fraction)}</b>{' '}
                    </Text>
                  </Box>
                </HStack>
              )}
              {item.unit_name && (
                <HStack spacing={2} maxW="420px">
                  <Image alt="" src={item.unit_image.src} boxSize={100} />
                  <VStack justify="space-between">
                    <Text mr="auto">
                      <b>{item.unit_name}</b>
                    </Text>
                    <Stack direction={{base: 'column', md: 'row'}} justify="space-between">
                      <Box>
                        <Text fontSize={14}>Unit size</Text>
                        <Text fontSize={16}>
                          <b>{item.unit_size}</b>
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={14}>Unit price</Text>
                        <Text fontSize={'16px'}>
                          <b>{formatToCurrency(item.unit_price)}</b>
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={14}>Unit quantity</Text>
                        <Text fontSize={16}>
                          <b>{item.unit_qty}</b>
                        </Text>
                      </Box>
                    </Stack>
                  </VStack>
                </HStack>
              )}
            </Flex>

            <Stack maxW="full" spacing={3} py={8}>
              <Text mb={-2} ml={2} fontSize="14px" fontWeight={500} color="#191919">
                Offer Price
              </Text>
              <HStack
                justify="space-between"
                border="1px solid #e5e5e5"
                borderRadius="16px"
                px={4}
                align="center"
                h="50px"
              >
                <Text>
                  <b>{formatToCurrency(item.offer_price)}</b>
                </Text>
                <Text color="red">
                  <b>-{formatToCurrency(item.offer_discount)}</b>
                </Text>
              </HStack>
              <HStack
                bg="#F5F5F5"
                justify="space-between"
                border="1px solid #F4F4F4"
                borderRadius="16px"
                px={4}
                align="center"
                h="50px"
                mt={2}
              >
                <Text>Offer ends in</Text>
                <Text ml="auto">
                  <b>{item.offer_duration}</b>
                </Text>
                <Text>{item.offer_deadline}</Text>
              </HStack>
            </Stack>
            <Stack
              w="full"
              justify="space-between"
              align={{base: 'flex-start', lg: 'center'}}
              direction={{base: 'column', lg: 'row'}}
            >
              <Tag
                p={3}
                w="148px"
                h="36px"
                bg="#DBFFF5"
                color={item.unit_name ? '#4545FE' : '#12D8A0'}
                borderRadius="full"
              >
                <TagLabel mx="auto">{item.unit_name ? 'Whole unit' : 'Fractional'}</TagLabel>
              </Tag>
              <HStack spacing="20px">
                <Button
                  h="48px"
                  variant="default"
                  color="red"
                  border="1px solid red"
                  w="175px"
                  mt={0}
                >
                  Delete Discount
                </Button>
                <Button h="48px" variant="dark" mt={0} w="132px">
                  View listing
                </Button>
                <Button h="48px" variant="primary" mt={0} w="109px">
                  Edit
                </Button>
              </HStack>
            </Stack>
          </Stack>
        ))}
      </Container2>
    </Fragment>
  );
}
