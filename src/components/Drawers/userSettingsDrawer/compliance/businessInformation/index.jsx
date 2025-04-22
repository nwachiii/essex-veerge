import {
  Box,
  Center,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  HStack,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {CiGlobe} from 'react-icons/ci';
import {LuPhoneCall} from 'react-icons/lu';
import {FaXTwitter} from 'react-icons/fa6';
import {LiaLinkedin} from 'react-icons/lia';
import {HiOutlinePencil} from 'react-icons/hi';
import {EditBusinessDrawer} from './EditDrawer';
import {FiFacebook, FiInstagram} from 'react-icons/fi';
import {UploadProfilePicture} from 'ui-lib/ui-lib.components';
import locationIcon from '/src/images/icons/locationIcon.svg';
import logoFallBack from '/src/images/icons/logoPlaceholder.svg';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchDeveloperComplaince, updateComplianceAvatar} from 'apis/settings';
import cameraIcon from '/src/images/icons/cameraIconForProfileIcon.svg';

export const BusinessInformation = ({menu_toggle}) => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const {data, isError, isLoading, refetch} = useQuery(
    ['developerCompliance'],
    fetchDeveloperComplaince
  );

  const disclosure = useDisclosure();

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));

  const company = data?.data.developer;

  localStorage.setItem(
    'loggedinUser',
    JSON.stringify({...user, company_image: company?.company_image})
  );

  const mutation = useMutation(
    formData => {
      return updateComplianceAvatar(formData);
    },
    {
      onSuccess: res => {
        toast({
          status: 'success',

          title: `Succesfully updated!`,
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.invalidateQueries(['settingsStatus', 'compliance']);
        refetch();
      },
      onError: err => {
        console.log(err);
        toast({
          status: 'error',
          title: err.response.statusText,
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const onAvatarChange = file => {
    mutation.mutate({company_image: file[0]?.image?.split(',')[1]});
  };

  const contact_array = [
    {
      name: `Phone Number`,
      link: `tel:${company?.phone?.code}${company?.phone?.number}`,
      display: `${company?.phone?.code}${company?.phone?.number}`,
      icon: <LuPhoneCall />,
      available: company?.phone,
    },
    {
      name: `Facebook Profile URL`,
      link: company?.social_links_facebook,
      display: company?.social_links_facebook?.replace(`https://`, ``)?.split(`?`)[0],
      icon: <FiFacebook />,
      available: company?.social_links_facebook && company?.social_links_facebook !== `No link yet`,
    },
    {
      name: `Instagram Profile URL`,
      link: company?.social_links_instagram,
      display: company?.social_links_instagram?.replace(`https://`, ``)?.split(`?`)[0],
      icon: <FiInstagram />,
      available:
        company?.social_links_instagram && company?.social_links_instagram !== `No link yet`,
    },
    {
      name: `X(Twitter) Profile URL`,
      link: company?.social_links_twitter,
      display: company?.social_links_twitter?.replace(`https://`, ``)?.split(`?`)[0],
      icon: <FaXTwitter />,
      available: company?.social_links_twitter && company?.social_links_twitter !== `No link yet`,
    },
    {
      name: `Linkedin Profile URL`,
      link: company?.social_links_linkedIn,
      display: company?.social_links_linkedIn?.replace(`https://`, ``)?.split(`?`)[0],
      icon: <LiaLinkedin />,
      available: company?.social_links_linkedIn && company?.social_links_linkedIn !== `No link yet`,
    },
  ];

  const {
    social_links_linkedIn,
    social_links_twitter,
    social_links_instagram,
    social_links_facebook,
    phone,
    website,
    cac_number,
    business_mail,
    location,
  } = company || {};

  return (
    <>
      <HStack
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        py="12px"
        h="49.699px"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
        width="full"
        bg="#F5F5F5"
      >
        <Flex width="full" justifyContent="space-between" alignItems="center">
          {menu_toggle}
          {isError ? null : (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="16px"
              onClick={disclosure.onOpen}
            >
              <Tooltip label="Edit Profile">
                <Box
                  border="0.68px solid #191919"
                  p="10px"
                  borderRadius="8.12px"
                  _hover={{
                    background: 'rgba(25, 25, 25, 0.10)',
                  }}
                  cursor="pointer"
                >
                  <HiOutlinePencil />
                </Box>
              </Tooltip>
            </Box>
          )}
        </Flex>
        <HStack spacing="15px">
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
      </HStack>
      <DrawerBody background={`#FBFCFC`} py={`16px`}>
        {isLoading ? (
          <Center h="80vh" position="relative">
            <Spinner />
          </Center>
        ) : isError ? (
          <Center h="80vh" position="relative">
            <Text>Something went wrong</Text>
          </Center>
        ) : (
          <Stack gap={`16px`}>
            <HStack
              p={`15px`}
              gap={`8px`}
              borderRadius={`8px`}
              border={`0.5px solid`}
              borderColor={`#E4E4E4`}
              background={`#FFF`}
            >
              <Center position="relative">
                {mutation.isLoading && (
                  <Center
                    position="absolute"
                    top={`0px`}
                    left={`0px`}
                    right={`0px`}
                    bottom={`0px`}
                    bg={`rgba(255,255,255, .4)`}
                    zIndex={`1`}
                  >
                    <Spinner />
                  </Center>
                )}

                <UploadProfilePicture
                  // id="avatar"
                  isProfilePic
                  // name="avatar"
                  files={[{preview: company?.company_image}]}
                  containerStyle={{
                    width: '56px',
                    height: '56px',
                  }}
                  imgStyle={{
                    style: {
                      width: '56px ',
                      height: '56px ',
                      borderRadius: '100%',
                      boxSizing: 'border-box',
                      display: 'inline-flex',
                      border: '1px solid #eaeaea',
                    },
                  }}
                  defaultCameraIcon={cameraIcon}
                  defaultCameraStyle={{
                    boxSize: '12px',
                  }}
                  defaultCameraWrapperStyle={{
                    top: 'initial',
                    position: 'absolute',
                    bottom: '0%',
                    display: 'grid',

                    cursor: 'pointer',
                    placeItems: 'center',
                    bg: 'rgba(0,0,0,0.5)',
                    h: '40%',
                    w: 'full',
                  }}
                  profileWrapper={{
                    overflow: 'hidden',
                    borderRadius: '50%',
                  }}
                  setFiles={onAvatarChange}
                  profileFallback={logoFallBack}
                />
              </Center>
              <Stack gap={`8px`}>
                <Text color={`#191919`} fontSize={`18px`} fontWeight={`600`} lineHeight={`normal`}>
                  {company?.business_name}
                </Text>
                <Text color={`#4545FE`} fontSize={`14px`} fontWeight={`400`} lineHeight={`normal`}>
                  {company?.business_mail}
                </Text>
              </Stack>
            </HStack>
            {company?.website || company?.location ? (
              <Stack
                p={`24px 16px`}
                borderRadius={`8px`}
                spacing="18px"
                border={`0.5px solid`}
                borderColor={`#E4E4E4`}
                divider={<StackDivider border="none" h="1px" bg="#eaecf0" />}
                background={`#FFF`}
              >
                {company?.website ? (
                  <Flex
                    as={Link}
                    href={company?.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    color={`#064B38`}
                    fontSize={`14px`}
                    fontWeight={`700`}
                    lineHeight={`normal`}
                    gap={`14px`}
                  >
                    <CiGlobe fontSize={`20px`} />
                    <Text>{company?.website}</Text>
                  </Flex>
                ) : null}
                {company?.location ? (
                  <Flex
                    gap="14px"
                    color={`#191919`}
                    fontSize={`14px`}
                    fontWeight={`400`}
                    lineHeight={`17.75px`}
                  >
                    <Image src={locationIcon.src} alt="location icon" />
                    <Text noOfLines={1}>{company?.location}</Text>
                  </Flex>
                ) : null}
              </Stack>
            ) : null}
            <VStack
              color={`#191919`}
              fontSize={`14px`}
              fontWeight={`400`}
              align={`stretch`}
              gap={`8px`}
            >
              <Text fontSize={`16px`} fontWeight={`500`} lineHeight={`normal`}>
                Contact
              </Text>
              <Stack
                p={`24px 16px`}
                borderRadius={`8px`}
                border={`0.5px solid`}
                borderColor={`#E4E4E4`}
                background={`#FFF`}
                divider={<StackDivider borderColor={`#e4e4e4`} m={`0px !important`} />}
              >
                {contact_array?.map(el => (
                  <HStack
                    py={`18px`}
                    gap={`14px`}
                    key={el.name}
                    onClick={!el.available ? disclosure.onOpen : () => window.open(el.link)}
                    cursor={`pointer`}
                  >
                    <Center fontSize={`20px`}>{el.icon}</Center>
                    <Text color={!el.available ? `#4545FE` : `inherit`}>
                      {!el.available ? `Add ${el.name}` : el.display}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </VStack>
          </Stack>
        )}
      </DrawerBody>
      {company && (
        <EditBusinessDrawer
          disclosure={disclosure}
          initialValues={{
            social_links_linkedIn,
            social_links_twitter,
            social_links_instagram,
            social_links_facebook,
            phone: `${phone?.number}`,
            website,
            cac_number,
            location,
            business_mail,
          }}
          country={phone?.country}
          refetch={refetch}
        />
      )}
    </>
  );
};
