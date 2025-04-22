import {Box, Grid, GridItem, Heading, Icon, Image, Link, Stack, Text} from '@chakra-ui/react';
import {FiArrowUpRight} from 'react-icons/fi';

import conversation_starter from '/src/images/icons/conversation_starter.svg';
import headset_icon from '/src/images/icons/headset_icon.svg';
import loop_icon from '/src/images/icons/loop_icon.svg';

const NoChat = ({loggedinUserFirstName}) => {
  return (
    <Box textAlign="center" py="100px" display="flex" flexDirection="column" gap={20} px="80px">
      <Stack>
        <Text fontSize="24px" color="#606060" fontWeight="500">
          Welcome, {loggedinUserFirstName}
        </Text>

        <Heading as="h2" size="xl" fontSize="30px" fontWeight="500" color="#000000">
          Ready to go? Let&apos;s get this conversation rolling
        </Heading>
      </Stack>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem
          justifySelf="center"
          justifyItems="center"
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <Box alignItems="center">
            <Image
              w="56px"
              h="56px"
              src={conversation_starter.src}
              alt="conversation icon"
              fontSize="10px"
              my="0px"
              mx="auto"
            />
          </Box>

          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifySelf="center"
            gap={2}
          >
            <Heading as="h5" size="lg" fontSize="20px" fontWeight="500">
              Drive better conversations
            </Heading>
            <Text fontSize="12px" fontWeight="300">
              Customers anticipate a holistic relationship with your business. Prioritize their
              inquiries and concerns.
            </Text>
          </Box>
        </GridItem>

        <GridItem
          justifySelf="center"
          justifyItems="center"
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <Box alignItems="center">
            <Image
              w="56px"
              h="56px"
              src={headset_icon.src}
              alt="headset icon"
              fontSize="10px"
              my="0px"
              mx="auto"
            />
          </Box>

          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifySelf="center"
            gap={2}
          >
            <Heading as="h5" size="lg" fontSize="20px" fontWeight="500">
              We’ve got your back
            </Heading>
            <Text fontSize="12px" fontWeight="300">
              Our devoted team of customer support is at your service, ready to address your
              inquiries.
            </Text>
          </Box>
        </GridItem>

        <GridItem
          justifySelf="center"
          justifyItems="center"
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <Box alignItems="center">
            <Image
              w="56px"
              h="56px"
              src={loop_icon.src}
              alt="loop icon"
              fontSize="10px"
              my="0px"
              mx="auto"
            />
          </Box>

          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifySelf="center"
            gap={2}
          >
            <Heading as="h5" size="lg" fontSize="20px" fontWeight="500">
              Collaborate with Loop
            </Heading>

            <Box
              display="flex"
              flexDirection="column"
              justifySelf="center"
              gap={1}
              textAlign="center"
            >
              <Text fontSize="12px" fontWeight="300">
                Unify your team by facilitating seamless communication from diverse locations to
                stay connected and engaged in team discussion.
              </Text>
            </Box>
            <Link href={'/veerge_menu/loop'} cursor="pointer" target="_blank" rel="noopener">
              <Box display="flex" justifyContent="center" alignItems="center" cursor="pointer">
                <Text color="#1D6169" textDecoration="underline" fontWeight="500">
                  Explore
                </Text>

                <Icon as={FiArrowUpRight} color="#1D6169" />
              </Box>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NoChat;
