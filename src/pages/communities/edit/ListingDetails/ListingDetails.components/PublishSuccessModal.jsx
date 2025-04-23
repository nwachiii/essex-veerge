import {CopyIcon} from '@chakra-ui/icons';
import {Box, Flex, Image, Input, Text, useClipboard, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {Button, Popup} from '../../../../../ui-lib';
import successGif from '/src/images/check-icon.gif';

export const PublishSuccessModal = ({PublishSuccessPrivateModal, PublishSuccessPublicModal}) => {
  const router = useRouter();
  const [value, setValue] = useState('matador.private/list-0083920');
  const {hasCopied, onCopy} = useClipboard(value);
  return (
    <div>
      <Popup
        minW="425px"
        pt="45px"
        pb="15px"
        h="392px"
        isOpen={PublishSuccessPublicModal.isOpen}
        onClose={PublishSuccessPublicModal.onClose}
        isCentered
      >
        <Image alt="" src={successGif.src} w="108px" mx="auto" />

        <Popup.Header>
          <Text textAlign="center" fontSize="24px" fontWeight={600}>
            Listing Published Publicly
          </Text>
        </Popup.Header>
        <Popup.Body mt={-2}>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              You have successfully published your listing publicly.
            </Text>
          </VStack>
          <Button
            onClick={() => router.push('/listings')}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
          >
            OK
          </Button>
        </Popup.Body>
      </Popup>
      <Popup
        px="45px"
        pt="70px"
        minH="448px"
        minW={{base: '90%', md: '349px'}}
        isOpen={PublishSuccessPrivateModal.isOpen}
        onClose={PublishSuccessPrivateModal.onClose}
      >
        <Text color="#191919" fontSize="28px" fontWeight={700} maxW="291px">
          Share this private link to invite members
        </Text>
        <Popup.Description>
          <Flex my={6} position="relative" align="center">
            <Input value={value} isReadOnly placeholder="Welcome" />
            <Box onClick={onCopy} ml={2} position="absolute" right="2%">
              {hasCopied ? (
                <small>
                  <b>Copied</b>
                </small>
              ) : (
                <CopyIcon cursor="pointer" w={8} h={8} />
              )}
            </Box>
          </Flex>
          <Text align="left" my={6} fontSize="14px" color="#191919" maxW="327px">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos orbi non justo vulputate.
          </Text>
        </Popup.Description>
        <Button w="321px" variant="primary" onClick={() => router.push('/listings')}>
          OK
        </Button>
      </Popup>
    </div>
  );
};

export default PublishSuccessModal;
