import {Button, StackDivider, Heading, HStack, Image, Text, VStack, Flex} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import avatar from '/src/images/avatar.svg';
import calling from '/src/images/icons/Calling.png';
import note_icon from '/src/images/icons/note_icon.png';
import messagesIcon from '/src/images/icons/messages.png';

const ProfileCom = ({data, id}) => {
  const router = useRouter();

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
        <Image
          alt=""
          src={data?.avatar ?? avatar.src}
          borderRadius="full"
          objectFit="cover"
          boxSize="124"
        />
        <Heading fontSize="28px" textTransform="capitalize" fontWeight="600" textAlign="center">
          {data.first_name} {data.last_name}
        </Heading>
      </VStack>
      <VStack w="100%" divider={<StackDivider borderColor="gray.200" />}>
        <HStack py="14px" w="full" align="flex-start" justify="space-between">
          <Heading lineHeight="17.75px" as="h3" fontWeight="400" fontSize="14px">
            phone
          </Heading>

          <VStack spacing="8px">
            <Text lineHeight="17.75px" as="span" fontWeight="600" fontSize="14px">
              {data.phone ?? 'N/A'}
            </Text>
            <Button px="8px" borderRadius="48px" py="4px" alignSelf="flex-end">
              <Flex gap="10px">
                <Image alt="" src={calling.src} boxSize="16px" />
                <Text color="#4545FE" fontSize="12px" borderRadius="48px" as="span">
                  Call now
                </Text>
              </Flex>
            </Button>
          </VStack>
        </HStack>
        <HStack py="14px" w="full" justify="space-between">
          <Heading as="h3" fontWeight="400" fontSize="14px">
            Email
          </Heading>

          <Text as="span" fontWeight="600" fontSize="14px">
            {data.email ?? 'N/A'}
          </Text>
        </HStack>
        <HStack py="14px" w="full" justify="space-between">
          <Heading as="h3" fontWeight="400" fontSize="14px">
            Gender
          </Heading>

          <Text as="span" fontWeight="600" fontSize="14px">
            {data.gender ?? 'N/A'}
          </Text>
        </HStack>

        <HStack mt="18px" w="100%" spacing="13px">
          <Button
            bg="#ECECFF"
            onClick={() => router.push(`/messages/${id}`)}
            borderRadius="12px"
            w="162px"
            h="48px"
          >
            <Flex gap="13px">
              <Image alt="" src={messagesIcon.src} w="18px" h="20px" />
              <Text color="#4545FE" as="span">
                Messages
              </Text>
            </Flex>
          </Button>
          <Button
            bg="#12D8A01A"
            onClick={() => router.push(`/notes/${id}`)}
            borderRadius="12px"
            w="162px"
            h="48px"
          >
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
