import React from 'react';
import {Button, Popup2} from 'ui-lib/ui-lib.components';
import {
  ModalCloseButton,
  useToast,
  SimpleGrid,
  Center,
  ModalFooter,
  Image,
  Heading,
  useDisclosure,
  VStack,
  HStack,
  Text,
  StackDivider,
  Spinner,
  Box,
} from '@chakra-ui/react';
import cancelIcon from '/src/images/icons/cancel_icon.png';
import paper from '/src/images/icons/Paper_Negative.png';

import successIcon from '/src/images/icons/check-icon-unscreen.gif';
import {deleteTeamMember, fetchRolesPending} from '/src/apis/settings';
import {useQuery, useMutation} from '@tanstack/react-query';
// import { Spinner } from "@/components/common/loaders/AnimatedLoader";
import {changeDateFormat} from '/src/utils/formatDate';
import {MdCancel} from 'react-icons/md';

import bgPattern from '/src/images/brand/bg-pattern.svg';

const SuccessOnInvite = ({close, refetch, id}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();

  const mutation = useMutation(
    id => {
      return deleteTeamMember(id);
    },
    {
      onSuccess: res => {
        return onOpen();
      },
      onError: err => {
        console.log(err);
        onClose();
        close();
        return toast({
          title: 'An error occured',
          description: `${
            err?.response?.message ??
            err?.response?.data ??
            err?.message ??
            err?.code ??
            'An error occured'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const handleCancel = () => {
    return mutation.mutate(id);
  };
  return (
    <>
      <VStack spacing="31px" w="full">
        <Button
          alignSelf="strech"
          type="submit"
          variant="violet"
          borderRadius="72px"
          onClick={handleCancel}
          isLoading={mutation.isLoading}
        >
          Proceed
        </Button>
        <Text fontSize="18px" cursor="pointer" onClick={() => close()} fontWeight="400">
          No, go back
        </Text>
      </VStack>
      <Popup2
        isOpen={isOpen}
        onClose={onClose}
        px={'112px'}
        py={'33px'}
        pb="36px"
        maxW="649px"
        minW="fit-content"
        maxH="fit-content"
        borderRadius="18px"
        // h="fit-content"
      >
        <Popup2.Header>
          <HStack justify="center" w="100%">
            <Image alt="" objectFit="contain" src={successIcon.src} boxSize="88px" />
          </HStack>
        </Popup2.Header>
        <ModalCloseButton onClick={async () => await refetch()} />
        <Popup2.Body my="0px" p="0px">
          <Heading mt="15px" textAlign="center" fontSize="24px" w="299px" fontWeight="600">
            Invitation cancelled successfully
          </Heading>
        </Popup2.Body>
        <ModalFooter py="0" mt="15px" px={'0px'}>
          <VStack w={'100%'}>
            <Button
              alignSelf="strech"
              type="submit"
              variant="violet"
              onClick={async () => {
                await refetch();
                close();
                return onClose();
              }}
            >
              Ok
            </Button>
          </VStack>
        </ModalFooter>
      </Popup2>
    </>
  );
};

const CancelInvite = ({id, refetch}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        justifySelf="center"
        variant="secondary"
        width={'fit-content'}
        color={'black'}
        borderColor={'black'}
        borderRadius="72px"
        fontSize="14px"
        _hover={{borderColor: 'black'}}
        px="22px"
        py="8.5px"
        mt="0px"
        h="fit-content"
      >
        Cancel
      </Button>
      <Popup2
        isOpen={isOpen}
        onClose={onClose}
        px={'112px'}
        py={'33px'}
        pb="36px"
        maxW="649px"
        minW="fit-content"
        maxH="fit-content"
        borderRadius="18px"
        // h="fit-content"
      >
        <Popup2.Header>
          <HStack justify="center" w="100%">
            <Image alt="" objectFit="cover" src={cancelIcon.src} boxSize="68px" />
          </HStack>
        </Popup2.Header>
        <ModalCloseButton />
        <Popup2.Body my="0px" p="0px">
          <VStack spacing="10px" mt="20.67px">
            <Heading fontSize="24px" fontWeight="600">
              Cancel invite
            </Heading>
            <Text maxW="364px" textAlign="center" fontSize="16px" fontWeight="300">
              Are you sure you want to cancel this invitation?
            </Text>
          </VStack>
        </Popup2.Body>

        <ModalFooter py="0" mt="15px" px={'0px'}>
          <VStack w={'100%'}>
            <SuccessOnInvite id={id} refetch={refetch} close={onClose} />
          </VStack>
        </ModalFooter>
      </Popup2>
    </>
  );
};

const PendingRoles = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data, isError, isLoading, error, refetch} = useQuery(
    ['fetchDeveloperRoles'],
    fetchRolesPending
  );
  const toast = useToast();

  // console.log(data?.data?.results);

  const handlePending = async () => {
    await refetch();
    return onOpen();
  };

  if (isError) {
    onClose();
    return toast({
      title: 'Oops ...',
      description: `${
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        'Something went wrong,kindly check your network connection'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <>
      <Button
        mt={0}
        onClick={handlePending}
        variant="secondary"
        width={'fit-content'}
        color={' #1919D8'}
        borderColor={'#1919D8'}
        _hover={{borderColor: 'black'}}
      >
        Pending invites
      </Button>
      <Popup2
        pb="23px"
        h="480px"
        px={'30px'}
        py={'19px'}
        minW="750px"
        hideCloseButton
        isOpen={isOpen}
        onClose={onClose}
        maxW="fit-content"
        borderRadius="18px"
      >
        <Popup2.Header>
          <HStack pb={4} borderBottom={'1px solid #E5E5E5'} justify={'space-between'} w="full">
            <Text>Pending invites</Text>
            <MdCancel
              onClick={onClose}
              fontSize={'28px'}
              style={{cursor: 'pointer', color: '#191919'}}
            />
          </HStack>
        </Popup2.Header>

        <Popup2.Body px="0" w="100%" bgImage={bgPattern.src}>
          {isLoading ? (
            <Spinner />
          ) : (
            <VStack align="flex-start" w="full" divider={<StackDivider borderColor="gray.200" />}>
              {data?.data?.results?.length < 1 ? (
                <Center h="314px" w="649px">
                  <VStack w="100%" spacing="22">
                    <Image alt="" src={paper.src} w="45px" h="52px" />
                    <Text fontSize="18px" fontWeight={400} as="span">
                      There are no pending invitation
                    </Text>
                  </VStack>
                </Center>
              ) : (
                <SimpleGrid
                  ml="0"
                  spacing="30px"
                  alignItems="center"
                  justifyItems="start"
                  gap="20px"
                  py="17px"
                  px="0"
                  w="full"
                  gridTemplateColumns="max-content max-content 170px max-content max-content "
                >
                  {data?.data?.results?.map((info, idx) => {
                    const infoArray = [(idx + 1 <= 9 ? '0' : '') + (idx + 1) + '.'];
                    Object.entries(info).map(([key, value], idx) => {
                      if (key === 'role') {
                        return (infoArray[1] = (
                          <Text
                            as="span"
                            textAlign="start"
                            w="fit-content"
                            maxW="150px"
                            fontSize="16px"
                            fontWeight="400"
                            color="#191919"
                            textTransform="capitalize"
                          >
                            {value.replaceAll('_', ' ')}
                          </Text>
                        ));
                      }
                      if (key === 'email') {
                        return (infoArray[2] = (
                          <Text
                            w="fit-content"
                            as="span"
                            color="#1919D8"
                            textAlign="start"
                            sx={{
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              wordBreak: 'break-word',
                              // maxWidth: "200px",
                            }}
                            fontSize="14px"
                            fontWeight="400"
                            // whiteSpace="break-spaces"
                          >
                            {value}
                          </Text>
                        ));
                      }
                      if (key === 'invited_on') {
                        return (infoArray[3] = (
                          <Text fontSize="14px" fontWeight="400">
                            {changeDateFormat(value, 'add_time')}{' '}
                          </Text>
                        ));
                      }
                      if (key === 'id') {
                        return (infoArray[4] = <CancelInvite id={value} refetch={refetch} />);
                      }
                    });
                    return infoArray.map((text, index) => {
                      return <Box key={index}>{text}</Box>;
                    });

                    <HStack key={item.id} align="center" w="100%"></HStack>;
                  })}
                </SimpleGrid>
              )}
            </VStack>
          )}
        </Popup2.Body>
      </Popup2>
    </>
  );
};

export default PendingRoles;
