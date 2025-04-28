import React from 'react';
import {
  VStack,
  Image as ChakraImage,
  Text,
  Box,
  Stack,
  StackDivider,
  Center,
} from '@chakra-ui/react';

import emptyIcon from '/src/images/icons/emptyIcon.png';
import {formatNumAbbrev} from '../../../utils/formatAmount';
import Image from 'next/image';
import {HouseSVG} from 'pages/residents/profile/customer_equities';

const EmptyState = () => {
  return (
    <VStack spacing="none" mx="auto" w="full" h="full" py="15px">
      {/* <Image alt="empty table icon" src={emptyIcon.src} /> */}
      <HouseSVG />
      <Text fontSize={'20px'} mt="16px" color="#3D3D3D" fontWeight={'700'}>
        Nothing Found
      </Text>
      <Text
        w="full"
        textAlign="center"
        fontSize="14px"
        fontWeight="400"
        mx="auto"
        color="#919191"
        mt="12px"
      >
        Nothing has been purchased yet
      </Text>
    </VStack>
  );
};

const PortfolioCard = ({data}) => {
  const customerPortfolio = data?.data?.customer_investments;

  return (
    <>
      <Text color="#191919" fontWeight={'500'} wordBreak="break-word" fontSize="18px">
        Portfolio
      </Text>
      {customerPortfolio?.length === 0 || true ? (
        <EmptyState />
      ) : (
        <Stack
          bgColor="#ffffff"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius={`8px`}
          border={`0.5px solid`}
          borderColor={`#E4E4E4`}
          gap={`0px`}
          divider={<StackDivider borderColor={`#e4e4e4`} m={`0px !important`} />}
        >
          {customerPortfolio?.map((single, index) => {
            console.log({single});
            return (
              <Box key={index} display="flex" flexDirection="column" gap="4px">
                <Box
                  p="14px"
                  display="flex"
                  flexDirection="row"
                  gap="10px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Center
                    boxSize={`43.8px`}
                    position={`relative`}
                    overflow={`hidden`}
                    borderRadius={`2.7px`}
                  >
                    <Image
                      src={single?.project?.project?.photos[0]?.photo}
                      alt="property image"
                      fill
                      style={{objectFit: `cover`}}
                    />
                  </Center>
                  <Box display="flex" flexDirection="column" gap="4px" width="full">
                    <Box color="#0D0D0D" fontSize="12.77px" fontWeight={'400'}>
                      {single?.unit_type}, {single?.project?.project?.name}
                    </Box>
                    <Box display="flex" flexDirection="row" gap="13.69px">
                      <Stack display="flex" flexDirection="row" gap="3.65px">
                        <Text color="#0D0D0D" fontSize="10.95px" fontWeight={'500'}>
                          {formatNumAbbrev(
                            single?.defaulting === 'Fractional'
                              ? `${single?.total_paid || 0}`
                              : `${single?.offer_price}`
                          )}
                        </Text>
                        <Text color="#919191" fontSize="10.95px" fontWeight={'300'}>
                          {single?.defaulting === 'Fractional' ? 'Purchase' : 'Offer'} Price
                        </Text>
                      </Stack>
                      {single?.defaulting === 'Fractional' ? null : (
                        <Stack display="flex" flexDirection="row" gap="3.65px">
                          <Text color="#0D0D0D" fontSize="10.95px" fontWeight={'500'}>
                            {formatNumAbbrev(single?.total_paid)}
                          </Text>
                          <Text color="#919191" fontSize="10.95px" fontWeight={'300'}>
                            Paid
                          </Text>
                        </Stack>
                      )}
                      {single?.defaulting === 'Fractional' ? (
                        <Stack display="flex" flexDirection="row" gap="3.65px">
                          <Text color="#0D0D0D" fontSize="10.95px" fontWeight={'500'}>
                            {single?.total_fractions || 0}
                          </Text>
                          <Text color="#919191" fontSize="10.95px" fontWeight={'300'}>
                            Fractions bought
                          </Text>
                        </Stack>
                      ) : null}
                      {single?.defaulting === 'Fractional' ? null : (
                        <Stack display="flex" flexDirection="row" gap="3.65px">
                          <Text color="#0D0D0D" fontSize="10.95px" fontWeight={'500'}>
                            {formatNumAbbrev(single?.current_outstanding_balance)}
                          </Text>
                          <Text color="#919191" fontSize="10.95px" fontWeight={'300'}>
                            Outstanding
                          </Text>
                        </Stack>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default PortfolioCard;
