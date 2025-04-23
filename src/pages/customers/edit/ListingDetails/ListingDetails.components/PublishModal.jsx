import {motion} from 'framer-motion';
import {Flex, Image, Stack, Text, useDisclosure, useToast, VStack} from '@chakra-ui/react';

import {themeStyles} from '../../../../../theme';
import {Button, Popup, SwalError} from '../../../../../ui-lib';
import publicListingIcon from '/src/images/icons/publish-publicly.png';
import privateListingIcon from '/src/images/icons/publish-privately.png';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {publishProject} from '../../../../../apis/listings';
import {PublishSuccessModal} from './PublishSuccessModal';

export const PublishModal = ({listingInfo, internalCommission, externalCommission, contact_id}) => {
  const toast = useToast();
  const PublishListingModal = useDisclosure();
  const PublishSuccessPrivateModal = useDisclosure();
  const PublishSuccessPublicModal = useDisclosure();
  const [isPrivate, setIsPrivate] = useState(null);
  const projectId = JSON.parse(localStorage.getItem('newProjectId'));
  const mutation = useMutation(formData => publishProject(formData), {
    onSuccess: res => {
      console.log(res);
      isPrivate == true && PublishSuccessPrivateModal.onOpen();
      isPrivate == false && PublishSuccessPublicModal.onOpen();
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `${
          err?.response?.data?.message ||
          err?.response?.message ||
          `An error occured while publish was in progress`
        }`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handlePrivate = arg => {
    if (arg == 'private') {
      setTimeout(() => {
        mutation.mutate({
          project: projectId,
          contact_id: '',
          is_private: true,
          internal: internalCommission,
          external: externalCommission,
          project_status: listingInfo && listingInfo.status,
        });
      }, 2000);
      setIsPrivate(true);
      // PublishSuccessPrivateModal.onOpen()
    }
    if (arg == 'public') {
      setTimeout(() => {
        mutation.mutate({
          project: projectId,
          contact: '',
          is_private: false,
          internal: internalCommission,
          external: externalCommission,
          project_status: (listingInfo && listingInfo?.status) ?? 'In Construction',
        });
      }, 2000);
      // PublishSuccessPublicModal.onOpen();
      setIsPrivate(false);
    }
  };
  return (
    <div>
      <Button mt={0} variant="primary" borderRadius="12px" onClick={PublishListingModal.onOpen}>
        Publish Listing 🎉
      </Button>

      <Popup
        mx="auto"
        minH="459px"
        minW={{base: '90%', md: '776px'}}
        isOpen={PublishListingModal.isOpen}
        onClose={PublishListingModal.onClose}
        isCentered
      >
        <Popup.Body maxW="722px" h="full">
          <Popup.Header mt={-8} fontSize="24px" color="#191919" fontWeight={600} textAlign="left">
            Publish Method
          </Popup.Header>
          <Flex justify="space-evenly" w="full" mx="auto">
            <motion.div
              exit={{opacity: 0, x: '10vw'}}
              initial={{opacity: 0, x: '-3vw'}}
              animate={{opacity: [0, 0.5, 1], x: 0}}
              transition={{
                type: 'spring',
                stiffness: '20',
                delay: 0.1,
              }}
            >
              <Stack
                maxW="349px"
                h="350px"
                pt="37px"
                pl="33px"
                pb="27px"
                spacing={4}
                border="1px solid #e5e5e5"
                borderRadius="md"
              >
                <Image alt="" src={publicListingIcon.src} boxSize="64px" />
                <Text fontSize="28px" color="#191919" textAlign="left" fontWeight={700}>
                  Publicly
                </Text>
                <Text fontSize="14px" textAlign="left" maxW="284px" fontWeight={400}>
                  Aliquam erat volutpat. Duis pharetra id sem sit amet ultricies. Aenean eu
                  ultricies elit. Mauris facilisis quis quam quis commodo.
                </Text>
                <Button
                  w="217px"
                  variant="dark"
                  textAlign="left"
                  disabled={isPrivate == false}
                  borderRadius="12px"
                  bg={themeStyles.color.primary}
                  onClick={() => handlePrivate('public')}
                >
                  Publish Publicly
                </Button>
              </Stack>
            </motion.div>
            <motion.div
              exit={{opacity: 0, x: '10vw'}}
              initial={{opacity: 0, x: '3vw'}}
              animate={{opacity: [0, 0.5, 1], x: 0}}
              transition={{
                type: 'spring',
                stiffness: '20',
                delay: 0.1,
              }}
            >
              <Stack
                maxW="349px"
                h="350px"
                pt="37px"
                pl="33px"
                pb="27px"
                spacing={4}
                border="1px solid #e5e5e5"
                borderRadius="md"
              >
                <Image alt="" src={privateListingIcon.src} boxSize="64px" />
                <Text fontSize="28px" color="#191919" textAlign="left" fontWeight={700}>
                  Privately
                </Text>
                <Text fontSize="14px" textAlign="left" maxW="284px" fontWeight={400}>
                  Aliquam erat volutpat. Duis pharetra id sem sit amet ultricies. Aenean eu
                  ultricies elit. Mauris facilisis quis quam quis commodo.
                </Text>
                <Button
                  w="217px"
                  variant="dark"
                  textAlign="left"
                  disabled={isPrivate == true}
                  borderRadius="12px"
                  onClick={() => handlePrivate('private')}
                >
                  Publish Privately
                </Button>
                <PublishSuccessModal
                  PublishSuccessPrivateModal={PublishSuccessPrivateModal}
                  PublishSuccessPublicModal={PublishSuccessPublicModal}
                />
              </Stack>
            </motion.div>
          </Flex>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default PublishModal;
