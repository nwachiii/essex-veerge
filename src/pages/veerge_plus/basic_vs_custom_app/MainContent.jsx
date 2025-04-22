import {
  Box,
  Flex,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';
import img1 from '/src/images/veerge-plus-basic-vs-custom1.svg';
import img2 from '/src/images/veerge-plus-basic-vs-custom2.svg';

export const BasicVsCustomAppGuideContent = ({
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
  yourResponsibilities,
  feesAndTaxes,
  confidentiality,
  limitationOfLiability,
  intellectualProperty,
  betaServices,
  feedback,
  privacyPolicy,
  modifications,
  generalConditions,
}) => {
  return (
    <Stack fontFamily="Euclid Circular B" pb="86px">
      <Box>
        <Text
          color="#000"
          fontSize="32px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
        >
          {`What is the difference between Basic & Custom app ? `}
        </Text>
        <Text
          color="#606060"
          fontSize="14px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          mt="15px"
        >
          Published: November 1, 2022
        </Text>
      </Box>
      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          The Veerge Dilemma
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`In the fast-paced world of real estate, staying ahead of the curve is crucial for property
          development companies of all sizes. In recent times, Veerge has emerged as the go-to
          application development suite, captivating developers with its user-friendly interface and
          robust features. But here's the catch - should you settle for a basic Veerge application,
          or should you dare to dream big with a custom-built solution?`}
        </Text>
      </Stack>
      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Unleashing the Power of Basic Application
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Picture this - a standard Veerge application that can be up and running in less than 30
          seconds! Sounds like a dream for startups and small development companies with limited
          resources, right?
        </Text>
        <Box mt="15px">
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            {`This basic version is the perfect launchpad for those eager to make their mark in the
            digital landscape. But, let's dive deeper into what it offers:`}
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>• Pre-designed Templates:</b> <br />{' '}
          {`  While the basic Veerge application boasts visually appealing templates, they might lack
            that spark of individuality, as other development companies could be using the same
            ones. But hey, it's a head start, nonetheless!`}
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>• Limitations of Customization:</b>{' '}
            <br /> {`The downside of basic Veerge lies in its restricted level of customization. You
            may not have complete control over every nook and cranny of your store's appearance and
            functionality. But sometimes, baby steps can lead to giant leaps!`}
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>• Budget-Friendly Bliss:</b> <br />{' '}
           {` Here's the silver lining - the basic Veerge application is lighter on the pocket. For
            cash-strapped startups, this could be the ticket to digital success without breaking the
            bank.`}
          </Text>
        </Box>
        <Image w="688.938px" mt="50px" objectFit={'cover'} src={img1.src} alt="" />
      </Stack>
      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Enter the Realm of Custom Application
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`Now, let's talk about making a bold statement with a custom Veerge application. This
          bespoke solution is designed to match your unique business requirements and ambitions.
          Brace yourself, because the possibilities are endless:`}
        </Text>
        <Box mt="15px">
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>
              • Unparalleled Design and Branding:
            </b>{' '}
            <br /> {`With custom Veerge applications, your store will reflect your brand's personality
            like never before. Say goodbye to cookie-cutter designs and embrace a visually
            captivating online presence that's uniquely yours.`}
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>• Endless Customization:</b> <br />{' '}
           {` It's your dream store - why settle for anything less? Tailor every aspect of your Veerge
            application to your heart's desire. From jaw-dropping listings to personalized user
            experiences, the custom route leaves no stone unturned.`}
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>
              • Built for Scale and Performance:
            </b>{' '}
            <br /> Your success should know no bounds, and neither should your application!
            Custom-built solutions are optimized for performance and scalability, ensuring you can
            handle the rush of visitors and growth with ease.
          </Text>
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            <b style={{fontWeight: '500', lineHeight: '40px'}}>• A Splurge Worth Considering:</b>{' '}
            <br /> {`Your success should know no bounds, and neither shoAdmittedly, custom Veerge
            applications come with a higher initial cost, but investing in your vision could be the
            wisest move you ever make. It's time to bet on your success!`}
          </Text>
        </Box>
        <Image w="688.938px" mt="50px" objectFit={'cover'} src={img2.src} alt="" />
      </Stack>
      <Stack spacing={'5px'} mt="15px" position={'relative'}>
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          The Showdown: Basic vs. Custom Veerge Applications:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" w="90%">
         {` Ladies and gentlemen, it's time for the ultimate face-off. Let's compare the two
          contenders.`}
        </Text>
        <TableContainer mt="15px" w="fit-content" borderRadius={'20px'} border="1px solid #e5e5e5">
          <Table variant="simple">
            <Thead h="80px">
              <Tr>
                <Th
                  fontSize={'14px'}
                  color="#191919"
                  textAlign="center"
                  textTransform={'capitalize'}
                  borderRight="1px solid #E9E9E9"
                >
                  Aspect
                </Th>
                <Th
                  fontSize={'14px'}
                  color="#191919"
                  textAlign="center"
                  textTransform={'capitalize'}
                  borderRight="1px solid #E9E9E9"
                >
                  Basic Application
                </Th>
                <Th
                  fontSize={'14px'}
                  color="#191919"
                  textAlign="center"
                  textTransform={'capitalize'}
                >
                  Custom Application
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={'12px'}>
              <Tr h="80px">
                <Td textAlign="center" w="186px" borderRight="1px solid #E9E9E9">
                  Design and Branding
                </Td>
                <Td textAlign="center" w="186px" borderRight="1px solid #E9E9E9">
                  Limited customisation options
                </Td>
                <Td textAlign="center" w="166px" wordBreak={'break-word'}>
                  Unique and branded design
                </Td>
              </Tr>
              <Tr h="80px">
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Features and Functionalities
                </Td>
                <Td textAlign="center" w="139px" borderRight="1px solid #E9E9E9">
                  Standard features and apps
                </Td>
                <Td textAlign="center" w="194px">
                  Tailored functionalities and integrations
                </Td>
              </Tr>
              <Tr h="80px">
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Time to launch
                </Td>
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Quick setup
                </Td>
                <Td textAlign="center">Longer development time</Td>
              </Tr>
              <Tr h="80px">
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Cost
                </Td>
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Lower initial cost
                </Td>
                <Td textAlign="center">Higher initial cost</Td>
              </Tr>
              <Tr h="80px">
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Scalability
                </Td>
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Limited Scalability
                </Td>
                <Td textAlign="center" w="163px">
                  Highly scalable and optimized
                </Td>
              </Tr>
              <Tr h="80px">
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  Demo
                </Td>
                <Td textAlign="center" borderRight="1px solid #E9E9E9">
                  <Text color={'#4545FE'} as={Link} href={'/#'} textDecoration={'underline'}>
                    View Demo
                  </Text>
                </Td>
                <Td textAlign="center">
                  <Text color={'#4545FE'} as={Link} href={'/#'} textDecoration={'underline'}>
                    View Demo
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack spacing={'17px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Making the Right Move
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`At this point, you might be asking yourself, "Which one should I choose?" The answer lies
          in your business's unique needs and aspirations.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          The basic Veerge application offers a quick and budget-friendly start, perfect for small
          companies testing the waters.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          However, if you crave a bespoke masterpiece that aligns perfectly with your brand and can
          withstand the test of time, custom Veerge applications hold the key.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          {`In the end, it's about envisioning the future you want for your real estate venture. So,
          seize the moment, weigh your options, and make a decision that will set you on the path to
          digital triumph!`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default BasicVsCustomAppGuideContent;
