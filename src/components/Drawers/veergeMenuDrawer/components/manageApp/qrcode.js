import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import QRCode from 'qrcode.react';
import {truncateLongText} from '../../../../../utils';
import copyIcon from '/src/images/icons/copyIcon.svg';
import copiedIcon from '/src/images/icons/copiedIcon.svg';

export const Qrcode = ({domainUrl}) => {
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
      {domainUrl ? (
        <VStack
          bg={'#F9FAFB'}
          border={`1px solid #E4E4E4`}
          borderRadius={`4px`}
          spacing="14.6px"
          justify={'start'}
          w="full"
          p="12px"
        >
          <HStack h="240px" w="240px" justify="center">
            {
              <Box>
                <QRCode value={domainUrl || 'www.google.com'} id="qr-gen" size={240} />
              </Box>
            }
          </HStack>
          <HStack spacing="12px">
            {/* <Button
              mt={0}
              w="136px"
              bg="#000"
              color="#fff"
              fontSize="12px"
              boxShadow="0px 7.2967px 43.78022px 0px rgba(0, 0, 0, 0.04)"
              fontWeight="500"
              _hover={{
                opacity: '0.8',
              }}
              borderRadius="10px"
              h="39px"
              onClick={() => {
                onCopy();
              }}
            >
              Copy QR Code
            </Button> */}
            <Button
              w="260px"
              h="39px"
              fontSize="12px"
              variant="md-outline-radius"
              fontWeight="500"
              bg="transparent"
              _hover={{
                opacity: '0.8',
              }}
              color="#000"
              border="0.912px solid #a3a3a3"
              onClick={handleDownload}
            >
              Download QR Code
            </Button>
          </HStack>
          <Text fontSize="16px" color="#333" fontWeight="500">
            {' '}
            OR{' '}
          </Text>
          <HStack
            bg={'#E0E0E0'}
            w={'full'}
            gap={'15px'}
            borderRadius={'10.9px'}
            justify="space-between"
            alignItems={'center'}
            pl={'12.68px'}
            pr={'29.11px'}
            h={'58px'}
          >
            <Text fontSize="14.593px" fontWeight="300" color="#333">
              {truncateLongText(domainUrl || '', 45)?.truncatedText}
            </Text>
            {/* <Button
              mt={0}
              w="93px"
              bg="#000"
              color="#fff"
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
            </Button> */}
            <Image
              src={(hasCopied ? copiedIcon : copyIcon).src}
              cursor="pointer"
              boxSize="16px"
              onClick={() => {
                onCopy();
              }}
              alt="copy icon"
            />
          </HStack>
        </VStack>
      ) : (
        <VStack gap={'36px'} justify={'center'} w={'full'} h="full">
          <Heading as="h4" fontSize="18px" color="#191919" fontWeight="500">
            You do not have an active store domain.
          </Heading>
        </VStack>
      )}
    </>
  );
};

export default Qrcode;
