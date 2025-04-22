import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import stakeholders from '../../../../images/loop/stakeholders.gif';
import string from '../../../../images/loop/string.svg';

export const TeamEfficiency = () => {
  return (
    <Box background="#010D13" mt="150px">
      <Box position={'relative'} h="90vh" w="full">
        <Image
          position={'absolute'}
          alt="image"
          top="-130px"
          right="0"
          left="0"
          src={string.src}
          w="full"
        />
        <Flex
          position={'absolute'}
          top="0"
          right="0"
          left="0"
          zIndex={2}
          w="85%"
          gap="60px"
          h="90vh"
          align={'center'}
          mx="auto"
          justify={'space-between'}
        >
          <Box w="37%">
            <Text
              fontSize={'32px'}
              fontWeight={600}
              color="#fff"
              lineHeight={'147.4%'}
              fontFamily={'Syne'}
            >
              Increase your
              <Text color={'#2ED3B7'}>{"team's efficiency"}</Text>
            </Text>
            <VStack mt="30px" spacing={'32px'} align={'stretch'}>
              <Box>
                <Text fontWeight={600} fontSize={'28px'} color="#fff" lineHeight={'147.4%'}>
                  Share
                </Text>
                <Text
                  mt="16px"
                  fontWeight={300}
                  fontSize={'19px'}
                  color="#F5F3F3"
                  lineHeight={'147.4%'}
                >
                  Share files either publicly or privately with team members
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={'28px'} color="#fff" lineHeight={'147.4%'}>
                  Collaborate
                </Text>
                <Text
                  mt="16px"
                  fontWeight={300}
                  fontSize={'19px'}
                  color="#F5F3F3"
                  lineHeight={'147.4%'}
                >
                  Collaborate with team mates made easier with Loop
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={'28px'} color="#fff" lineHeight={'147.4%'}>
                  Brainstorm
                </Text>
                <Text
                  mt="16px"
                  fontWeight={300}
                  fontSize={'19px'}
                  color="#F5F3F3"
                  lineHeight={'147.4%'}
                >
                  Share ideas with team and generate a wide range of creative ideas for your
                  projects.
                </Text>
              </Box>
              <Box>
                <Text
                  fontWeight={600}
                  fontSize={'28px'}
                  color="#fff"
                  lineHeight={'147.4%'}
                  fontFamily={'Syne'}
                >
                  Work{' '}
                  <Text color="#2ED3B7" as="span">
                    Easily
                  </Text>
                </Text>
                <Text
                  mt="16px"
                  fontWeight={300}
                  fontSize={'19px'}
                  color="#F5F3F3"
                  lineHeight={'147.4%'}
                >
                  Organise all your work in one place
                </Text>
              </Box>
            </VStack>
          </Box>
          <Box w="60%">
            <Image alt="stakeholders" w="full" h="auto" src={stakeholders.src} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TeamEfficiency;
