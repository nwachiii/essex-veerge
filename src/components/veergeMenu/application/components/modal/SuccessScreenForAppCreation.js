import React, {useEffect} from 'react';
import successGif from '/src/images/animated_icons/createAppSuccessState.gif';
import patternImage from '/src/images/bgs/patternImage.png';
import backIcon from '/src/images/icons/backButtonForModalcreateApp.svg';

import {
  VStack,
  Text,
  Button,
  Box,
  Flex,
  Heading,
  Image,
  useToast,
  HStack,
  Spinner,
  useClipboard,
  ModalBody,
} from '@chakra-ui/react';
import {truncateLongText} from '../../../../../utils';
import QRCode from 'qrcode.react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import copyIcon from '/src/images/icons/copyIconTheme.svg';
import qrCodeIcon from '/src/images/icons/qrCodeIcon.svg';
import {RxCross2} from 'react-icons/rx';
export const SuccessScreenForAppCreation = ({domainUrl, storeInfo}) => {
  const toast = useToast();
  const router = useRouter();

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

  hasCopied
    ? toast({
        description: 'URL copied',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
    : null;

  useEffect(() => {
    const fetch = async () => {
      await storeInfo.refetch;
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fixLinkFormat = link => {
    const protocolRegex = /^(https?|ftp):\/\//;

    if (!protocolRegex.test(link)) {
      return `http://${link}`;
    }

    return link;
  };
  return (
    <ModalBody h="full" p="0px" w="974.57px">
      <HStack borderRadius="20px" w="full" h="540px" border="1px solid #0C2841" spacing="none">
        <VStack
          borderLeftRadius="20px"
          justify="center"
          bg="#031b2e"
          position="relative"
          w="50%"
          h="full"
        >
          <Image
            width="full"
            height="full"
            top="0px"
            left="0px"
            objectFit="cover"
            bg="transparent"
            src={patternImage.src}
            position="absolute"
            alt="bg image"
          />
          <VStack p="42px" py="76px" spacing="20px">
            <Image
              width="100px"
              height="100px"
              objectFit="contain"
              src={successGif.src}
              alt="success image"
            />
            <Heading
              as="h1"
              w="300px"
              color="#fff"
              fontSize="20.571px"
              lineHeight="26px"
              fontWeight="600"
              textAlign="center"
            >
              {/* Congratulations your Web application is live */}
              Deployment successful
            </Heading>

            {/* <Button
              maxW="497px"
              ButtonAlign="center"
              fontSize="20px"
              fontWeight="300"
              background="transparent"
              _hover={{
                opacity: '0.4',
                background: 'transparent',
              }}
              _active={{
                opacity: '0.4',
                background: 'transparent',
              }}
              color="#42DE9F"
              onClick={() => window.open(`${domainUrl ? fixLinkFormat(domainUrl) : ''}`, '_blank')}
            >
              Visit your web application
            </Button> */}
            <Text
              maxW="284px"
              ButtonAlign="center"
              fontSize="14px"
              fontWeight="300"
              lineHeight="17.75px"
              color="#CBCBCB"
              textAlign="center"
            >
              Your application should be live now or will be live shortly. If you have any concerns
              or need assistance, don&apos;t hesitate to contact our support team
            </Text>
            {/* <HStack spacing="8px">
              <HStack
                justify="center"
                onClick={() => router.push('/dashboard?manageApp=true')}
                boxSize="36px"
                cursor="pointer"
                borderRadius="full"
                position="relative"
                bg="rgba(255, 255, 255, 0.20)"
                align="center"
              >
                <Image boxSize="17.28px" alt="backIcon" objectFit="cover" src={backIcon.src} />
              </HStack>
              <Text fontSize="17.14px" lineHeight="21.74px" color="#ffffff" fontWeight="400">
                Go back Home
              </Text>
            </HStack> */}
          </VStack>
        </VStack>
        <>
          {storeInfo.isLoading ? (
            <VStack w="50%" h="full" bg={'#060623'} borderRightRadius="20px" justify={'center'}>
              {/* <Spinner /> */}
              <Text w="80%" textAlign="center" fontSize="14px" fontWeight="400" color="#fff">
                {` Retrieving domain...`}
              </Text>
            </VStack>
          ) : storeInfo?.isError ? (
            <VStack w="50%" h="full" bg={'#060623'} borderRightRadius="20px" justify={'center'}>
              <Text w="80%" textAlign="center" fontSize="14px" fontWeight="400" color="#fff">
                {` We encountered an issue while retrieving your web app's details,kindly refresh the page`}
              </Text>
            </VStack>
          ) : domainUrl ? (
            <VStack
              bg={'#060623'}
              spacing="26px"
              justify={'start'}
              pt="23.71px"
              w="50%"
              borderRightRadius="20px"
              h="full"
            >
              <Box alignSelf="end" pr="18.71px">
                <HStack
                  justify="center"
                  onClick={() => router.push('/dashboard?manageApp=true')}
                  boxSize="36px"
                  cursor="pointer"
                  borderRadius="full"
                  position="relative"
                  bg="rgba(255, 255, 255, 0.20)"
                  align="center"
                >
                  <RxCross2 color="#ffffff" />
                </HStack>
              </Box>
              <HStack h="200px" w="200px" justify="center">
                {
                  <Box>
                    <QRCode value={domainUrl || ''} id="qr-gen" size={200} />
                  </Box>
                }
              </HStack>
              <HStack spacing="12px">
                <Button
                  mt={0}
                  variant="md-outline-radius"
                  p="8px 16px"
                  color="#ffffff"
                  fontSize="13px"
                  lineHeight="17.39px"
                  bg="#FFFFFF0F"
                  border="1px solid  #FFFFFF0F"
                  fontWeight="500"
                  _hover={{
                    opacity: '0.8',
                  }}
                  h="36px"
                  onClick={handleDownload}
                >
                  Download QR
                </Button>
                <Button
                  variant="md-outline-radius"
                  p="8px 16px"
                  lineHeight="17.39px"
                  h="36px"
                  fontSize="13px"
                  fontWeight="500"
                  _hover={{
                    opacity: '0.8',
                  }}
                  onClick={() => {
                    onCopy();
                  }}
                  color="#fff"
                  bg="#FFFFFF0F"
                  border="1px solid  #FFFFFF0F"
                  iconSpacing="10px"
                  rightIcon={<Image src={qrCodeIcon.src} alt="qrCode icon" />}
                >
                  Copy QR
                </Button>
              </HStack>
              <Text fontSize="17.14px" lineHeight="21.74px" color="#F5F5F5" fontWeight="500">
                {' '}
                OR{' '}
              </Text>
              <HStack spacing="13px">
                <HStack
                  bg="#FFFFFF0F"
                  border="1px solid  #FFFFFF0F"
                  w={'312px'}
                  // gap={2}
                  borderRadius={'12px'}
                  color={'#333333'}
                  justify="space-between"
                  alignItems={'center'}
                  pl={'12.86px'}
                  py={'6.5px'}
                  pr={'4.71px'}
                  h={'54px'}
                >
                  <Text
                    fontSize="13.71px"
                    noOfLines={1}
                    lineHeight="17.39px"
                    fontWeight="300"
                    color="#fff"
                  >
                    {domainUrl}
                  </Text>
                </HStack>
                <HStack
                  bg="#FFFFFF0F"
                  boxSize="54px"
                  onClick={() => {
                    onCopy();
                  }}
                  cursor="pointer"
                  border="1px solid  #FFFFFF0F"
                  borderRadius="8px"
                  justifyContent="center"
                >
                  <Image src={copyIcon.src} alt="copy icon" />
                </HStack>
              </HStack>
            </VStack>
          ) : (
            <VStack
              bg={'#060623'}
              gap={'36px'}
              justify={'center'}
              w={'50%'}
              h="full"
              borderRadius={'0px 20px 20px 0px'}
            >
              <Heading as="h4" fontSize="18px" color="#fff" fontWeight="500">
                You do not have an active store domain.
              </Heading>
            </VStack>
          )}
        </>
      </HStack>
    </ModalBody>
  );
};

export default SuccessScreenForAppCreation;
