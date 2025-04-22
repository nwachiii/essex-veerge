import {
  Button,
  Center,
  DrawerBody,
  DrawerFooter,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

export const NotesEmptyState = ({start}) => {
  return (
    <>
      <DrawerBody p={`132px 28px`}>
        <VStack gap={{base: `37px`}}>
          <Heading
            textAlign={`center`}
            color={`#191919`}
            fontSize={`24px`}
            fontWeight={`600`}
            lineHeight={`normal`}
          >
            What’s Notes For?
          </Heading>
          <Stack gap={{base: `23px`}}>
            <HStack gap={`12px`}>
              <Center>
                <TeamCommunicationIcon />
              </Center>
              <VStack align={`flex-start`} gap={`4px`} color={`#191919`}>
                <Text fontSize={`16px`} fontWeight={`600`}>
                  Team Communication
                </Text>
                <Text fontSize={`12px`} fontWeight={`400`} color={`#606060`}>
                  This allows team members to keep a detailed record of interactions, customer
                  preferences, issues, and resolutions. It creates a comprehensive history that can
                  be referenced by any team member.
                </Text>
              </VStack>
            </HStack>
            <HStack gap={`12px`}>
              <Center>
                <KnowledgeTransferIcon />
              </Center>
              <VStack align={`flex-start`} gap={`4px`} color={`#191919`}>
                <Text fontSize={`16px`} fontWeight={`600`}>
                  Knowledge Transfer
                </Text>
                <Text fontSize={`12px`} fontWeight={`400`} color={`#606060`}>
                  It is a repository of personal knowledge, capturing important information that
                  would otherwise be lost when old hires leave.
                </Text>
              </VStack>
            </HStack>
          </Stack>
        </VStack>
      </DrawerBody>
      <DrawerFooter p={{base: `36px 36px 56px`}}>
        <Stack align={`center`} gap={`24px`}>
          <Text textAlign={`center`} fontSize={`12px`} fontWeight={`400`} color={`#606060`}>
            The note feature is designed exclusively for internal use by our team members and is not
            accessible to customers.
          </Text>
          <Button
            w="full"
            h="45.5px"
            bg="#191919"
            borderRadius="full"
            onClick={start}
            color="#fff"
            _hover={{opacity: 1}}
            _active={{opacity: 1}}
            _focus={{outline: 'none'}}
            _focusVisible={{outline: 'none'}}
            fontWeight={`400`}
          >
            Get Started
          </Button>
        </Stack>
      </DrawerFooter>
    </>
  );
};

const TeamCommunicationIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.8333 24.7923H8.16659C7.68825 24.7923 7.29159 24.3957 7.29159 23.9173C7.29159 23.439 7.68825 23.0423 8.16659 23.0423H19.8333C23.1699 23.0423 24.7916 21.4207 24.7916 18.084V9.91732C24.7916 6.58065 23.1699 4.95898 19.8333 4.95898H8.16659C4.82992 4.95898 3.20825 6.58065 3.20825 9.91732C3.20825 10.3957 2.81159 10.7923 2.33325 10.7923C1.85492 10.7923 1.45825 10.3957 1.45825 9.91732C1.45825 5.65898 3.90825 3.20898 8.16659 3.20898H19.8333C24.0916 3.20898 26.5416 5.65898 26.5416 9.91732V18.084C26.5416 22.3423 24.0916 24.7923 19.8333 24.7923Z"
        fill="#606060"
      />
      <path
        d="M13.9998 15.014C13.0198 15.014 12.0282 14.7107 11.2698 14.0923L7.61815 11.1757C7.24482 10.8723 7.17483 10.324 7.47816 9.95065C7.78149 9.57732 8.32981 9.50733 8.70315 9.81066L12.3548 12.7273C13.2415 13.439 14.7465 13.439 15.6331 12.7273L19.2848 9.81066C19.6582 9.50733 20.2181 9.56565 20.5098 9.95065C20.8131 10.324 20.7548 10.884 20.3698 11.1757L16.7181 14.0923C15.9715 14.7107 14.9798 15.014 13.9998 15.014Z"
        fill="#606060"
      />
      <path
        d="M9.33325 20.125H2.33325C1.85492 20.125 1.45825 19.7283 1.45825 19.25C1.45825 18.7717 1.85492 18.375 2.33325 18.375H9.33325C9.81159 18.375 10.2083 18.7717 10.2083 19.25C10.2083 19.7283 9.81159 20.125 9.33325 20.125Z"
        fill="#606060"
      />
      <path
        d="M5.83325 15.459H2.33325C1.85492 15.459 1.45825 15.0623 1.45825 14.584C1.45825 14.1057 1.85492 13.709 2.33325 13.709H5.83325C6.31158 13.709 6.70825 14.1057 6.70825 14.584C6.70825 15.0623 6.31158 15.459 5.83325 15.459Z"
        fill="#606060"
      />
    </svg>
  );
};

const KnowledgeTransferIcon = () => {
  return (
    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.3335 13.332C5.05416 10.483 8.917 10.3489 11.6668 13.332M16.3335 26.1654C19.0542 23.3164 22.917 23.1822 25.6668 26.1654M3.50016 16.832C3.50016 21.347 7.15183 24.9987 11.6668 24.9987L10.5002 22.6654M17.5002 3.9987H24.5002M17.5002 7.4987H24.5002M17.5002 10.9987H21.5835M9.911 5.7487C9.911 7.3587 8.60433 8.66537 6.99083 8.66537C6.60742 8.66598 6.22764 8.59099 5.87324 8.44469C5.51883 8.29839 5.19675 8.08365 4.92542 7.81275C4.65409 7.54185 4.43883 7.22011 4.29196 6.86594C4.14509 6.51177 4.0695 6.13212 4.0695 5.7487C4.0695 4.1387 5.37616 2.83203 6.99083 2.83203C7.37415 2.83157 7.75379 2.90668 8.10806 3.05305C8.46233 3.19942 8.78428 3.41418 9.05549 3.68507C9.3267 3.95595 9.54185 4.27764 9.68864 4.63173C9.83544 4.98583 9.911 5.36538 9.911 5.7487ZM23.911 18.582C23.911 20.192 22.6043 21.4987 20.9897 21.4987C20.6063 21.4992 20.2267 21.4241 19.8724 21.2777C19.5182 21.1313 19.1962 20.9166 18.925 20.6457C18.6538 20.3748 18.4386 20.0531 18.2918 19.699C18.1451 19.3449 18.0695 18.9653 18.0695 18.582C18.0695 16.972 19.3762 15.6654 20.9897 15.6654C21.3731 15.6648 21.7529 15.7397 22.1073 15.886C22.4617 16.0323 22.7837 16.2471 23.0551 16.518C23.3264 16.7889 23.5417 17.1106 23.6885 17.4648C23.8354 17.819 23.911 18.1986 23.911 18.582Z"
        stroke="#606060"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
