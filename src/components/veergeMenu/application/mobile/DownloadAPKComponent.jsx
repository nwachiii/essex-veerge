import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slide,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import download_icon from '/src/images/icons/mobile_application/download_icon.svg';
import AnimateInput from '@/components/AnimateInput';
import {Input} from 'ui-lib/ui-lib.components';
import {useState} from 'react';
import {LineWave} from 'react-loader-spinner';
import styles from './downloadapkcomponent.module.css';
import {useQuery} from '@tanstack/react-query';
import {fetchMobileAPK, updateMobileApkDownloadStatus} from 'apis/application';
import {toastForError} from 'utils/toastForErrors';

export const DownloadAPKComponent = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const process_disclosure = useDisclosure();
  const [processed, setProcessed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [stopProcess, setStopProcess] = useState(false);
  const [processStep, setProcessStep] = useState(1);
  const [showText, setShowText] = useState(true);
  const [appleID1, setAppleID1] = useState('');
  const [appleID2, setAppleID2] = useState('');
  const [appleID3, setAppleID3] = useState('');
  const [downloading, setDownloading] = useState(false);

  const toast = useToast();

  const {data, isError, isLoading, refetch, error} = useQuery(['apk-status'], fetchMobileAPK);
  console.log(data);

  const handle_click = () => {
    if (!processed && data?.data?.data?.apk_downloaded === false) {
      setProcessing(true);
      setTimeout(() => {
        setProcessStep(2);
        setTimeout(() => {
          setProcessStep(3);
          setTimeout(() => {
            setProcessStep(4);
            setTimeout(() => {
              setProcessing(false);
              setProcessed(true);
              onOpen();
            }, 5000);
          }, 4000);
        }, 5000);
      }, 3000);
      // clearInterval(update_step);
    } else {
      setProcessed(true);
      onOpen();
    }
  };

  const download_android = async () => {
    try {
      setDownloading(true);
      const res = await updateMobileApkDownloadStatus({downloaded: true});
      console.log(res);
      toast({
        title: 'APK Downloaded Succesfuly',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setDownloading(false);
    } catch (err) {
      console.error(err);
      console.log(err.response);
      setDownloading(false);
    }

    onClose();
  };

  const download_ios = async e => {
    let ids_array = [];
    if (appleID1) ids_array.push(appleID1);
    if (appleID2) ids_array.push(appleID2);
    if (appleID3) ids_array.push(appleID3);
    if (!appleID1 && !appleID2 && !appleID3) {
      return toast({
        title: 'Error!',
        description: 'Please provide the Apple IDs you want to authorize',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
    try {
      setDownloading(true);
      const res = await updateMobileApkDownloadStatus({
        downloaded: true,
        links: ids_array,
      });
      console.log(res);
      toast({
        title: 'Success!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setDownloading(false);
    } catch (err) {
      console.error(err);
      console.log(err.response);
      setDownloading(false);
    }
    onClose();
  };

  const process_stage = stage => {
    switch (stage) {
      case 1:
        return (
          <>
            <Box as="span" color="#2ED3B7">
              Extracting
            </Box>{' '}
            <Box as="span">Theme</Box>
          </>
        );
      case 2:
        return (
          <>
            <Box as="span" color="#2ED3B7">
              Integrating
            </Box>{' '}
            <Box as="span">Theme</Box>
          </>
        );
      case 3:
        return (
          <>
            <Box as="span" color="#2ED3B7">
              Compiling
            </Box>{' '}
            <Box as="span">Theme</Box>
          </>
        );
      default:
        return (
          <>
            <Box as="span" color="#2ED3B7">
              Wrapping
            </Box>{' '}
            <Box as="span">Up</Box>
          </>
        );
    }
  };

  return (
    data?.data?.data?.apk_url && (
      <>
        <Center position={'fixed'} bottom={'20px'} w="100%" zIndex={'5'}>
          <HStack
            borderRadius="70px"
            border="1px solid #11476D"
            background="#0C2841"
            boxshadow="0px -1px 6px 0px rgba(232, 233, 241, 0.10)"
            minW="290px"
            padding="16px 24px"
            justifyContent="center"
            gap="8px"
            color="#ffffff"
            cursor={'pointer'}
            onClick={handle_click}
          >
            <Image src={download_icon.src} alt="download icon" />
            {!processing ? (
              <Text flex="1" fontSize="18px" fontStyle="normal" fontWeight="600" lineHeight="30px">
                Download Mobile App
              </Text>
            ) : (
              <Text
                fontSize="18px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="30px"
                className={styles.apk_process_text}
              >
                {process_stage(processStep)}
              </Text>
            )}
            {processing && (
              <Center>
                <LineWave
                  visible={true}
                  color="#fff"
                  ariaLabel="line-wave-loading"
                  width={'32px'}
                  height="32px"
                />
              </Center>
            )}
          </HStack>
        </Center>
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent
            borderRadius="20px"
            background="#0C2841"
            color="#ffffff"
            // p="32px 49px"
            maxW="478px"
          >
            <ModalHeader fontSize="24px" fontWeight="600" p="32px 49px 0px" m="0px">
              Download Application
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p="10px 49px">
              <Text mb="16px" fontWeight={'600'}>
                For Android Users
              </Text>
              <Link
                // as={Button}
                display={'flex'}
                textAlign={'center'}
                justifyContent="center"
                href={data?.data?.data?.apk_url || '#'}
                rel="noreferrer"
                target="_blank"
                borderRadius="12px"
                border="1px solid rgba(255, 255, 255, 0.20)"
                background="rgba(255, 255, 255, 0.10)"
                // p="24px"
                p="16px"
                w="100%"
                color="#fff"
                _hover={{background: 'rgba(255, 255, 255, 0.10)'}}
                onClick={download_android}
              >
                <Text fontWeight={'400'} fontSize={'14px'}>
                  Click here to download APK
                </Text>
              </Link>
              <Divider
                background="rgba(255, 255, 255, 0.10)"
                border="none"
                height="1px"
                my="24px"
              />
              <Text mb="8px" fontWeight={'600'}>
                For Apple Users
              </Text>
              <Text mb="16px" color="#DDDDDD" fontSize={'14px'}>
                Input the ID(s) you wish to grant access
              </Text>

              <VStack as="form" alignItems={'flex-start'} gap="16px">
                <AnimateInput
                  isAuth
                  type="text"
                  w="full"
                  placeholder="Enter Apple ID"
                  borderRadius="8px"
                  border="1px solid #11476D"
                  background="#082234"
                  p="14px 16px"
                  labelFontS={'14px'}
                  labelColor={'#919191'}
                  _placeholder={{
                    color: '#919191',
                  }}
                  value={appleID1}
                  onChange={e => setAppleID1(e.target.value)}
                  _hover={{border: '1px solid #11476D'}}
                  _focus={{border: '1px solid #11476D'}}
                  _focusVisible={{border: '1px solid #11476D'}}
                  _active={{border: '1px solid #11476D'}}
                />
                <AnimateInput
                  isAuth
                  type="text"
                  w="full"
                  placeholder="Enter Apple ID"
                  borderRadius="8px"
                  border="1px solid #11476D"
                  background="#082234"
                  p="14px 16px"
                  labelFontS={'14px'}
                  labelColor={'#919191'}
                  _placeholder={{
                    color: '#919191',
                  }}
                  value={appleID2}
                  onChange={e => setAppleID2(e.target.value)}
                  _hover={{border: '1px solid #11476D'}}
                  _focus={{border: '1px solid #11476D'}}
                  _focusVisible={{border: '1px solid #11476D'}}
                  _active={{border: '1px solid #11476D'}}
                />
                <AnimateInput
                  isAuth
                  type="text"
                  w="full"
                  placeholder="Enter Apple ID"
                  borderRadius="8px"
                  border="1px solid #11476D"
                  background="#082234"
                  p="14px 16px"
                  labelFontS={'14px'}
                  labelColor={'#919191'}
                  _placeholder={{
                    color: '#919191',
                  }}
                  value={appleID3}
                  onChange={e => setAppleID3(e.target.value)}
                  _hover={{border: '1px solid #11476D'}}
                  _focus={{border: '1px solid #11476D'}}
                  _focusVisible={{border: '1px solid #11476D'}}
                  _active={{border: '1px solid #11476D'}}
                />
                <Button
                  borderRadius="72px"
                  border="1px solid rgba(255, 255, 255, 0.20)"
                  background="rgba(255, 255, 255, 0.10)"
                  p="24px"
                  w="100%"
                  color="#fff"
                  _hover={{background: 'rgba(255, 255, 255, 0.10)'}}
                  isDisabled={downloading}
                  onClick={download_ios}
                >
                  <Text fontWeight={'400'} fontSize={'14px'}>
                    Proceed
                  </Text>
                </Button>
              </VStack>
            </ModalBody>
            <ModalFooter
              background="#243E54"
              p="16px 49px"
              color="#DDD"
              fontSize="12px"
              borderRadius="0px 0px 20px 20px"
            >
              Only the APK is automatically generated for Android users. Due to limitations with
              Apple&apos;s platform, iOS users will be manually invited. Please download TestFlight
              and provide your email for access.
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  );
};
