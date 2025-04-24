import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {themeStyles} from '/src/theme';
import {Container2} from '../../common/containers';
import {
  FormatToColorfulAdaptiveCurrency,
  formatAmountWithDecimal,
} from '../../../utils/formatAmount';
import rightArrow from '/src/images/icons/right-angle.png';

export const WalletDetails = ({id, data, username}) => {
  const router = useRouter();
  const [isBelow800] = useMediaQuery('(max-width: 800px)');

  const emptyWallet = data?.wallet == '0' && data?.deposits == '0' && data?.withdrawals == '0';
  return (
    <div>
      <Stack>
        <Flex w="full" justify="space-between">
          {' '}
          <Text>
            <b>Wallet Details</b>
          </Text>
          {emptyWallet ? null : (
            <HStack
              cursor="pointer"
              onClick={() => router.push(`/residents/profile/wallet_txns/${id}?name=${username}`)}
              spacing="11px"
            >
              <Text
                fontWeight="500"
                fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                textAlign="left"
                color="#4545FE"
              >
                View details
              </Text>
              <Image src={rightArrow.src} alt="doc icon" />
            </HStack>
          )}
        </Flex>

        <Container2 boxShadow="4px" h="fit-content" px={{md: '12px', lg: '16px'}} py="22px">
          <Stack
            w="full"
            justify={'space-evenly'}
            direction={{base: 'column', md: 'row'}}
            justifyContent="space-between"
            mx="auto"
          >
            <VStack width="full" maxW="241px" height="160px" {...themeStyles.boxStyles}>
              <Text
                fontWeight="400"
                fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                textAlign="center"
                color="#191919"
              >
                Wallet Current Balance.
              </Text>

              <FormatToColorfulAdaptiveCurrency
                amount={data?.wallet || 0}
                lens={13}
                opacity={data?.wallet == '0' ? 0.6 : ''}
                color={'#191919'}
                maxSize={20}
                minSize={isBelow800 ? 8 : 10}
                pow={isBelow800 ? 0.68 : 0.92}
                fontWeight="700"
                decimalStyle={{fontWeight: '700'}}
              />
            </VStack>
            <VStack width="full" maxW="241px" height="160px" {...themeStyles.boxStyles}>
              <Text
                fontWeight="400"
                fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                textAlign="center"
                color="#191919"
              >
                Total Deposit
              </Text>

              <FormatToColorfulAdaptiveCurrency
                amount={data?.deposits || 0}
                lens={13}
                opacity={data?.deposits == '0' ? 0.6 : ''}
                color={'#191919'}
                maxSize={20}
                minSize={isBelow800 ? 8 : 10}
                pow={isBelow800 ? 0.68 : 0.92}
                fontWeight="700"
                decimalStyle={{fontWeight: '700'}}
              />
            </VStack>
            <VStack width="full" maxW="241px" height="160px" {...themeStyles.boxStyles}>
              <Text
                fontWeight="400"
                fontSize={{base: '10px', lg: '14px', xl: '14px'}}
                lineHeight={{base: '14px', lg: '18px', xl: '18px'}}
                textAlign="center"
                color="#191919"
              >
                Total Withdrawal
              </Text>

              <FormatToColorfulAdaptiveCurrency
                amount={data?.withdrawals || 0}
                lens={13}
                opacity={data?.withdrawals == '0' ? 0.6 : ''}
                color={'#191919'}
                maxSize={20}
                minSize={isBelow800 ? 8 : 10}
                pow={isBelow800 ? 0.68 : 0.92}
                fontWeight="700"
                decimalStyle={{fontWeight: '700'}}
              />
            </VStack>
          </Stack>
        </Container2>
      </Stack>
    </div>
  );
};
export default WalletDetails;
