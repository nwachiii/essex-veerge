import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';

const AgentsGuide = ({
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
          textTransform={'uppercase'}
          color="#000"
          fontSize="32px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
        >
          {`Veerge Premier Agent Portal`}
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
          Introducing the Veerge Premier Agent Portal
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          <b style={{fontWeight: '500', lineHeight: '40px'}}>
           {` Your gateway to success in today's dynamic real estate landscape:`}
          </b>{' '}
          <br /> {`As a real estate professional, achieving excellence requires cutting-edge tools and
          resources, and that's precisely what Veerge offers. Let's dive deep into the key
          functionalities that make Veerge Premier Agent a must-have for data-driven and
          dream-fulfilling agents.`}
        </Text>
      </Stack>
      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Client Management Tools:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          <b style={{fontWeight: '500', lineHeight: '40px'}}>Empowering personalized experiences</b>{' '}
          <br />
         {` Veerge Premier Agent understands that each client's home-buying journey is unique. To
          deliver personalized experiences, the platform provides a treasure trove of data-driven
          insights and resources. From understanding client preferences to analyzing market trends,
          these powerful tools enable agents to make informed decisions, ensuring they meet and
          exceed their clients' expectations at every step of the process. By utilizing these
          tailored solutions, agents can forge lasting relationships with their clients, leading to
          increased referrals and elevated client satisfaction.`}
        </Text>
      </Stack>

      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Request Commission:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          <b style={{fontWeight: '500', lineHeight: '40px'}}>
            A Seamless Path to Fair Compensation
          </b>
          <br /> {`At the core of Veerge Premier Agent's philosophy is the recognition of hard work
          and dedication put in by agents to close deals. To streamline the payment process and
          promote transparency, the platform offers a seamless commission request feature.Agents can
          easily submit their commission requests through the portal, ensuring that their efforts
          are duly acknowledged, and they receive fair compensation for their achievements. This
          motivates agents to perform at their best, fostering a thriving and results-driven
          community within the Veerge network.`}
        </Text>
      </Stack>

      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Track Your Performance:
        </Text>
        <Text
          fontFamily="Euclid Circular B"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          color="#000"
        >
          <b style={{fontWeight: '500', lineHeight: '40px'}}> Data-Driven Success Strategies</b>{' '}
          <br /> In the real estate industry, continuous improvement is the key to staying ahead of
          the competition. Veerge Premier Agent provides a comprehensive performance tracking tool
          that delves into valuable insights on key performance indicators (KPIs), conversion rates,
          and client feedback. Armed with this data, agents gain a comprehensive understanding of
          their strengths and areas that demand improvement. With these valuable insights, agents
          can create well-informed strategies to surpass their business goals and solidify their
          position as top-performing professionals.
        </Text>
      </Stack>

      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Streamlined Client Management:{' '}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          <b style={{fontWeight: '500', lineHeight: '40px'}}>
            Maximizing Efficiency and Responsiveness
          </b>{' '}
          <br /> In the fast-paced world of real estate, time is of the essence. Veerge Premier
          Agent Portal streamlines client management through an automated system that intelligently
          assigns incoming leads to agents based on custom routing rules. This ensures that no lead
          goes unnoticed, and agents can promptly respond to potential clients, enhancing the
          chances of converting leads into successful deals. By leveraging this efficient system,
          agents can build a reputation for responsiveness and reliability, further establishing
          themselves as trusted advisors.
        </Text>
      </Stack>

      <Stack spacing={'5px'} mt="30px">
        <Text color="#000" fontSize="24px" fontStyle="normal" fontWeight="600">
          Stay on Top of Lead Conversion:
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          <b style={{fontWeight: '500', lineHeight: '40px'}}>Data-Backed lead nurturing</b> <br />{' '}
          Understanding lead behavior and progress is critical for successful lead conversion.
          Veerge Premier Agent Portal equips agents with valuable insights into current engagements
          and lead progress in the home-buying journey. With this comprehensive knowledge, agents
          can craft personalized and data-backed lead nurturing strategies, cultivating stronger
          relationships and increasing the likelihood of turning prospects into satisfied
          homeowners.
        </Text>
      </Stack>
      <Stack spacing={'20px'} mt="30px">
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Veerge Premier Agent Portal is a transformative platform that propels real estate agents
          to new heights of success. By harnessing its data-driven insights, streamlined client
          management, and comprehensive performance tracking, agents can thrive in a competitive
          market. Embracing the power of Veerge Premier Agent empowers real estate professionals to
          deliver exceptional client experiences, make confident decisions, and create lasting
          connections. As they elevate their business to unprecedented levels, agents play a pivotal
          role in turning dreams into reality for their clients throughout the home-buying journey.
        </Text>
      </Stack>

      <Stack spacing={'20px'} mt="30px">
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="500">
          Join Veerge Premier Agent Portal and unlock your true potential in the ever-evolving world
          of real estate.
        </Text>
      </Stack>
    </Stack>
  );
};

export default AgentsGuide;
