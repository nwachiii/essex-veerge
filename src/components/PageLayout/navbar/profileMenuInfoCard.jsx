import {Box, Center, Flex, Spinner, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {UploadProfilePicture} from 'ui-lib';
import fallbackSrc from '/src/images/avatar.svg';
import cameraIcon from '/src/images/icons/cameraIconForProfileIcon.svg';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile, updateProfile} from 'apis/settings';

const ProfileMenuInfoCard = ({user, isLoading, refetch}) => {
  const [avatar, setAvatar] = useState(() => {
    return user?.avatar ? [{preview: user.avatar}] : [{preview: ''}];
  });

  useEffect(() => {
    if (user?.avatar) {
      setAvatar([{preview: user.avatar}]);
    }
  }, [user?.avatar]);
  const userInfo =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));

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
    <Flex alignItems="center" gap="8px">
      <Box position="relative">
        {isLoading ? null : mutation?.isLoading ? (
          <Center bg="#f5f5f5" border="1px solid #eaeaea" borderRadius="full" boxSize="56px">
            <Spinner />
          </Center>
        ) : (
          <UploadProfilePicture
            id="avatar"
            isProfilePic
            name="avatar"
            files={avatar}
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
            profileFallback={fallbackSrc}
          />
        )}
      </Box>
      <Stack h="full">
        <Text
          fontSize="18px"
          fontWeight="600"
          color="#191919"
          lineHeight="22.82px"
          textTransform="capitalize"
          whiteSpace="break-spaces"
          wordBreak="break-all"
        >
          {user?.first_name || ''} {user?.last_name || ''}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="400"
          color="#4545FE"
          lineHeight="17.75px"
          whiteSpace="break-spaces"
          wordBreak="break-all"
        >
          {user?.email || ''}
        </Text>
      </Stack>
    </Flex>
  );
};

export default ProfileMenuInfoCard;
