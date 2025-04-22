import {Box, VStack, Image, Heading, Text, Spinner} from '@chakra-ui/react';
import Link from 'next/link';
import {Button} from 'ui-lib/ui-lib.components/Button';
import listing from '/src/images/icons/quick_start_listings_img.svg';
import allocation from '/src/images/quick_start_allocation_img.svg';
import archive from '/src/images/icons/quick_start_archive_unit_img.svg';
import web_app from '/src/images/quick_start_web_img.svg';
import customer from '/src/images/icons/quick_start_create_customer_img.svg';
import sales from '/src/images/quick_start_sales_img.svg';
import {UserSettingsDrawer} from '@/components/Drawers/userSettingsDrawer';

let user;
try {
  user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'));
} catch (err) {
  console.log(err);
}

export const quickStart_signup = (first_name, last_name) => ({
  topic: "Let's Get Started - Complete Registration and Verify Your Profile",
  type: 'complete_sign_up',

  content: (
    <>
      <VStack align="flex-start" spacing="none" w="full">
        <Heading px="15px" as="h2" fontSize="16px" mb="15px" fontWeight="700">
          Welcome, {`${first_name ?? ''} ${last_name ?? ''}`}
        </Heading>
        <VStack w="full" spacing="20px" mb="15px" px="15px">
          <Text fontSize="14px" fontWeight="300">
            {`Great news! You're one step closer to starting with us. To get started as soon as
            possible, please follow the steps below`}
          </Text>
          <ol
            style={{
              fontSize: '12px',
              paddingLeft: '30px',
              alignSelf: 'flex-start',
              fontWeight: '300',
              listStyleType: 'decimal',
              listStylePosition: 'inside',
            }}
            type={1}
          >
            <li>Fill BVN</li>
            <li>{`Company’s website`}</li>
            <li> {`Fill company’s Bio`}</li>
            <li> Fill social Media links</li>
          </ol>
          <Text fontSize="14px" fontWeight="300">
            {`Completing these steps will ensure that your profile is verified and ready for use. If you have any questions or issues, don't hesitate to reach out to our support team. We can't wait to have you on board`}
          </Text>
        </VStack>
        <Button
          alignSelf="flex-start"
          w="fit-content"
          fontWeight="400"
          variant={'dark'}
          notes
          px="17.5"
          h="38px"
        >
          <UserSettingsDrawer>
            <Link prefetch={false} href={'#'}>
              Complete sign up
            </Link>
          </UserSettingsDrawer>
        </Button>
      </VStack>
    </>
  ),
});

const quickStart_createListings = {
  topic: 'List Your Property Now!',
  type: 'create_a_listing',
  content: (
    <VStack as="section" align="flex-start" spaing="15px" px="15px">
      <Image mt={2} borderRadius={'5px'} src={listing.src} alt="allocation image" />

      <Text fontSize="14px" fontWeight="300">
        {` To make the most of your experience, we recommend adding your properties as soon as
        possible. Once your account is approved, head over to the "New Listings" section to list
        your property`}
      </Text>
      <Button
        alignSelf="flex-start"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        notes
        px="17.5"
        h="38px"
        onClick={() => window.open('https://veerge-support.myxellia.io/create_listing', '_blank')}
      >
        Learn More
      </Button>
    </VStack>
  ),
};

const quickStart_createAllocations = {
  topic: 'Number Your Property Units',
  type: 'create_allocations',
  content: (
    <VStack as="section" align="flex-start" spacing="15px" w="full" px="15px">
      <Image mt={2} src={allocation.src} alt="allocation image" />
      <Text fontSize="14px" fontWeight="300">
        {` To make it easier for home owners to select and locate specific properties, we recommend numbering each property unit. Simply add the unit numbers to the listing, and you're good to go.`}
      </Text>
      <Button
        alignSelf="flex-start"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        notes
        px="17.5"
        h="38px"
        onClick={() =>
          window.open('https://veerge-support.myxellia.io/listings/create_unit', '_blank')
        }
      >
        Learn More
      </Button>
    </VStack>
  ),
};

const quickStart_archive_unit = (updateQuickStart, isLoading) => ({
  topic: 'Keep Your Listings Accurate',
  type: 'archive_unit',
  content: (
    <VStack as="section" align="flex-start" spacing="15px" w="full" px="15px">
      <Image mt={2} borderRadius={'5px'} src={archive.src} alt="allocation image" />
      <Text fontSize="14px" fontWeight="300">
        To keep your listings accurate and up-to-date, we recommend <b>archiving units</b> that have
        been sold prior to signing up on Veerge or are not currently available for sale. Archiving
        units ensures that potential buyers only see properties that are still available for
        purchase.
      </Text>
      <Button
        notes
        h="38px"
        px="17.5"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        alignSelf="flex-start"
        onClick={updateQuickStart}
      >
        {isLoading ? <Spinner /> : 'Got it'}
      </Button>
    </VStack>
  ),
});

const quickStart_publish_a_store = {
  topic: 'Create Your Web Application',
  type: 'publish_a_store',
  content: (
    <VStack as="section" align="flex-start" spacing="15px" w="full" px="15px">
      <Image mt={2} borderRadius={'5px'} src={web_app.src} alt="allocation image" />
      <Text fontSize="14px" fontWeight="300">
        {` The next step is to create an online web application platform that connects your offerings
        with potential buyers.
        ${(
          <br />
        )} This interface showcases your properties to the world. It's where potential buyers
        can sign up, browse, learn more about what you have to offer, and make purchases whilst
        personalising everyone’s journey.`}
      </Text>
      <Text fontSize="14px" fontWeight="300">
        {`But that's not all - it also allows buyers to manage their assets, transactions, and everything associated with their property.`}{' '}
      </Text>
      <Text fontSize="14px" fontWeight="300">
        {` If you have questions, We're here to support you every step of the way.`}
      </Text>
      <Button
        alignSelf="flex-start"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        notes
        px="17.5"
        h="38px"
        onClick={() =>
          window.open('https://veerge-support.myxellia.io/application_guide#unleashing', '_blank')
        }
      >
        Learn More
      </Button>
    </VStack>
  ),
};

const quickStart_create_customer_account = {
  topic: 'Create customer account ',
  type: 'create_a_customer_account',
  content: (
    <VStack as="section" align="flex-start" spacing="15px" w="full" px="15px" pb={4}>
      <Image mt={2} borderRadius={'5px'} src={customer.src} alt="allocation image" />
      <Text fontSize="14px" fontWeight="300">
        {`  We understand that some transactions may have taken place before signing up on our platform.
        That's why we offer the option to create a home owner account, so all your customers can be
        in one place and enjoy the same impeccable customer experience as new customers who sign up
        on your web application.`}
      </Text>
      <Text fontSize="14px" fontWeight="300">
        This allows you to streamline transactions, keep track of all your customers, and identify
        opportunities for future business.
      </Text>
      <Text fontSize="14px" fontWeight="300">
        By knowing when your customers might want to buy another property, you can be proactive and
        offer them personalized service that keeps them coming back.
      </Text>
      <Text fontSize="14px" fontWeight="300">
        {`We're here to support you every step of the way!`}
      </Text>
      <Button
        alignSelf="flex-start"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        notes
        px="17.5"
        h="38px"
        onClick={() =>
          window.open('https://veerge-support.myxellia.io/create_client_account', '_blank')
        }
      >
        Learn More
      </Button>
    </VStack>
  ),
};

const quickStart_invite_agent = {
  topic: 'Set Up Sales commission',
  type: 'invite_agents',
  content: (
    <VStack as="section" align="flex-start" spacing="15px" w="full" px="15px" mb={4} pb={8}>
      <Image mt={2} objectFit="cover" borderRadius={'5px'} src={sales.src} alt="allocation image" />
      <Text fontSize="14px" fontWeight="300">
        Maximize the Motivation of Your Sales Team and Approved Realtors by Rewarding them for Every
        Successful Sale.
      </Text>
      <Text fontSize="14px" fontWeight="300">
        Take the first step by encouraging them to set up their accounts on your user-friendly web
        platform, which enables seamless tracking of their sales and ensures they are duly
        compensated for their relentless efforts.
      </Text>
      <Button
        alignSelf="flex-start"
        w="fit-content"
        fontWeight="400"
        variant={'dark'}
        notes
        px="17.5"
        h="38px"
        onClick={() => window.open('https://veerge-support.myxellia.io/agents_signup', '_blank')}
      >
        Learn More
      </Button>
    </VStack>
  ),
};

export const quickStartArray = (first_name, last_name, updateQuickStart, isLoading) => [
  quickStart_signup(first_name, last_name),
  quickStart_createListings,
  quickStart_createAllocations,
  quickStart_archive_unit(updateQuickStart, isLoading),
  quickStart_publish_a_store,
  quickStart_create_customer_account,
  quickStart_invite_agent,
];
