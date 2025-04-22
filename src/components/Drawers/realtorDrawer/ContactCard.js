import {Box, Button, Center, HStack, Image, Link, Stack, Text} from '@chakra-ui/react';
import {BsDashLg} from 'react-icons/bs';
import avatarFallback from '/src/images/avatar.svg';
import expand from '/src/images/icons/expand_icon.svg';

export const ContactCard = ({data, agentId}) => {
  const agentsDetails = data?.data?.profile;

  return (
    <Box
      bgColor="#ffffff"
      p="15.28px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      borderRadius="12px"
      border="0.50px solid #E4E4E4"
    >
      <Box display="flex" flexDirection="column" gap="15.28px" width="full">
        <Stack
          display="flex"
          flexDirection="column"
          gap="16.24px"
          alignContent="center"
          justifyContent="center"
          mx="auto"
        >
          <Center w="full">
            <Center
              position={'relative'}
              w="118px"
              h={'118px'}
              borderRadius={'50%'}
              overflow={'hidden'}
            >
              <Image
                src={agentsDetails?.avatar ?? avatarFallback.src}
                alt="user img"
                fill
                objectFit={'cover'}
                minH={'118px'}
                minW={'118px'}
              />
            </Center>
          </Center>
          <Text
            color="#191919"
            fontSize="28px"
            fontWeight="600"
            alignItems="center"
            textTransform="capitalize"
            textAlign="center"
          >{`${agentsDetails?.first_name} ${agentsDetails?.last_name}`}</Text>
        </Stack>

        <Box display="flex" flexDirection="column" width="full" gap="13.37px">
          <Stack
            borderBottom="1px solid #F5F5F5"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            pb="13.37px"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              Phone
            </Text>
            <Text fontWeight={'600'}>{agentsDetails?.phone ?? <BsDashLg />}</Text>
          </Stack>

          <Stack
            borderBottom="1px solid #F5F5F5"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            pb="13.37px"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              Email
            </Text>
            <Link href={agentsDetails?.email ? `mailto:${agentsDetails?.email}` : null}>
              <Text color="#4545FE" fontWeight={'600'}>
                {agentsDetails?.email ?? <BsDashLg />}
              </Text>
            </Link>
          </Stack>

          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="full"
            wordBreak="break-word"
            fontSize="14px"
          >
            <Text color="#191919" fontWeight={'400'}>
              Gender
            </Text>
            <Text color="#191919" fontWeight={'600'}>
              {agentsDetails?.gender ?? <BsDashLg />}
            </Text>
          </Stack>
          <Link href={`/users/manage_agents/${agentId}`}>
        <Button
          bg="#F5F5F5"
          alignSelf="center"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          _hover={{
            bg: '',
          }}
          _active={{
            bg: '',
          }}
          color="#191919"
          width="full"
          height="48px"
          border="1px solid #E4E4E4 "
          borderRadius="12px"
        >
          <HStack justify="center" spacing="9px">
            <Image w="15px" h="15px" src={expand.src} alt="expand icon" fontSize="10px" />
            <Text fontSize="17.20px" fontWeight={'500'}>
              View details
            </Text>
          </HStack>
        </Button>
      </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;
