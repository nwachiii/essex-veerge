import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import React from 'react';

const PrivacyPolicyMainContent = ({
  intro,
  values,
  retention,
  yourRights,
  contactingUs,
  machineLearning,
  protectingYourInfo,
  whyWeProcessYourInfo,
}) => {
  return (
    <Stack fontFamily="Euclid Circular B" pb="70px">
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
          Privacy Policy
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
          Last updated on: May 23, 2022
        </Text>
      </Box>
      <Stack ref={intro}>
        <Text
          color="#000"
          fontSize="24px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          1.INTRODUCTION
        </Text>
        <Text>
          At Veerge, our mission is to enhance the Real Estate industry for everyone involved. This
          Privacy Policy outlines how we collect, use, and share personal information concerning
          various individuals associated with Veerge. These include:
        </Text>
        <Stack as="ol" w="621px" pl="10px">
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>
            <span>
              <b style={{fontWeight: '600'}}>Property development companies:</b> These are
              businesses that utilize Veerge to enhance their operations.
            </span>
          </Text>
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>2.</span>
            <span>
              <b style={{fontWeight: '600'}}>Users:</b> Individuals who make purchases at businesses
              powered by Veerge.
            </span>
          </Text>
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>3.</span>
            <span>
              <b style={{fontWeight: '600'}}>Partners:</b> Individuals or entities who develop apps
              for merchants, build applications on behalf of property development companies, refer
              potential entrepreneurs to Veerge, or provide support to merchants using the Veerge
              platform.{' '}
            </span>
          </Text>
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            <span>4.</span>
            <span>
              <b style={{fontWeight: '600'}}>Visitors:</b> {`Individuals who visit Veerge's websites
              or contact Veerge support. We may update this privacy policy if we make changes to our
              privacy practices, and if any changes are significant, we will inform you through the
              Veerge admin or via email.`}
            </span>
          </Text>
        </Stack>
      </Stack>
      <Stack ref={values}>
        <Text
          color="#000"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          2.Our Values
        </Text>
        <Text>
          At Veerge, we prioritize trust and commit to handling your information responsibly. Three
          core values guide our approach to information and privacy:{' '}
        </Text>
        <Stack as="ol" w="621px" pl="10px">
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>1.</span>
            <span>
              <b style={{fontWeight: '600'}}>Your information belongs to you:</b> We analyze the
              types of information necessary to provide our services and strive to collect only what
              is truly essential. We aim to delete or anonymize information when it is no longer
              needed. Our engineers collaborate with privacy and security teams to ensure privacy is
              a fundamental consideration in our product development. We believe your information is
              your property, and we utilize it solely for your benefit.
            </span>
          </Text>
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>2.</span>
            <span>
              <b style={{fontWeight: '600'}}>We protect your information from others:</b> Unless we
              have your permission or are legally obligated, we refuse to share your personal
              information with third parties. If legal requirements mandate sharing, we will inform
              you in advance unless legally prohibited.
            </span>
          </Text>
          <Text
            as="li"
            color="#000"
            fontSize="16px"
            fontStyle="normal"
            display="flex"
            gap="9px"
            fontWeight="300"
          >
            {' '}
            <span>3.</span>
            <span>
              <b style={{fontWeight: '600'}}>
                We assist property development companies and partners with privacy obligations:
              </b>{' '}
              Recognizing that many property development companies and partners lack dedicated
              privacy teams, we prioritize supporting them in meeting their privacy obligations. We
              design our products and services to facilitate privacy-friendly usage. We provide
              detailed FAQs, documentation, and address privacy-related inquiries.
            </span>
          </Text>
        </Stack>
      </Stack>
      <Stack ref={whyWeProcessYourInfo}>
        <Text
          color="#000"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          3. Why We Process Your Information
        </Text>
        <Text>
          We process your information when fulfilling contractual obligations, such as processing
          subscription payments for using the Veerge platform. We or our affiliates may also use
          your personal information for business-related purposes, including: <br />
        </Text>
        <Box
          as="ol"
          w="621px"
          pl="10px"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Preventing risk and fraud</Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Providing support and addressing inquiries</Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Enhancing and refining our products and services </Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Generating reports and conducting analytics </Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Testing new features or additional services </Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Assisting with marketing, advertising, or communication endeavors </Text>
          </Flex>
        </Box>
        <Text mt="4">
          Before processing personal information, we consider the potential risks to your privacy
          and employ measures to mitigate these risks. We maintain transparency in our privacy
          practices, grant you appropriate control over your personal information, limit the data we
          retain, determine how we use your information, restrict its sharing, define retention
          periods, and employ technical safeguards.{' '}
        </Text>
        <Text mt="4">
          In certain cases, we may process your personal information based on your consent. This
          includes instances where an alternative legal basis for processing is unavailable, where
          you direct us to transfer information to a third party, where we receive data with
          existing consent, or when required by law. You have the right to withdraw your consent by
          changing communication preferences, opting out of our communications, or contacting us.{' '}
        </Text>
        <Text mt="4">
          Depending on your role as a property development company, customer, partner, user, or
          visitor, please refer to our supplemental privacy policies for specific information on
          processing purposes, categories of recipients, and legal bases for processing various
          types of personal data.
        </Text>
      </Stack>
      <Stack ref={yourRights}>
        <Text
          color="#000"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          4. Your Rights Over Your Information
        </Text>
        <Text>
          We believe you should have access to and control over your personal information,
          regardless of your location. Depending on how you utilize Veerge, you may have rights to:{' '}
          <br />
        </Text>
        <Box
          as="ol"
          w="621px"
          pl="10px"
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="300"
        >
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px', marginTop: '-17px'}}>·</span>
            <Text mt="14px">
              Request access, correction, amendment, deletion, or portability of your personal
              information{' '}
            </Text>
          </Flex>
          <Flex my={-4} gap="5px" as="li" display={'flex'} alignItems={'center'}>
            <span style={{fontSize: '40px'}}>·</span>
            <Text mt="6px">Restrict or object to certain uses of your personal information </Text>
          </Flex>
        </Box>
        <Text mt="5">
          Exercising these rights will not result in additional charges or a change in the level of
          service you receive. Please note that some of these rights apply only in specific
          circumstances and may be limited by applicable laws.{' '}
        </Text>
        <Text mt="4">
          If you have purchased something from or provided your information to a Veerge-powered
          application and wish to exercise these rights regarding your purchase or interaction, you
          should directly contact the property development company with which you engaged. We act as
          a processor on their behalf and will assist these companies in fulfilling your requests
          within the confines of the law.
        </Text>
      </Stack>
      <Stack ref={retention}>
        <Text
          color="#000"
          fontSize="24px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          5. Retention of Your Information
        </Text>
        <Text>
          We retain your personal data only for as long as necessary to fulfill the purposes for
          which we collected it. To determine the appropriate retention period, we consider factors
          such as the nature, sensitivity, and volume of personal data, potential risks associated
          with unauthorized use or disclosure, the purposes of processing, the availability of
          alternative means to achieve these purposes, and relevant legal requirements. We also
          retain and utilize your personal information as necessary to comply with legal
          obligations, resolve disputes, and enforce our policies. If you cease using our services
          or delete your account, we will delete your information or anonymize it in an aggregated
          format.
        </Text>
      </Stack>
      <Stack ref={machineLearning}>
        <Text
          color="#000"
          fontSize="24px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          6. Our Use of Machine Learning
        </Text>
        <Text>
          To support property development companies utilizing Veerge, we employ techniques like
          machine learning to enhance our services. In these instances, either a human is involved
          in the process, making it partially automated, or machine learning is used in ways that do
          not have significant legal effects.
        </Text>
      </Stack>
      <Stack ref={protectingYourInfo}>
        <Text
          color="#000"
          fontSize="24px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          7. Protection of Your Information
        </Text>
        <Text>
         {` Our teams work tirelessly to protect your information and ensure the security and
          integrity of our platform. We subject our data storage and financial information
          processing systems to independent audits. However, it's important to note that no method
          of transmission over the Internet or electronic storage can guarantee 100% security. While
          we strive to safeguard your personal information, absolute security cannot be guaranteed.`}
        </Text>
      </Stack>
      <Stack ref={contactingUs}>
        <Text
          color="#000"
          fontSize="24px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="2.88px"
          mt="38px"
          mb="10px"
        >
          8. Contacting Us
        </Text>
        <Text>
        {`  If you have any questions, requests, or complaints regarding the processing of your
          personal information, please don't hesitate to contact Veerge Support. For concerns
          specifically related to how a property development company processes your personal
          information, we recommend reaching out directly to the respective property development
          company or referring to their privacy policy. It's important to note that when interacting
          with Veerge-powered applications, the property development company serves as the data
          controller, while we act as a processor on their behalf. We are committed to assisting
          property development companies in fulfilling their legal obligations by providing the
          necessary tools and addressing their inquiries.`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default PrivacyPolicyMainContent;
