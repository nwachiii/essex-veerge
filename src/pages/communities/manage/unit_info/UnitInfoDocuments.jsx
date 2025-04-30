import {Text, Flex, Stack, Image, Box} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import infoIcon from '/src/images/icons/document-text.svg';

const UnitInfoDocuments = () => {
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
          mb="12px"
        >
          Documents & Certificates
        </Text>
      </Flex>
      <Flex
        {...themeStyles.containerStyles}
        padding="13px 20px"
        maxW="100%"
        gap={{base: '16px', xl: '24px'}}
        alignItems="stretch"
      >
        {listDocuments.map((document, index) => {
          return (
            <Stack
              key={index}
              border="0.5px solid #E4E4E7"
              bg="#FBFCFC"
              p="12px"
              rounded="8px"
              maxW="256px"
              justify="space-between"
              flexGrow={1}
              flexBasis={0}
              gap="12px"
            >
              <Flex gap="8px" alignItems="center">
                <Flex
                  align="center"
                  justify="center"
                  p="10px"
                  boxSize="36px"
                  border="0.5px solid #E4E4E7"
                  bg="#FFF"
                  rounded="full"
                >
                  <Image src={infoIcon.src} alt={document.name} />
                </Flex>
                <Text fontSize="15px" fontWeight={500}>
                  {document.name}
                </Text>
              </Flex>
              <Flex align="center" gap="8px" border="1px solid #E4E4E7" p="4px 6px" w="max-content">
                <Box rounded="full" bg="#DC2626" boxSize="5px" />

                <Text fontSize="12px" color="#000">
                  Expiration {document?.date}
                </Text>
              </Flex>
            </Stack>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default UnitInfoDocuments;

const listDocuments = [
  {
    name: 'Lease',
    date: '21 Dec, 2025',
  },
  {
    name: 'HO-6 policy',
    date: '30 Jun, 2025',
  },
];
