import {useState} from 'react';
import {
  Box,
  HStack,
  VStack,
  Container,
  Grid,
  GridItem,
  Text,
  Spinner,
  useToast,
  Center,
} from '@chakra-ui/react';
import {UploadProfilePicture} from 'ui-lib/ui-lib.components';
import fallbackSrc from '/src/images/avatar.svg';
import {UpdateProfileModal} from './updateProfileModal';
import {useMutation} from '@tanstack/react-query';
import {updateProfile} from '/src/apis/settings';
import {toastForError} from 'utils/toastForErrors';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import { loggedinUserStatic } from 'apis/requests';

export const ProfileBox = ({user, refetch}) => {
  const [avatar, setAvatar] = useState([{preview: user?.avatar}]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toast = useToast();

  const onCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  const userInfo = loggedinUserStatic;

  const onOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const mutation = useMutation(
    formData => {
      return updateProfile(formData);
    },
    {
      onSuccess: async res => {
        userInfo
          ? localStorage.setItem(
              'loggedinUser',
              JSON.stringify({...userInfo, avatar: res?.data?.user?.avatar})
            )
          : null;

        setAvatar([{preview: res?.data?.user?.avatar}]);
        await refetch();
      },
      onError: err => {
        console.log(err);
        return toastForError(err, true, toast);
      },
    }
  );

  const onAvatarChange = file => {
    mutation.mutate({avatar: file[0]?.image, 'update-avatar': true});
  };

  return (
    <Container border="1px solid #EAECF0" borderRadius={'16px'} p="16px" mt="16px">
      <Grid templateColumns="repeat(10, 1fr)" gap={6}>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={8}>
          <VStack
            width="100%"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            spacing="none"
            position="relative"
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
                  id="avatar"
                  isProfilePic
                  name="avatar"
                  files={avatar}
                  containerStyle={{
                    width: 'max-content',
                    margin: '14px 14px 0px',
                  }}
                  setFiles={onAvatarChange}
                  profileFallback={fallbackSrc}
                />
              </Box>
            )}
            {/* <Tag bg="#DBFFF5" mt="4px" color="#12D8A0" borderRadius="full" px="13px" h="31px">
              <TagLabel fontSize="12px" fontWeight="500" textTransform="capitalize" color="#4545FE">
                {user.role}
              </TagLabel>
            </Tag> */}

            <Text
              fontSize={27}
              fontWeight={700}
              textTransform="capitalize"
              mt="8px"
              textAlign={'center'}
            >
              {user.first_name} {user.last_name}
            </Text>

            <Text fontSize={14} fontWeight="400" mt="8px">
              {user.phone}
            </Text>

            <Text color="#4545FE" fontSize={14} fontWeight="400" mt="9px">
              {user.email}
            </Text>

            {isRoleRestricted('input Bvn').check ? null : (
              <HStack spacing="8px" mt="13px" align="center">
                <Text
                  fontSize={14}
                  fontWeight="400"
                  color={'#191919'}
                  display={'flex'}
                  gap={'2'}
                  textAlign={`center`}
                >
                  {isRoleRestricted('verified state of BVN').check ? null : user.bvn ? (
                    <Text
                      color={'#064B38'}
                      // fontFamily="Euclid Circular B"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="600"
                      lineHeight="normal"
                    >
                      BVN Verified
                    </Text>
                  ) : (
                    <Text color={'#12D8A0'} cursor={'pointer'} onClick={onOpenProfileModal}>
                      {' '}
                      Input BVN{' '}
                    </Text>
                  )}
                </Text>
                {!!user.bvn ? null : (
                  // <Tag
                  //   borderRadius="48px"
                  //   color="#FF9103"
                  //   w="94px"
                  //   textAlign="center"
                  //   px="13px"
                  //   h="36px"
                  //   bg="#FF91031A"
                  // >
                  //   <Text w="full" textAlign="center">
                  //     Required
                  //   </Text>
                  // </Tag>
                  <Text fontSize="14px" lineHeight="18px" fontWeight="600" color="#FF6A6A">
                    *
                  </Text>
                )}
              </HStack>
            )}
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <UpdateProfileModal
            isProfileModalOpen={isProfileModalOpen}
            onCloseProfileModal={onCloseProfileModal}
            refetch={refetch}
            initialValues={{
              bvn: user.bvn,
              email: user.email,
              phone: user.phone,
              first_name: user.first_name,
              last_name: user.last_name,
              'update-profile': true,
            }}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};
export default ProfileBox;
