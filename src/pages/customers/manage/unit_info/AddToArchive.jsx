import {HStack, Image, Text, useDisclosure, useToast, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Button, Input, Popup} from '../../../../ui-lib/ui-lib.components';
import successGif from '/src/images/check-icon.gif';
import {useMutation} from '@tanstack/react-query';
import {MdOutlineArchive} from 'react-icons/md';

import {addUnitsToArchive} from '../../../../apis/listings';

export const AddToArchive = ({unitInfo, refetch, bundleId}) => {
  const ArchiveInfo = useDisclosure();
  const toast = useToast();
  const ArchiveSuccess = useDisclosure();
  // const VerifyBlacklistOTP = useDisclosure();
  const [unitsToArchive, setUnitsToArchive] = useState(1);

  const mutation = useMutation(formData => addUnitsToArchive(bundleId, formData), {
    onSuccess: res => {
      console.log(res);
      ArchiveInfo.onClose();
      ArchiveSuccess.onOpen();
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `An error occured while archiving was in progress`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleArchive = () => {
    !unitsToArchive || unitsToArchive == 0 || unitsToArchive == ''
      ? toast({
          title: 'Error',
          description: `Number of units must be greater than zero`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      : unitsToArchive >= unitInfo?.total_quantity
        ? toast({
            title: 'Error',
            description: `You cannot add more than the available unit quantity`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          })
        : mutation.mutate({
            status: true,
            amount: Number(unitsToArchive),
          });
  };
  return (
    <div>
      <HStack onClick={ArchiveInfo.onOpen} p="1.2em" spacing="20px">
        <MdOutlineArchive style={{color: 'tomato', fontSize: '24px'}} />
        <Text color="#4545FE" fontSize="18px" fontWeight={500}>
          {`Archive unit(s)`}
        </Text>
      </HStack>

      <Popup
        minW="455px"
        minH="312px"
        pt="35px"
        pb="35px"
        isOpen={ArchiveInfo.isOpen}
        onClose={ArchiveInfo.onClose}
        isCentered
      >
        <Text fontSize="24px" fontWeight={600}>
          Add to Archive
        </Text>
        <Popup.Body mb={4}>
          {/* <Image src={lock.src} boxSize='88px' mt='25px' mx='auto' /> */}
          {/* <VStack w='full' px={0.2} pt={4}>
						<Text fontSize='14px' textAlign='center'>
							You are about to take some of this unit off the online store
						</Text>
					</VStack> */}
          <VStack w="full" pt={6}>
            <Input
              mx={1}
              required
              type="text"
              name="Number of units to archive"
              onChange={e => setUnitsToArchive(e.target.value)}
              value={unitsToArchive}
              placeholder="how many units do you want to archive?"
              _placeholder={{
                color: 'gray.500',
              }}
            />
          </VStack>
          <Button
            isDisabled={!unitsToArchive || unitsToArchive == 0 || unitsToArchive == ''}
            type="submit"
            onClick={handleArchive}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
            borderRadius="72px"
          >
            Proceed
          </Button>
        </Popup.Body>
      </Popup>

      {/* Archive success */}
      <Popup
        pt="45px"
        pb="15px"
        h="392px"
        isCentered
        minW="425px"
        isOpen={ArchiveSuccess.isOpen}
        onClose={ArchiveSuccess.onClose}
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          {`${unitsToArchive > 1 ? 'Units' : 'Unit'} added to Archive successfully`}
        </Text>
        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              {`You have successfully added ${unitsToArchive} ${
                unitsToArchive > 1 ? 'units' : 'unit'
              } to your archive`}
            </Text>
          </VStack>
          <Button onClick={ArchiveSuccess.onClose} variant="primary" mx="auto" w="321px" h="55px">
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default AddToArchive;
