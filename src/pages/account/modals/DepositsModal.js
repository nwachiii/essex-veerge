import React from 'react';
import {CopyIcon} from '@chakra-ui/icons';
import {BiInfoCircle} from 'react-icons/bi';
import {useQuery} from '@tanstack/react-query';
import downloadIcon from '/public/public_image/download.png';
import {Button, Popup} from 'ui-lib/ui-lib.components';
import {fetchDeveloperVirtualAccount} from '../../../apis/account';
import {AnimatedLoader} from '../../../components/common/loaders';
import {
  Box,
  Flex,
  useClipboard,
  Text,
  useDisclosure,
  VStack,
  HStack,
  CloseButton,
  Image,
} from '@chakra-ui/react';

export const DepositsModal = () => {
  const DepositModal = useDisclosure();
  const DEPOSIT_VIRTUAL_ACCOUNT_QUERY = useQuery(
    ['deposit-virtual-account'],
    fetchDeveloperVirtualAccount
  );

  const DEPOSIT_VIRTUAL_ACCOUNT = DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.data?.data?.data?.details;
  const [accountNumber, setAccountNumber] = React.useState(DEPOSIT_VIRTUAL_ACCOUNT?.account_number);
  const {hasCopied, onCopy} = useClipboard(accountNumber);

  // console.log('DEPOSIT_VIRTUAL_ACCOUNT', DEPOSIT_VIRTUAL_ACCOUNT);

  return (
    <div>
      <Button
        variant="primary"
        py={0}
        h="40px"
        onClick={DepositModal.onOpen}
        w="107px"
        mt={0}
        fontSize="14px"
        fontWeight="500"
      >
        <Image alt="" src={downloadIcon.src} className="w-4 mr-2 h-4" /> Deposit
      </Button>

      <Popup
        hideCloseBtn
        minW="455px"
        minH="432px"
        h="fit-content"
        px="36px"
        pt="35px"
        pb="30px"
        isOpen={DepositModal.isOpen}
        onClose={DepositModal.onClose}
        isCentered
      >
        <HStack w="full" justify={'space-between'}>
          <Text
            color="#191919"
            fontFamily="Euclid Circular B"
            fontSize="24px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            Deposit
          </Text>
          <CloseButton onClick={DepositModal.onClose} size={24} />
        </HStack>
        <Popup.Body>
          <VStack w="full" px={0.2} spacing={4} fontFamily="Euclid Circular B">
            <Text
              w="full"
              borderRadius="12px"
              background="rgba(69, 69, 254, 0.05)"
              p={6}
              fontSize="14px"
            >
              Kindly proceed with the payment to the provided account number , and please be aware
              that there is a fee associated with transfer.
            </Text>
            <Box position={'relative'}>
              {DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.isLoading ? (
                <AnimatedLoader />
              ) : DEPOSIT_VIRTUAL_ACCOUNT_QUERY?.isError ? (
                <Text>There was an error fetching your deposit account</Text>
              ) : (
                <>
                  {DEPOSIT_VIRTUAL_ACCOUNT?.name ? (
                    <HStack justify={'center'} gap="5px" mt={'17px'} mb={'13px'} mx="auto" w="full">
                      <Text
                        color="#3D3D3D"
                        textAlign="center"
                        fontFamily="Euclid Circular B"
                        fontSize="16px"
                        fontStyle="normal"
                        fontWeight="500"
                        lineHeight="normal"
                      >
                        Account Name:
                      </Text>
                      <Text
                        color="#3D3D3D"
                        fontFamily="Euclid Circular B"
                        fontSize="16px"
                        fontStyle="normal"
                        fontWeight="300"
                        lineHeight="normal"
                      >
                        {DEPOSIT_VIRTUAL_ACCOUNT?.name}
                      </Text>
                    </HStack>
                  ) : null}

                  <Flex
                    direction={'column'}
                    mb={4}
                    position="relative"
                    justify={'center'}
                    align="center"
                    h="96px"
                    w="349px"
                    border="1px solid #E4E4E4"
                    borderRadius={'12px'}
                  >
                    <Text
                      color="#000"
                      fontSize="16.082px"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                    >
                      {DEPOSIT_VIRTUAL_ACCOUNT?.bank_name}
                    </Text>
                    <Text mt={2} textAlign={'center'} px="8px" fontSize={'28px'} fontWeight={600}>
                      {DEPOSIT_VIRTUAL_ACCOUNT?.account_number}
                    </Text>
                    <Box
                      position={'absolute'}
                      right={'5%'}
                      bottom="15%"
                      variant="default"
                      onClick={onCopy}
                    >
                      {hasCopied ? (
                        'copied'
                      ) : (
                        <CopyIcon cursor="pointer" color="#191919" h={'24px'} w={'24px'} />
                      )}
                    </Box>
                  </Flex>
                </>
              )}
            </Box>
            <HStack align={'flex-start'}>
              <BiInfoCircle size={'18px'} style={{marginTop: '.2em'}} color="#606060" />
              <Text
                w="389px"
                color="#606060"
                fontFamily="Euclid Circular B"
                fontSize="14.071px"
                fontStyle="normal"
                fontWeight="300"
                lineHeight="normal"
              >
                While most transfers are processed almost immediately, please note that it may take
                longer in some cases. Be rest assured that we will notify you via email as soon as
                the transfer is complete.
              </Text>
            </HStack>
          </VStack>
          {/* <Button onClick={DepositModal.onClose} variant='primary' mx='auto' w='425px' h='38px' borderRadius="12px">
						Okay
					</Button> */}
        </Popup.Body>
      </Popup>
    </div>
  );
};
export default DepositsModal;
