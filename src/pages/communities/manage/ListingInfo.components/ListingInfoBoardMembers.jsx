import {Box, Text, Flex, Stack, Image} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import Avatar1 from '/src/images/avatar-6.png';
import Avatar2 from '/src/images/avatar-7.png';
import Avatar3 from '/src/images/avatar-8.png';
import Avatar4 from '/src/images/avatar-9.png';
import Avatar5 from '/src/images/avatar-10.png';
import PhoneIcon from '/src/images/icons/call.svg';
import EmailIcon from '/src/images/icons/fluent_mail-20-regular.svg';
import MessageIcon from '/src/images/icons/message-text.svg';

const ListingInfoBoardMembers = () => {
  return (
    <Stack gap="16px" mt="36px">
      <Flex w="full" justify="space-between">
        <Text
          gap="15px"
          fontSize="33px"
          color="#191919"
          fontWeight={500}
          lineHeight="30.43px"
          alignContent="center"
          mb="20px"
        >
          Board Members
        </Text>
      </Flex>
      <Flex
        {...themeStyles.containerStyles}
        padding="13px 20px"
        maxW="100%"
        gap={{base: '16px', xl: '24px'}}
        alignItems="stretch"
        overflowX='auto'
      >
        {listBoardMembers.map((member, index) => {
          return (
            <Stack
              key={index}
              border="0.5px solid #E4E4E7"
              bg="#FBFCFC"
              p="12px"
              rounded="8px"
              w='full'
              minW="256px"
              justify="space-between"
              flexGrow={1}
              flexBasis={0}
              gap="12px"
              minH='121px'
            >
              <Text fontSize="19px" fontWeight={600}>
                {member?.title}
              </Text>
              <Flex gap="10px">
                <Image src={member.avatar} alt={member.user} boxSize="24px" />
                <Text fontSize="14px" fontWeight={500} color="#000">
                  {member.user}
                </Text>
              </Flex>
              <Flex gap="12px" p="4px 6px" border="0.5px solid #E4E4E7" maxW='max-content' alignItems="center">
                {member.icons.map((icon, index) => {
                  return (
                    <Box key={index}>
                      <Image src={icon} alt="icon" boxSize="16px" />
                    </Box>
                  );
                })}
              </Flex>
            </Stack>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default ListingInfoBoardMembers;

const listBoardMembers = [
  {
    title: 'President',
    user: 'Sophia Carter',
    avatar: Avatar1.src,
    icons: [PhoneIcon.src, EmailIcon.src, MessageIcon.src],
  },
  {
    title: 'Vice President',
    user: 'James Reynolds',
    avatar: Avatar2.src,
    icons: [PhoneIcon.src, EmailIcon.src],
  },
  {
    title: 'Secretary',
    user: 'Liam Brooks',
    avatar: Avatar3.src,
    icons: [PhoneIcon.src, EmailIcon.src, MessageIcon.src],
  },
  {
    title: 'Treasurer',
    user: 'Olivia Bennett',
    avatar: Avatar4.src,
    icons: [EmailIcon.src],
  },
  {
    title: 'Advisory Board Member',
    user: 'Mason Patel',
    avatar: Avatar5.src,
    icons: [PhoneIcon.src, EmailIcon.src, MessageIcon.src],
  },
];
