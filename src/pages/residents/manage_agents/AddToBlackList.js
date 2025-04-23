import React from 'react';
import Info_circle from '/src/images/icons/Info_circle.png';
import info_blacklist from '/src/images/icons/Info_circle_.png';

import {useToast, useDisclosure, Text, VStack, Image, Flex} from '@chakra-ui/react';
import {blackListAgent, whiteListAgent} from '../../../apis/manageAgent';
import {useMutation} from '@tanstack/react-query';
import {Popup, Button} from '../../../ui-lib/ui-lib.components';
import lock from '/src/images/lock.png';

const AddToBlackList = ({info, isError, refetch}) => {
  const restrictionInfo = useDisclosure();

  const toast = useToast();
  const mutation = useMutation(id => blackListAgent(id), {
    onSuccess: res => {
      console.log(res, refetch);
      refetch();
      toast({
        title: 'Agent has been blacklisted',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'oops,something went wrong',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {mutate} = useMutation(body => whiteListAgent(body), {
    onSuccess: res => {
      console.log(res);
      refetch();

      toast({
        title: 'Agent has been reinstated',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'oops,something went wrong',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const blacklist = () => {
    mutation.mutate(info.id);
    return restrictionInfo.onClose();
  };

  const whitelist = () => {
    mutate(info.id);
    return restrictionInfo.onClose();
  };

  return (
    <>
      <Button
        isDisabled={isError}
        bg={!info?.status ? '#FF91031A' : '#FF6A6A1A'}
        onClick={restrictionInfo.onOpen}
        h="48px"
        borderRadius="12px"
        w={info?.status ? '170px' : '241px'}
        px="10px"
        mt="0px"

        // border={!info.status && "1px solid #000000"}
      >
        <Flex w="full" align="center" justifyContent="center" gap="12px">
          {
            <Image
              alt=""
              src={info?.status ? Info_circle.src : info_blacklist.src}
              boxSize="24px"
            />
          }

          <Text
            fontSize="18px"
            fontWeight="500"
            color={!info?.status ? '#FF9103' : '#FF6A6A'}
            as="span"
          >
            {!info?.status ? 'Remove from Blacklist' : 'Blacklist'}
          </Text>
        </Flex>
      </Button>
      <Popup
        minW="425px"
        minH="392px"
        pt="35px"
        pb="35px"
        isOpen={restrictionInfo.isOpen}
        onClose={restrictionInfo.onClose}
        isCentered
      >
        <Image alt="" src={lock.src} boxSize="88px" mt="25px" mx="auto" />

        <Popup.Body mb={8}>
          <Text fontSize="24px" fontWeight={600}>
            {info?.status ? 'Add to Blacklist' : 'Remove From Blacklist'}
          </Text>
          <VStack w="full" px={0.2} pt={4}>
            <Text fontSize="14px" textAlign="center">
              {info?.status
                ? 'You are about to add this customer to your blacklist, customer would no longer be able to access your listings'
                : 'You are about to remove this customer from your blacklist, customer would be able to access your listings'}
            </Text>
          </VStack>
        </Popup.Body>
        <Button
          onClick={info?.status ? blacklist : whitelist}
          variant="primary"
          mx="auto"
          w="321px"
              borderRadius='72px'
              h="55px"
        >
          Proceed
        </Button>
      </Popup>
    </>
  );
};

export default AddToBlackList;
