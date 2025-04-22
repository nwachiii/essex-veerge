import React, {useState} from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  Flex,
  Heading,
  useToast,
  HStack,
  Spinner,
  useClipboard,
} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';

import QRCode from 'qrcode.react';
import {truncateLongText} from '../../../utils';

export const RightComponent = ({domainUrl, isloading, isError}) => {
  const toast = useToast();
  const [customToast, setToast] = useState(false);
  const {hasCopied, onCopy} = useClipboard(domainUrl);
  const handleDownload = () => {
    const canvas = document?.getElementById('qr-gen');

    const pngUrl = canvas?.toDataURL('image/png')?.replace('image/png', 'image/octet-stream');
    let downloadLink = document?.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `QRCODE.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  // Boolean(customToast)
  hasCopied
    ? toast({
        description: 'URL copied',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
    : null;

  return (
    <>
      {isloading ? (
        <VStack w="50%" h="full" bg={'#F5F5F5'} borderRightRadius="20px" justify={'center'}>
          <Spinner />
        </VStack>
      ) : isError ? (
        <VStack w="50%" h="full" bg={'#F5F5F5'} borderRightRadius="20px" justify={'center'}>
          <Text w="80%" textAlign="center" fontSize="14px" fontWeight="400">
            {` We encountered an issue while retrieving your web app's details,kindly refresh the page`}
          </Text>
        </VStack>
      ) : domainUrl ? (
        <VStack
          bg={'#F5F5F5'}
          spacing="30px"
          justify={'center'}
          w="50%"
          borderRightRadius="20px"
          h="full"
        >
          <HStack h="240px" w="240px" justify="center">
            {
              <Box>
                <QRCode value={domainUrl} id="qr-gen" size={240} />
              </Box>
            }
          </HStack>
          <HStack spacing="12px">
            <Button
              mt={0}
              w="134px"
              bg="#000000"
              color="#ffffff"
              fontSize="16px"
              fontWeight="500"
              _hover={{
                opacity: '0.8',
              }}
              borderRadius="12px"
              h="42px"
              onClick={() => {
                // setToast(!customToast);
                // navigator?.clipboard?.writeText(domainUrl);
                onCopy();
              }}
            >
              Copy QR Code
            </Button>
            <Button
              w="175px"
              h="42px"
              fontSize="16px"
              fontWeight="500"
              bg="transparent"
              _hover={{
                opacity: '0.8',
              }}
              border="1px solid #000000"
              borderRadius="12px"
              onClick={handleDownload}
            >
              Download QR Code
            </Button>
          </HStack>
          {/* <Text fontSize="20px" color="#333333" fontWeight="500">
            {" "}
            OR{" "}
          </Text> */}
          <HStack
            bg={'#E0E0E0'}
            w={'364px'}
            gap={2}
            borderRadius={'12px'}
            color={'#333333'}
            justify="space-between"
            alignItems={'center'}
            pl={'15px'}
            py={'7px'}
            pr={'5px'}
            h={'63px'}
            mt={4}
          >
            <Text fontSize="16px" fontWeight="300" color="#333333">
              {truncateLongText(domainUrl, 15)}
            </Text>
            <Button
              mt={0}
              w="105px"
              bg="#000000"
              color="#ffffff"
              _hover={{
                opacity: '0.8',
              }}
              fontSize="16px"
              fontWeight="500"
              borderRadius="12px"
              h="48px"
              onClick={() => {
                onCopy();
              }}
            >
              Copy URL
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack
          bg={'#F5F5F5'}
          gap={'36px'}
          justify={'center'}
          w={'50%'}
          h="full"
          borderRadius={'0px 38px 38px 0px'}
        >
          <Heading as="h4" fontSize="18" fontWeight="500">
            You do not have an active store domain.
          </Heading>
        </VStack>
      )}
    </>
  );
};

export default RightComponent;
