import {Button, StackDivider, Heading, HStack, Image, Text, VStack, Flex} from '@chakra-ui/react';
import avatar from '/src/images/avatar.svg';
import messagesIcon from '/src/images/icons/messages.png';
import note_icon from '/src/images/icons/note_icon.png';
import calling from '/src/images/icons/Calling.png';
import plusIcon from '/src/images/icons/plusIconActivitylog.svg';
import downArrow from '/src/images/icons/arrowDownActivitylog.svg';

import {formatPhoneNumber} from '/src/utils';

export const ProfileCom = ({data}) => {
  return (
    <VStack
      alignSelf="flex-start"
      bg="white"
      borderRadius="16px"
      w="371px"
      px="17px"
      pb="18"
      pt="35px"
    >
      <VStack w="100%">
        <Image alt="" borderRadius="full" src={data?.avatar ?? avatar.src} boxSize="124" />
        <Heading fontSize="28px" textTransform="capitalize" fontWeight="600" textAlign="center">
          {data?.first_name ?? 'N/A'} {data?.last_name ?? 'N/A'}
        </Heading>
      </VStack>
      <VStack w="100%" divider={<StackDivider borderColor="#F5F5F5" />}>
        <HStack py="4px" w="full" align="flex-start" justify="space-between">
          <Heading lineHeight="17.75px" as="h3" fontWeight="400" fontSize="14px">
            phone
          </Heading>

          <VStack spacing="8px">
            <HStack spacing="9px">
              <Text lineHeight="17.75px" as="span" fontWeight="600" fontSize="14px">
                {data?.phone ?? 'N/A'}
              </Text>

              {data?.phone ? <Image src={downArrow.src} alt="downarrow" /> : ''}
            </HStack>
            <HStack spacing="9px">
              <Button
                px="8px"
                borderRadius="48px"
                h="23px"
                alignSelf="flex-end"
                bg="rgba(69, 69, 254, 0.1)"
              >
                <Flex gap="10px">
                  <Image src={calling.src} boxSize="12px" alt="" />
                  <Text color="#4545FE" fontSize="12px" borderRadius="48px" as="span">
                    Call now
                  </Text>
                </Flex>
              </Button>
              <Image src={plusIcon.src} alt="plusIcon" />
            </HStack>
          </VStack>
        </HStack>
        <HStack py="14px" w="full" justify="space-between">
          <Heading as="h3" fontWeight="400" fontSize="14px">
            Email
          </Heading>

          <Text as="span" fontWeight="600" fontSize="14px">
            {data?.email ?? 'N/A'}
          </Text>
        </HStack>
        <HStack py="14px" w="full" justify="space-between">
          <Heading as="h3" fontWeight="400" fontSize="14px">
            Gender
          </Heading>

          <Text as="span" fontWeight="600" fontSize="14px">
            {data?.gender ?? 'N/A'}
          </Text>
        </HStack>

        <HStack mt="18px" w="100%" spacing="13px">
          <Button bg="#ECECFF" borderRadius="12px" w="162px" h="48px">
            <Flex gap="13px">
              <Image alt="" src={messagesIcon.src} w="18px" h="20px" />
              <Text color="#4545FE" as="span">
                Messages
              </Text>
            </Flex>
          </Button>
          <Button bg="#12D8A01A" borderRadius="12px" w="162px" h="48px">
            <Flex gap="13px">
              <Image alt="" src={note_icon.src} w="18px" h="20px" />

              <Text color="#12D8A0" as="span">
                Notes
              </Text>
            </Flex>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProfileCom;
