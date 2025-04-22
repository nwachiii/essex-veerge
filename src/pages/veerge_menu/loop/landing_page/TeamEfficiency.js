import {Box, Center, Flex, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import shareSection from '/src/images/veerge_loop/share-icon.svg';
import collaborateSection from '/src/images/veerge_loop/collaborate-section.svg';
import brainstormSection from '/src/images/veerge_loop/brainstorm-section.svg';
import loopChatSection from '/src/images/veerge_loop/loop-chat-animation.gif';
import teamCollab from '/src/images/veerge_loop/team-collaboration.gif';

export const LoopTeamEfficiency = () => {
  return (
    <Stack pt={'60px'} w="full" h="fit-content" align={'center'} spacing={'50px'}>
      <Text
        color="#191919"
        fontFamily="Syne"
        fontSize="32px"
        fontStyle="normal"
        fontWeight="600"
        lineHeight="147.4%"
        letterSpacing="0.64px"
      >
        Increase your <span style={{color: '#1D6169'}}>{`team’s efficiency`}</span>
      </Text>
      <Flex justifyContent={'center'} gap="32px" w="full" align="center" mx="auto" mb="101px">
        <Stack
          w="407px"
          h="232px"
          as="span"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={shareSection.src}
          alt="share_section"
        />
        <Stack
          w="407px"
          h="232px"
          as="span"
          bgPosition="center"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgImage={collaborateSection.src}
          alt="share_section"
        />
        <Stack
          w="407px"
          h="232px"
          as="span"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={brainstormSection.src}
          alt="share_section"
        />
      </Flex>

      {/* Loop chat animation section */}
      <Center>
        <Stack
          w="1280px"
          h="686px"
          as="span"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={loopChatSection.src}
          alt="loop_chat_section"
        />
      </Center>

      {/* Loop improves team collaboration... */}

      <Box
        w="full"
        height="650px"
        flexShrink="0"
        background="#F0F6F9"
        py="40px"
        mt="194px"
        position={'relative'}
      >
        <Stack w="84%" mx="auto">
          <Text
            color="#191919"
            fontFamily="Syne"
            fontSize="48px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
            letterSpacing="0.96px"
          >
            Loop improves team <br />{' '}
            <span style={{color: '#1D6169'}}>collaboration & communication</span>
          </Text>
          <Text
            w="566px"
            color="var(--main-black, #191919)"
            fontFamily="Euclid Circular B"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="300"
            lineHeight="normal"
          >
            Stay on the same page and make decisions faster by bringing all of your work
            communication into one place.
          </Text>

          <SimpleGrid columns={3} spacingY={'64px'} mt="52px">
            <Box w="262px">
              <Text
                color="#1D6169"
                fontFamily="Syne"
                fontSize="56.049px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="147.4%"
                letterSpacing="1.121px"
              >
                57%
              </Text>
              <Text
                color="#191919"
                fontFamily="Euclid Circular B"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
              >
                of teams that use Loop are more productive
              </Text>
            </Box>
            <Box w="262px">
              <Text
                color="#1D6169"
                fontFamily="Syne"
                fontSize="56.049px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="147.4%"
                letterSpacing="1.121px"
              >
                62%
              </Text>
              <Text
                color="#191919"
                fontFamily="Euclid Circular B"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
              >
                say Loop has improved communication
              </Text>
            </Box>
            <Box w="262px">
              <Text
                color="#1D6169"
                fontFamily="Syne"
                fontSize="56.049px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="147.4%"
                letterSpacing="1.121px"
              >
                52%
              </Text>
              <Text
                color="#191919"
                fontFamily="Euclid Circular B"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
              >
                faster customer support case resolution
              </Text>
            </Box>
            <Box w="262px">
              <Text
                color="#1D6169"
                fontFamily="Syne"
                fontSize="56.049px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="147.4%"
                letterSpacing="1.121px"
              >
                75%
              </Text>
              <Text
                color="#191919"
                fontFamily="Euclid Circular B"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
              >
                feel more connected to their teams
              </Text>
            </Box>
            <Box w="262px">
              <Text
                color="#1D6169"
                fontFamily="Syne"
                fontSize="56.049px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="147.4%"
                letterSpacing="1.121px"
              >
                76%
              </Text>
              <Text
                color="#191919"
                fontFamily="Euclid Circular B"
                fontSize="20px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
              >
                feel their ability to work remotely has improved
              </Text>
            </Box>
          </SimpleGrid>
        </Stack>
        <Stack
          zIndex={-1}
          position={'absolute'}
          right={'0'}
          top={'-12%'}
          w="347px"
          h="321px"
          as="span"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgImage={teamCollab.src}
          alt="loop_chat_section"
        />
      </Box>
    </Stack>
  );
};

export default LoopTeamEfficiency;
