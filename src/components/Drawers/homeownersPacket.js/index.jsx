import {
  HStack,
  Image,
  Text,
  VStack,
  Spinner,
  Heading,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  TabIndicator,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  TabList,
  DrawerFooter,
  Input,
  useToast,
  Box,
} from '@chakra-ui/react';
import {useRef, useState} from 'react';
import uploadIcon from '/src/images/icons/uploadForHomeOwnerPacket.svg';

import {packetTabs} from './packetTabs';
import {toastForError} from '../../../utils/toastForErrors';
import {encodeFileToBase64} from '../../../utils';
import {fetchInvestorPackets, sendInvestorPackets} from '../../../apis/payment';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CreateToast} from '/src/ui-lib/ui-lib.components/Toast/createToast.js';

export const HomeOwnersPacket = ({equityId, Home_Onwers_Packets_Modal}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const inputRef = useRef(null);

  const toast = useToast();
  const toaster = CreateToast();
  const queryClient = useQueryClient();

  const handleTabChange = index => {
    setTabIndex(index);
  };
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #fffff',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: 'rgba(25, 25, 25, 0.6)',
    },
  };
  const HOME__OWNERS__PACKETS = useQuery(['InvestorsPackets', equityId], () =>
    fetchInvestorPackets(equityId)
  );

  const {mutate, isLoading} = useMutation(
    formData => {
      sendInvestorPackets(equityId, formData);
    },
    {
      onSuccess: async res => {
        queryClient.invalidateQueries(['InvestorsPackets', equityId]);

        await HOME__OWNERS__PACKETS.refetch();
        toaster('Document uploaded successfully', {
          bg: '#191919',
          color: '#fff',
          h: '40px',
        });
        inputRef.current.value = '';
      },
      onError: err => {
        inputRef.current.value = '';

        toastForError(err, true, toast);
      },
    }
  );

  const handleUpload = e => {
    let based = [];
    const files = e.target.files[0];

    encodeFileToBase64(files).then(filed => {
      const body = {
        packet: filed.replace('data:', '').replace(/^.+,/, ''),
        packet_name: files?.name,
      };

      return mutate(body);
    });
  };

  const packetArray = [
    ...(HOME__OWNERS__PACKETS?.data?.data?.received ?? []),
    ...(HOME__OWNERS__PACKETS?.data?.data?.sent ?? []),
  ];

  return (
    <div>
      <Drawer
        isOpen={Home_Onwers_Packets_Modal?.isOpen}
        onClose={Home_Onwers_Packets_Modal?.onClose}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
          <HStack
            pt="15.23px"
            pb="14.47px"
            boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
            pl="23.25px"
            pr="15.23px"
            w="full"
            justify="space-between"
          >
            <Heading p="0px" fontSize="16px" fontWeight="600" borderBottom="none" color="#191919">
              {"Owner's Packet"}
            </Heading>
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
          <DrawerBody p="0">
            <Tabs variant="null" onChange={handleTabChange} isFitted align="center" isLazy>
              <TabList
                bg="transparent"
                boxShadow="none"
                fontWeight="600"
                fontSize="18px"
                lineHeight="23px"
                color="lightgray"
                maxW="100%"
                px="0px"
                py="0px"
              >
                <HStack
                  borderBottom="0.5px solid #919191"
                  maxW="402.4px"
                  borderRadius="0px"
                  w="full"
                  px="58.7px"
                  pr="57.9px"
                  justify="space-between"
                  align="center"
                >
                  {packetTabs.map((item, index) => (
                    <Tab
                      key={index}
                      wordBreak="keep-all"
                      maxW="56px"
                      w="56px"
                      pb="3px"
                      pt="15.99px"
                      color="rgba(25,25,25)"
                      _selected={{
                        color: 'rgba(25, 25, 25, 0.6)',
                        border: 'none',
                      }}
                    >
                      <Text w="56px" fontWeight="300" fontSize="12.826px" whiteSpace="nowrap">
                        {item.tablist}
                      </Text>
                      {/* {tabIndex === index && (
                  <Box
                    mx="auto"
                    h="4px"
                    w="100px"
                    borderRadius="27px"
                    bg="#000000"
                  />
                )} */}
                    </Tab>
                  ))}
                </HStack>
              </TabList>
              <TabIndicator
                mt="-2px"
                height="4px"
                minW="60.92px"
                bg="#191919"
                borderRadius="27px"
              />
              <TabPanels sx={customScrollbarStyles} h="65.2vh" overflow="auto">
                {packetTabs.map((item, index) => (
                  <TabPanel key={index} px="0px" pt="0px" h="full">
                    <Box>{item.component(HOME__OWNERS__PACKETS, equityId)}</Box>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter mt="10px" position="relative" mb="18.83px">
            <HStack
              h="44.89px"
              bg="#191919"
              borderRadius="72px"
              position="relative"
              w="full"
              align="center"
              cursor="pointer"
              justify="center"
              spacing="8px"
            >
              <Input
                type="file"
                w="full"
                opacity="0"
                h="full"
                position="absolute"
                ref={inputRef}
                onChange={handleUpload}
                top="0"
                cursor="pointer"
                left="0"
                accept=".pdf"
                // multiple
                isDisabled={isLoading}
                _disabled={{bg: 'transparent', opacity: '0'}}
              />
              {isLoading ? (
                <Spinner color="#fff" />
              ) : (
                <>
                  <Image boxSize="19.238px" src={uploadIcon.src} alt="upload icon" />
                  <Text color="#fff" fontSize="14.429px" fontWeight="400">
                    Upload
                  </Text>
                </>
              )}
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HomeOwnersPacket;
