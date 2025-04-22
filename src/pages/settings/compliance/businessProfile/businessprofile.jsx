import React, {useState} from 'react';
import {
  Box,
  HStack,
  VStack,
  Grid,
  GridItem,
  Image,
  Text,
  Tag,
  TagLabel,
  Spinner,
  AbsoluteCenter,
  Flex,
} from '@chakra-ui/react';
import {Container3} from '../../../../components/common/containers';
import {Button, UploadProfilePicture} from '../../../../ui-lib';
import Pencil from '../../../../images/icons/pencil.png';
import Fallback from '/src/images/icons/compliance_logo.svg';
import {UpdateProfileModal} from './updateBusinessModal';
import {useMutation} from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {updateComplianceAvatar} from '../../../../apis/settings';
import cameraIcon from '/src/images/icons/upload_image_icon_settings.svg';
import {AnimatedLoader} from '../../../../components';

export const BusinessProfile = ({
  img,
  name,
  type,
  firstName,
  lastName,
  email,
  website,
  location,
  phone,
  cacNumber,
  refetch,
}) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const onCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  const onOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const mutation = useMutation(
    formData => {
      return updateComplianceAvatar(formData);
    },
    {
      onSuccess: res => {
        refetch();
      },
      onError: err => {
        console.log(err);
        toast({
          status: 'error',
          title: err.response.statusText,
        });
      },
    }
  );

  const onAvatarChange = file => {
    mutation.mutate({company_image: file[0]?.image?.split(',')[1]});
  };

  return (
    <Container3
      spacing="18px"
      my="0"
      title={'Business Profile'}
      border=" 1px solid #EAECF0"
      titleFontSize="16px"
    >
      <Grid templateColumns="repeat(10, 1fr)" gap={6}>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={8} position={'relative'}>
          <VStack
            width="100%"
            spacing="none"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {mutation.isLoading ? (
              <Box position="relative" w="128px" h="128px">
                <AnimatedLoader />
              </Box>
            ) : (
              <Box position="relative">
                <UploadProfilePicture
                  containerStyle={{
                    width: 'max-content',
                    margin: '14px 14px 0px',
                  }}
                  id="avatar"
                  name="avatar"
                  files={[{preview: img}]}
                  setFiles={onAvatarChange}
                  profileFallback={Fallback}
                  isLoading={mutation.isLoading}
                />
              </Box>
            )}

            {type && (
              <Tag bg="#DBFFF5" color="#12D8A0" borderRadius="full" h="36px">
                <TagLabel mx="13px" color="#4545FE">
                  {type}
                </TagLabel>
              </Tag>
            )}
            <Text fontSize={32} fontWeight={700} mt={!type ? '0' : '7px'}>
              {name}
            </Text>
            <Text
              onClick={onOpenProfileModal}
              fontWeight="400"
              fontSize={14}
              cursor={phone ? 'text' : 'pointer'}
              // my="6px"
              mt="11px"
            >
              {phone ? phone : "Add company's number"}
            </Text>
            <Text
              onClick={onOpenProfileModal}
              fontWeight="400"
              color="#4545FE"
              fontSize={14}
              cursor={email ? 'text' : 'pointer'}
              mt="12px"
            >
              {email ? email : 'Add email address'}
            </Text>
            <Text fontWeight="400" fontSize={14} my="6px">
              {location}
            </Text>
            <HStack spacing="19px">
              <Text
                onClick={onOpenProfileModal}
                fontSize={16}
                lineHeight={'20px'}
                cursor={website && website?.includes('.') ? 'text' : 'pointer'}
                fontWeight={'600'}
                color={'#12D8A0'}
                my="6px"
              >
                {website && website?.includes('.') ? website : 'Add website link'}
              </Text>
              {!website && (
                <Tag
                  borderRadius="48px"
                  color="#FF9103"
                  w="94px"
                  textAlign="center"
                  px="13px"
                  h="36px"
                  bg="#FF91031A"
                >
                  <Text w="full" textAlign="center">
                    Required
                  </Text>
                </Tag>
              )}
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            w="114px"
            variant="dark"
            height="41px"
            leftIcon={<Image alt="" src={Pencil.src} />}
            onClick={onOpenProfileModal}
          >
            Edit
          </Button>
          <UpdateProfileModal
            business_name={name}
            isProfileModalOpen={isProfileModalOpen}
            onCloseProfileModal={onCloseProfileModal}
            refetch={refetch}
            initialValues={{
              website: website,
              business_mail: email,
              phone: phone,

              cac_number: cacNumber,
            }}
          />
        </GridItem>
      </Grid>
    </Container3>
  );
};
export default BusinessProfile;
