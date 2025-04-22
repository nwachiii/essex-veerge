import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Grid,
  GridItem,
  Text,
  Tag,
  TagLabel,
  Spinner,
  Container,
  Center,
} from '@chakra-ui/react';
import {UploadProfilePicture} from 'ui-lib/ui-lib.components';
import Fallback from '/src/images/icons/compliance_logo.svg';
import {UpdateProfileModal} from './updateBusinessModal';
import {useMutation} from '@tanstack/react-query';
import {updateComplianceAvatar} from '/src/apis/settings';

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
  phoneNumber,
  phoneWithCode,
  businessProfileDisclosure,
}) => {
  const onCloseProfileModal = () => {
    businessProfileDisclosure.onClose();
  };

  const onOpenProfileModal = () => {
    businessProfileDisclosure.onOpen();
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
    <Container mt="16px" spacing="18px" border=" 1px solid #EAECF0" borderRadius={'16px'} p="16px">
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
              <Center
                position="relative"
                w="128px"
                h="128px"
                my="12px"
                borderRadius={'50%'}
                bg="#f5f5f5"
              >
                {/* <AnimatedLoader /> */}
                <Spinner />
              </Center>
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
            <Text
              fontSize={27}
              fontWeight={700}
              mt={!type ? '0' : '7px'}
              textTransform="capitalize"
              textAlign={'center'}
            >
              {name}
            </Text>
            <Text
              onClick={onOpenProfileModal}
              fontWeight="400"
              fontSize={14}
              cursor={phoneNumber ? 'text' : 'pointer'}
              // my="6px"
              mt="11px"
              textAlign={`center`}
            >
              {phoneNumber ? phoneWithCode : "Add company's number"}
            </Text>
            <Text
              onClick={onOpenProfileModal}
              fontWeight="400"
              color="#4545FE"
              fontSize={14}
              cursor={email ? 'text' : 'pointer'}
              mt="12px"
              textAlign={`center`}
            >
              {email ? email : 'Add email address'}
            </Text>
            <Text fontWeight="400" fontSize={14} my="6px" textAlign={`center`}>
              {location}
            </Text>
            <HStack spacing="8px">
              <Text
                onClick={onOpenProfileModal}
                fontSize={'14px'}
                lineHeight={'18px'}
                cursor={website && website?.includes('.') ? 'text' : 'pointer'}
                fontWeight={'700'}
                color={website && website?.includes('.') ? '#064B38' : '#12D8A0'}
                my="6px"
                textAlign={`center`}
              >
                {website && website?.includes('.') ? website : 'Add website link'}
              </Text>
              {!website ? (
                <Text fontSize="14px" lineHeight="18px" fontWeight="600" color="#FF6A6A">
                  *
                </Text>
              ) : null}
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <UpdateProfileModal
            business_name={name}
            isProfileModalOpen={businessProfileDisclosure.isOpen}
            onCloseProfileModal={onCloseProfileModal}
            refetch={refetch}
            initialValues={{
              website: website,
              business_mail: email,
              phone: phoneNumber,
              cac_number: cacNumber,
            }}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};
export default BusinessProfile;
