import {Box, Center, Flex, Image, Spinner, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {UploadProfilePicture} from 'ui-lib';
import fallbackSrc from '/src/images/avatar.svg';
import cameraIcon from '/src/images/icons/cameraIconForProfileIcon.svg';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchDeveloperProfile, updateProfile} from 'apis/settings';
import {loggedinUserStatic} from 'apis/requests';

const ProfileMenuInfoCard = ({user, isLoading, refetch}) => {
  const [avatar, setAvatar] = useState(() => {
    return user?.avatar ? [{preview: user.avatar}] : [{preview: ''}];
  });

  useEffect(() => {
    if (user?.avatar) {
      setAvatar([{preview: user.avatar}]);
    }
  }, [user?.avatar]);
  const userInfo = loggedinUserStatic;

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
        <Image
          fill
          boxSize={'90px'}
          borderRadius={'full'}
          style={{objectFit: `cover`}}
          alt="Dylan_Frank"
          src={'https://randomuser.me/api/portraits/men/41.jpg'}
        />
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
          {'Dylan Frank'}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="400"
          color="#4545FE"
          lineHeight="17.75px"
          whiteSpace="break-spaces"
          wordBreak="break-all"
        >
          {'dylanfrank@gmail.com'}
        </Text>
      </Stack>
    </Flex>
  );
};

export default ProfileMenuInfoCard;
