import {Box, Center, Stack, Text} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {CustomAccordion} from 'ui-lib/ui-lib.components';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const FAQForLoop = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box w="full" mx="auto" bg="#010D13" py="45.5px">
      <Center w="full" maxW="984px" mx="auto">
        <Stack w="100%" align="center">
          <Box w="705px" textAlign={'center'} color="#EAECF0">
            <Text fontFamily="Syne" fontSize="48px" fontStyle="normal" fontWeight="600">
              Frequently Asked <span style={{color: '#2ED3B7'}}>Questions</span>
            </Text>
            <Text
              mt={'20px'}
              color="#EAECF0"
              fontSize="20px"
              fontWeight="400"
              lineHeight="30px"
              fontStyle="normal"
              textAlign="center"
              fontFamily="Euclid Circular B"
            >
              Everything you need to know about Loop
            </Text>
          </Box>
          <Stack align="center" w="95%" my="33px" mx="auto">
            <CustomAccordion
              isCustomIcon
              pt={2}
              color="#fff"
              bg="#010D13"
              headerColor={'#fff'}
              expandedBg={'transparent'}
              header={'How does Loop improve business communication?'}
            >
              <Stack spacing={4} px={4} py={4}>
                <Text
                  color="#FFFFFF"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  Loop significantly enhances business communication through its powerful features
                  that enable teams to collaborate efficiently and stay aligned. The platform
                  organizes conversations into channels, providing a centralized space where team
                  members can come together to share ideas, make decisions, and propel work forward.
                </Text>
              </Stack>
            </CustomAccordion>
            <CustomAccordion
              isCustomIcon
              bg="#010D13"
              color="#fff"
              h="fit-content"
              headerColor={'#fff'}
              expandedBg={'transparent'}
              header={'Are Loop messages secure?'}
              pt={2}
            >
              <Stack spacing={4} px={4} py={4}>
                <Text
                  color="#FFFFFF"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  {` Absolutely. Security is of utmost importance within Loop. You can have full
                  confidence in Loop's commitment to safeguarding your workspace's information with
                  the highest level of protection.`}
                </Text>
              </Stack>
            </CustomAccordion>

            <CustomAccordion
              isCustomIcon
              bg="#010D13"
              expandedBg={'transparent'}
              headerColor={'#fff'}
              color="#fff"
              h="fit-content"
              header={'How do I connect with an external company?'}
              pt={2}
            >
              <Stack spacing={4} px={4} py={4}>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>1.</span> Share a Channel: You can invite
                  someone from outside your company to share a specific channel on Loop. This allows
                  them to collaborate directly with your team members within the channel, making it
                  convenient for joint projects or discussions on common topics.
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>2.</span> Direct Messages (DMs): Alternatively,
                  you have the option to skip the channels initially and directly send an invitation
                  for exchanging direct messages. This operates similarly to traditional direct
                  messaging, allowing you to communicate privately and efficiently with external
                  parties as if you were using other DM platforms.
                </Text>
              </Stack>
            </CustomAccordion>
            <CustomAccordion
              isCustomIcon
              bg="#010D13"
              expandedBg={'transparent'}
              headerColor={'#fff'}
              color="#fff"
              h="fit-content"
              header={'What are some best practices for channels?'}
              pt={2}
            >
              <Stack spacing={4} px={4} py={4}>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="180"
                  data-aos-easing="ease-in-sine"
                >
                  {`To make the most of channels and optimize your team's collaboration, consider
                  implementing these best practices:`}
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>1.</span> Consistent Naming Convention: Adopt a
                  standardized naming convention for channels throughout your organization. This
                  consistency will help team members quickly identify the relevant channels for
                  their needs, ensuring easy navigation and streamlined communication.
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="210"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>2.</span>{' '}
                  {`Clear Channel Purpose: Ensure each
                  channel has a well-defined purpose, and include a clear description of its
                  objective in the channel details. This will help members understand the channel's
                  focus and ensure that discussions remain relevant and on-topic.`}
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="220"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>3.</span> Regularly Update Channel Topics: Keep
                  channel topics up to date with a concise summary of ongoing activities and
                  projects. This ensures that all team members are aware of the current focus and
                  progress within the channel.
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="230"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>4.</span> Set Up New{' '}
                  {`Channels Effectively: When
                  creating new channels, kick things off efficiently by uploading essential project
                  files related to the channel's purpose. Additionally, post a warm welcome message
                  to encourage engagement and collaboration from the start.`}
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="240"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>5.</span> Pin Key Files and Information: Pin
                  important files and relevant information to the channel for easy access. This
                  makes it convenient for new members to catch up on past discussions and find
                  crucial resources without sifting through the entire conversation history.
                </Text>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="250"
                  data-aos-easing="ease-in-sine"
                >
                  <span style={{marginRight: '5px'}}>6.</span> Include the Right Team Members:
                  Ensure that all relevant individuals involved in a project or topic are added to
                  the channel. This fosters a collaborative environment where team members have a
                  single platform to work together, promoting efficient communication and
                  decision-making.
                </Text>
              </Stack>
            </CustomAccordion>
            <CustomAccordion
              isLast
              isCustomIcon
              bg="#010D13"
              expandedBg={'transparent'}
              headerColor={'#fff'}
              color="#fff"
              h="fit-content"
              header={'Which Subscription level is eligible for Loop?'}
              pt={2}
            >
              <Stack spacing={4} px={4} py={4}>
                <Text
                  color="#fff"
                  fontFamily="Euclid Circular B"
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="26.52px"
                  data-aos="fade-up"
                  data-aos-offset="100"
                  data-aos-easing="ease-in-sine"
                >
                  As of now, Loop is accessible to users with the Tier 3 Veerge Plus subscription.
                  However, starting from December 2023, it will become available for all tiers of
                  Veerge Plus and Premium subscriptions. This expansion will allow a wider range of
                  users to enjoy the benefits and features of Loop, enhancing their collaboration
                  and communication experience within the platform.
                </Text>
              </Stack>
            </CustomAccordion>
          </Stack>
          <Text color={'#FCFCFD'}>
            Do you have more questions? Kindly
            <a
              href="https://veerge-support.myxellia.io/"
              target="_blank"
              rel="noreferrer"
              style={{color: '#2ED3B7', cursor: 'pointer'}}
            >
              {' '}
              contact support
            </a>{' '}
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default FAQForLoop;
