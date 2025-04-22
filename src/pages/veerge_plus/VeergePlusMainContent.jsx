import {Box, Flex, Image, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {BsDot} from 'react-icons/bs';
import mockup from '/src/images/Mockup screen.svg';

export const VeergePlusMainContent = ({
  launchWithEase,
  PMRMMFNS,
  performanceOptimization,
  securityWithInsights,
  committedToSupport,
  Channels,
  pricingBreakdown,
  gettingStarted,
}) => {
  return (
    <Stack w="621px" fontFamily="Euclid Circular B" pb="86px">
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
          VEERGE PLUS
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
          Published: November 10, 2022
        </Text>
      </Box>
      <Stack ref={PMRMMFNS} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          w="660px"
        >
          {`Personalize More, Retain More, Move Fast, Never Stop`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          Veerge Plus is the ultimate real estate cloud-based infrastructure designed to help you
          reach more potential buyers, convert and retain them, and scale your business rapidly.
        </Text>
      </Stack>

      <Stack ref={performanceOptimization} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          w="100%"
        >
          {`Optimized for performance`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          With Veerge Plus, you can move fast and innovate even faster. Stay ahead of the
          competition by being the first to market with new features and responding to shifting
          trends in real time. Veerge Plus provides you with an entire ecosystem of apps and
          services that support your growth.
        </Text>
      </Stack>
      <Stack ref={launchWithEase} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          w="100%"
        >
          {`Migrate and launch with Ease`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          Launching your application store on Veerge is a breeze. The platform is customizable and
          user-friendly, allowing you to migrate and launch your app quickly. Ship new campaigns,
          channels, customizations, and experiments at a rapid pace, and iterate daily to stay
          ahead. Automate repetitive and high-performing workflows across your systems and create
          tailored solutions for your business through the specialized app and partner ecosystem.
        </Text>
      </Stack>
      <Stack ref={securityWithInsights} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          w="100%"
        >
          {`Built-In Security and Insights`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt={-3}>
          Veerge Plus prioritizes security, compliance, data encryption, fraud protection, and bot
          protection. Rest assured that your business and customer data will always be secure. Gain
          holistic data and insights with detailed reporting across all channels, empowering you to
          make data-driven decisions. Additionally, enjoy an impressive average uptime of 99.98%
          across channels.
        </Text>
      </Stack>
      <Stack ref={committedToSupport} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          w="100%"
        >
          {`Committed to Support`}
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          <span>We believe in providing exceptional support to our users. </span>
        </Text>

        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            Enjoy 24/7 priority technical support via phone, email, or live chat. Our dedicated
            support team is always ready to assist you.{' '}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            Gain valuable platform knowledge and industry insights while also staying updated with
            the latest trends and strategies.{' '}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            {`Experience personalized migration, launch, and account management support at no extra
            cost. We'll guide you every step of the way.`}{' '}
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            Customize your platform further with over 100 certified apps and tailor Veerge Plus to
            suit your specific business requirements.
          </span>
        </Text>
      </Stack>
      <Stack ref={Channels} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          w="100%"
        >
          {`Channels`}
        </Text>

        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt="-3">
          Veerge offers multiple channels to enhance your real estate business:
        </Text>
        <Stack as="ol" w="621px" pl="10px" spacing="30px">
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Veerge Portal: </b> A user-friendly web portal where
              you can manage all your business operations. It provides a comprehensive overview of
              your revenue, an advanced inventory management system, and a leads management system.
              The Veerge Portal serves as the infrastructure to balance day-to-day business
              activities with long-term business strategies.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>2.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Agent Portal: </b> A dedicated platform designed
              specifically for agents. It allows them to track leads, manage client interactions,
              and streamline their real estate operations. Additionally, agents can use the Agent
              Portal to track commissions earned.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>3.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Mobile App: `}</b>{`Veerge's mobile app acts as a
              bridge between your offerings and your customers' expectations. It serves as a
              convergence point where buyers and offerings seamlessly coexist. The mobile app
              provides a personalized experience tailored to each buyer's unique needs throughout
              their home ownership journey.`}
            </span>
          </Text>
        </Stack>
        <Image w="608px" h="375px" src={mockup.src} alt="" />
        <a href="https://medium.com/@ahmed.ibraheem/the-new-era-of-real-estate-31a4186a0bbb">
          <Text color="#4545FE" fontSize="12px" fontStyle="normal" fontWeight="400" mt={-6}>
            Click here to read more
          </Text>
        </a>
      </Stack>

      <Stack ref={pricingBreakdown} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          w="100%"
        >
          {`Pricing and Cost Breakdown`}
        </Text>

        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt="-3">
          {`Veerge offers various pricing options to cater to different business needs and budgets.
          Here's a breakdown of the costs:`}
        </Text>
        <Stack as="ol" w="621px" pl="10px">
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Mobile App Theme and Integration Cost: </b> This cost
              covers the theme of the mobile app and its integration. The total cost is{' '}
              <b style={{fontWeight: '600'}}>$7,200.00</b>, which is a one-time fee. However, Veerge
              provides discounts for payment plans. You can avail a{' '}
              <b style={{fontWeight: '600'}}>5%</b> discount by making two payments, or a{' '}
              <b style={{fontWeight: '600'}}>10%</b> discount for an upfront payment. If paid
              monthly, the cost will be $600 per month for a year.
            </span>
          </Text>
        </Stack>
        <Flex
          w="full"
          h="50px"
          bg="#EAEAEA"
          borderRadius={'8px'}
          align={'center'}
          mx="auto"
          gap="10px"
          px={4}
          mt="15px"
        >
          <AiOutlineInfoCircle style={{height: '24px', width: '24px'}} />
          <Text fontSize={'16px'}>Theme fee is a one time payment</Text>
        </Flex>
        <Link href="/veerge_plus/veerge_theme">
          <Text color="#4545FE" fontSize="12px" fontStyle="normal" fontWeight="400" mt="15px">
            Click here to read more on themes
          </Text>
        </Link>
        <Text
          display={'flex'}
          gap="9px"
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>2.</span>{' '}
          <span>
            <b style={{fontWeight: '700'}}>Subscription: </b>
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          mt={-3}
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            <b style={{fontWeight: '600'}}>Tier 1:</b> The basic subscription tier costs{' '}
            <b style={{fontWeight: '600'}}>$750.00</b>. It provides all the necessary technical
            resources to support your real estate business operations. This tier includes ongoing
            support, updates for the Veerge Portal and Agent Portal, and 24/7 technical assistance
            to ensure smooth functioning.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            <b style={{fontWeight: '600'}}>Tier 2: </b> Priced at{' '}
            <b style={{fontWeight: '600'}}>$900.00</b>, Tier 2 includes everything in Tier 1, along
            with updates for the licensed mobile app theme. Whenever a new feature or design
            enhancement is released for the mobile app, it is immediately integrated. Tier 2 also
            offers load balancers, multi-region architecture, autoscaling, fully dedicated support,
            and insights for expansion opportunities. It supports unlimited staff accounts without
            additional costs.
          </span>
        </Text>
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
          pl={6}
        >
          <span>
            Note: Tier 1 already covers updates and new features for the Veerge Portal and Agent
            Portal, while Tier 2 covers updates specifically for the licensed mobile app theme.
          </span>
        </Text>

        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          {' '}
          <span>
            <BsDot style={{fontSize: '26px'}} />
          </span>{' '}
          <span>
            {' '}
            <b style={{fontWeight: '600'}}>Tier 3: </b> Priced at{' '}
            <strong style={{fontWeight: '600'}}>$1,100.00</strong>, Tier 3 includes everything in
            Tier 2, along with advanced functionalities to meet complex business requirements. This
            tier is suitable for property developers with a high quantity of inventory who aim to
            expand their business.
          </span>
        </Text>
      </Stack>
      <Flex
        w="full"
        h="fit-content"
        bg="#EAEAEA"
        py={6}
        borderRadius={'8px'}
        align={'flex-start'}
        mx="auto"
        gap="10px"
        px={4}
        mt="15px"
      >
        <AiOutlineInfoCircle style={{height: '24px', width: '24px'}} />
        <Box w="565px">
          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            {' '}
            All prices mentioned are exclusive of VAT. Veerge provides discounts on subscription
            fees based on the payment term. Enjoy a 10% discount when paying upfront for one year
            and a 5% discount for a six-month payment term. However, if you opt for monthly payments
            of both subscription fees and the theme licensing fee, the costs are as follows:
          </Text>
          <Stack spacing="12px" py="20px" pl={4}>
            <Text
              display={'flex'}
              as="li"
              color="#000"
              fontSize="16px"
              fontStyle="normal"
              fontWeight="300"
              mt={-3}
            >
              {' '}
              <span>
                <BsDot style={{fontSize: '26px'}} />
              </span>{' '}
              <span>
                <b style={{fontWeight: '600'}}>TIER 1:</b> $1,350.00 ($750.00 + $600.00){' '}
              </span>
            </Text>
            <Text
              display={'flex'}
              as="li"
              color="#000"
              fontSize="16px"
              fontStyle="normal"
              fontWeight="300"
              mt={-3}
            >
              {' '}
              <span>
                <BsDot style={{fontSize: '26px'}} />
              </span>{' '}
              <span>
                <b style={{fontWeight: '600'}}>TIER 2: </b> $1,500.00 ($900.00 + $600.00)
              </span>
            </Text>
            <Text
              display={'flex'}
              as="li"
              color="#000"
              fontSize="16px"
              fontStyle="normal"
              fontWeight="300"
              mt={-3}
            >
              {' '}
              <span>
                <BsDot style={{fontSize: '26px'}} />
              </span>{' '}
              <span>
                <b style={{fontWeight: '600'}}>TIER 3: </b> $1,700.00 ($1,100.00 + $600.00)
              </span>
            </Text>
          </Stack>

          <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
            {' '}
            Please note that the theme fee is a one-time payment. The additional $600.00 mentioned
            above represents the monthly payment for spreading the fee across a year, allowing
            flexibility for those who prefer to pay in installments rather than upfront.
          </Text>
        </Box>
      </Flex>
      <Stack spacing={'20px'} mt="30px">
        <Text
          display={'flex'}
          as="li"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          <span>
            {`If you're uncertain about which pricing plan to choose, you can schedule a meeting with
            Veerge support. They will assist you in transforming your business and finding the
            perfect plan. Remember, you can always upgrade your plan when needed.`}
          </span>
        </Text>
      </Stack>

      <Stack ref={gettingStarted} spacing={'20px'} mt="30px">
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="22px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          w="100%"
        >
          {`Getting started with Veerge`}
        </Text>

        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300" mt="-3">
          Getting started with Veerge is simple and straightforward. Follow these steps to begin
          your journey:
        </Text>
        <Stack as="ol" w="621px" pl="10px">
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Sign up for a Free Trial: </b> Visit{' '}
              <a style={{color: '#4545FE'}} href="https://veerge.myxellia.io">
                Veerge.myxellia.io
              </a>{' '}
              {`and register for a free trial. This will grant you access to the platform, enabling
              you to test the application, make design decisions, and explore its features. It's an
              opportunity to familiarize yourself with Veerge before committing to an active monthly`}
              plan.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>2.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>Select a Plan: </b> Before starting the free trial,
              choose a plan that aligns with your business requirements and goals. This step ensures
              a seamless transition from the trial period to an ongoing subscription. Pick the plan
              that suits your needs and fits your budget to continue using Veerge after the trial
              ends.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>3.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Approval and Trial Access: `}</b>{`Once your account is
              approved, you'll gain access to your free trial period. During this time, you'll
              receive a TestFlight link for Apple users and an internal test link for Android users.
              These links enable you to experience Veerge on your preferred device, ensuring a
              smooth and tailored user experience.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>4.</span>
            <span>
              <b style={{fontWeight: '700'}}>{`Enjoy the Free Trial: `}</b>Make the most of your
              free trial by diving into the Veerge platform. Explore its capabilities, customize
              your experience, and take advantage of its powerful features. The trial period allows
              you to shape and fine-tune your real estate infrastructure. Rest assured that there
              are no subscription fees during this phase, providing you with an opportunity to
              evaluate Veerge without any financial commitment.
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>5.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Theme Licensing Fee: `}</b>{`Should you decide to go
              live with Veerge, you'll be required to make a payment for the licensing fee of the
              mobile app theme. This fee guarantees that your mobile application will have an
              appealing and functional design, enhancing the overall user experience.`}
            </span>
          </Text>
          <Text
            display={'flex'}
            gap="9px"
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="300"
          >
            {' '}
            <span>6.</span>{' '}
            <span>
              <b style={{fontWeight: '700'}}>{`Payment and Go-Live: `}</b> {`When you're ready to
              launch your real estate operations with Veerge, proceed with the payment to go live.
              This step enables you to actively use Veerge and leverage its capabilities to grow
              your business effectively.`}
            </span>
          </Text>
        </Stack>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Throughout your transformation journey, Veerge is committed to supporting you. Enjoy the
          seamless experience, personalized features, and exceptional support provided by Veerge as
          you embark on this new chapter.
        </Text>
      </Stack>
    </Stack>
  );
};

export default VeergePlusMainContent;
