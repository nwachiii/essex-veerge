import React from 'react';
import {useRouter} from 'next/router';
import {Button, Popup} from '../../../ui-lib';
import {HStack, Image, Text, VStack} from '@chakra-ui/react';

import lock from '/src/images/icons/cancel_icon.png';
import successGif from '/src/images/check-icon.gif';

export const EditSuccessModal = ({modal, projectId}) => {
  const router = useRouter();

  const handleGotoListingDetail = () => {
    localStorage.removeItem('listingInfo')
    router.push(`/listings/manage/?listingId=${projectId}`)
  }
  return (
    <div>
      <Popup
        closeOnOverlayClick={false}
        hideCloseBtn
        minW="435px"
        minH="252px"
        pt="25px"
        pb="38px"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        isCentered
      >
        <Image alt="" src={successGif.src} w="108px" mx="auto" />
        <Popup.Body mb={4}>
          <VStack w="full" px={6} pt={2} spacing={'12px'}>
            <Text fontWeight="600" fontSize="24px" textAlign="center">
              Project Update Successful!
            </Text>
          </VStack>
        </Popup.Body>
        <HStack w="full" justify={'flex-end'} spacing={'13px'}>
          <Button
            onClick={() => router.push(`/listings`)}
            color="#191919"
            border={'1px solid #191919'}
            bg="#EFEFEF"
            variant="primary"
            mx="auto"
            w="161px"
            h="48px"
          >
            Close
          </Button>
          <Button
            fontWeight="400"
            onClick={handleGotoListingDetail}
            variant="dark"
            mx="auto"
            w="fit-content"
            h="48px"
          >
            Go to listing detail
          </Button>
        </HStack>
      </Popup>
    </div>
  )
};

export default EditSuccessModal;
