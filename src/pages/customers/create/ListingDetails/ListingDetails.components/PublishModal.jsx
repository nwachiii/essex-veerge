import {FaCircleInfo} from 'react-icons/fa6';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Button, Popup} from '../../../../../ui-lib';
import {publishProject} from '../../../../../apis/listings';
import {
  PublishSuccessModal,
  keysToClearOutOnListingCreationCompletion,
} from './PublishSuccessModal';
import {
  Center,
  Spinner,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
  HStack,
} from '@chakra-ui/react';

import publicListingIcon from '/src/images/icons/publish-publicly.svg';
import privateListingIcon from '/src/images/icons/publish-privately.svg';
import {MatadorCustomToast} from 'pages/veerge_menu/loop/home';
import {clearLocalStorage} from 'utils/clearLocalStorage';
import {useRouter} from 'next/router';

export const PublishModal = ({
  listingInfo,
  isCreate,
  internalCommission,
  externalCommission,
  contact_id,
}) => {
  const toast = useToast();
  const router = useRouter();
  const PublishListingModal = useDisclosure();
  const PublishSuccessPrivateModal = useDisclosure();
  const PublishSuccessPublicModal = useDisclosure();
  const [isPrivate, setIsPrivate] = useState(null);
  const [isAtTheBottom, setIsAtTheBottom] = useState(false);
  const projectId = JSON.parse(localStorage.getItem('newProjectId'));

  const handleNextSteps = () => {
    clearLocalStorage(keysToClearOutOnListingCreationCompletion);
    router.push(`/listings/manage?listingId=${projectId}`);
  };

  const mutation = useMutation(formData => publishProject(formData), {
    onSuccess: res => {
      console.log(res);
      toast({
        title: 'Listing Successfully Created',

        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      handleNextSteps();
      // isPrivate == true && PublishSuccessPrivateModal.onOpen();
      // isPrivate == false && PublishSuccessPublicModal.onOpen();
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
      toast({
        render: () => (
          <MatadorCustomToast
            background={'black'}
            description={
              <HStack w={'full'} gap={2}>
                <FaCircleInfo size={25} />
                <Text fontSize={16}>Contact support to give you support for this feature</Text>
              </HStack>
            }
          />
        ),
        duration: 7000,
        isClosable: true,
        position: 'top-right',
      });
      setIsPrivate(true);
    }
    if (arg == 'public') {
      setTimeout(() => {
        mutation.mutate({
          project: projectId,
          contact: contact_id,
          is_private: false,
          internal: internalCommission,
          external: externalCommission,
          project_status: (listingInfo && listingInfo?.status) ?? 'In Construction',
        });
      }, 2000);
      setIsPrivate(false);
    }
  };

  return (
    <div>
      <Center w="full" alignSelf={'center'} mt="30px">
        {isCreate ? (
          <Flex
            w="full"
            px={{base: '16px', xl: '78px'}}
            pos="fixed"
            maxW="1500px"
            mx="auto"
            // bottom="0px"
            right="0"
            left="0"
            zIndex={100}
            top={{
              base: 'calc(clamp(52px,calc(10.4vh + 40px),126px) + 16px)',
              xl: 'calc(clamp(52px,calc(10.4vh + 40px),150px) + 16px)',
            }}
            justifyContent="flex-end"
          >
            <HStack justify="end">
              <Button
                mt="0px"
                h="55px"
                variant="primary"
                borderRadius="72px"
                onClick={() => handlePrivate('public')}
              >
                {mutation?.isLoading ? <Spinner color="#FFFFFF" /> : `Publish now`}
              </Button>
            </HStack>
          </Flex>
        ) : (
          <Button mt={0} variant="primary" borderRadius="12px" onClick={PublishListingModal.onOpen}>
            Publish now
          </Button>
        )}
      </Center>

      <Popup
        mx="auto"
        minH="459px"
        minW={{base: '90%', md: '776px'}}
        isOpen={PublishListingModal.isOpen}
        onClose={PublishListingModal.onClose}
        isCentered
      >
        <Popup.Header mt={-8} ml={-8} mb={-4}>
          <Text fontSize={28} fontWeight={600}>
            How do you want to publish this listing?
          </Text>
        </Popup.Header>
        <Popup.Body maxW="722px" h="full">
          <Flex direction={'column'} gap={6} justify="space-evenly" w="full" mx="auto">
            <Stack
              p={6}
              spacing={2}
              border="1px solid #E4E4E4"
              borderRadius="lg"
              _hover={{
                border: `1.5px solid #C7C7C7`,
              }}
              cursor={'pointer'}
              onClick={() => handlePrivate('public')}
            >
              <Image alt="" src={publicListingIcon.src} boxSize="40px" />
              <Text fontSize="20px" color="#191919" fontWeight={500}>
                Publicly
              </Text>
              <Text fontSize="14px">
                By choosing this, you&apos;re opting for maximum visibility and the listing will be
                accessible to a wide audience, increasing your chances of reaching potential buyers
              </Text>
            </Stack>
            <Stack
              p={6}
              spacing={2}
              border="1px solid #E4E4E4"
              borderRadius="lg"
              onClick={() => handlePrivate('private')}
              cursor={'pointer'}
              _hover={{
                border: `1.5px solid #C7C7C7`,
              }}
            >
              <Image alt="" src={privateListingIcon.src} boxSize="35px" />
              <Text fontSize="20px" color="#191919" fontWeight={500}>
                Privately
              </Text>
              <Text fontSize="14px">
                By choosing this, you&apos;re opting for a more controlled visibility of your
                listing and will be accessible only to a select audience, offering a discreet and
                targeted approach.
              </Text>
            </Stack>
            <PublishSuccessModal
              PublishSuccessPrivateModal={PublishSuccessPrivateModal}
              PublishSuccessPublicModal={PublishSuccessPublicModal}
            />
          </Flex>
        </Popup.Body>
      </Popup>
    </div>
  );
};
export default PublishModal;
