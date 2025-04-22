import React, {useEffect, useState} from 'react';
import {
  DrawerBody,
  Button,
  Heading,
  Image,
  DrawerCloseButton,
  HStack,
  Stack,
  Text,
  VStack,
  DrawerFooter,
  Spinner,
} from '@chakra-ui/react';
import backArrowIcon from '/src/images/icons/backArrowForDrawer.svg';

export const TermsOfService = ({
  customScrollbarStyles,
  handleScreen,
  manageAppPatchHandler,
  patchParam,
  mutation,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !mutation.isLoading ? setIsLoading(false) : null;
  }, [mutation.isLoading]);

  useEffect(() => {
    const element = document.getElementById('betanine'); // Replace with the actual ID of your element

    // Scroll the element into view
    element.scrollIntoView();
  }, []);
  return (
    <>
      <HStack
        boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
        py="12px"
        bg="#F5F5F5"
        px="29px"
        justify="space-between"
        align="center"
        position="relative"
      >
        <HStack spacing="8px">
          <Image
            src={backArrowIcon.src}
            onClick={handleScreen('manageApp')}
            alt="back Arrow"
            cursor="pointer"
          />

          <Text fontSize="14px" fontWeight={600} color="#191919">
            Terms of service
          </Text>
        </HStack>
        <VStack
          position="relative"
          justify="center"
          align="center"
          w="30px"
          h="30px"
          borderRadius="5px"
          transition="0.3s ease-in-out"
          _hover={{
            width: '30px',
            height: '30px',
          }}
        >
          <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
        </VStack>
      </HStack>

      <DrawerBody sx={customScrollbarStyles} m="0px" pl="31px" pr="8px" mr="8px" py="14px">
        <Stack spacing="none">
          <Stack>
            <Text color="#3D3D3D" fontSize="14px" fontWeight="400">
              Welcome to Veerge! By signing up for a Veerge Account (as defined in Section 1) or
              using any Veerge Services (as defined below), you are agreeing to be bound by the
              following terms and conditions (the <b>{`"Terms of Service"`}</b>).
              <br />
              <br />
              {`As used in these Terms of Service, "`}
              <b>we</b>
              {`," "`}
              <b>us</b>
              {`," "`}
              <b>our</b>
              {`" and "Veerge" refer to the applicable Veerge Contracting Party (Myxellia Inc.), and "`}
              <b>{`you`}</b>
              {`" refers to the Veerge User (if registering for or using a Veerge
                  Service as an individual) or the business employing the Veerge User (if
                  registering for or using a Veerge Service as a business) and any of its
                  affiliates.`}
              <br />
              <br />
              {`Veerge provides seamlessly integrated apps and services that enable
                  property developers to unify their business activities. Our platform includes a
                  range of tools for property developers to build and customize web applications,
                  manage offerings, inventory, payments, fulfillment, business operations, and
                  engage with existing and potential customers. Any service or services offered by
                  Veerge are collectively referred to in these Terms of Service as the "Services."
                  Any new features or tools added to the current Services will also be subject to
                  the Terms of Service. You can review the current version of the Terms of Service
                  at any time by visiting`}
              <Text
                as="span"
                color="#000000"
                textDecoration="underline"
                cursor="pointer"
                onClick={() => window.open('https://www.veerge.com/legal/terms', '_blank')}
              >{` https://www.veerge.com/legal/terms`}</Text>
              . <br />
              <br /> Before you can sign up for a Veerge Account or use any Veerge Service, you must
              read, agree with, and accept all of the terms and conditions contained or expressly
              referenced in these Terms of Service, including the Privacy Policy.
              <br />
              <br />
            </Text>{' '}
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              1. Account Terms
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {` To access and use the Services, you must register for a Veerge account
                      ("Account"). To complete your Account registration, you must provide us with
                      your full legal name, business address, phone number, a valid email address,
                      and any other information indicated as required. Veerge reserves the right to
                      reject your application for an Account or cancel an existing Account, at our
                      sole discretion, for any reason.`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You must be at least 18 years old, or the age of majority in your jurisdiction of
                  residence, whichever is older, to open an Account and use the Services.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  By using the Services provided by Veerge, you confirm that you are using them for
                  business purposes and not for personal, household, or family use.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  4.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You acknowledge that Veerge will primarily communicate with you through the email
                  address you provide during Account registration or update. You must regularly
                  check the email address you provided and ensure that it is capable of sending and
                  receiving messages. Your email communications with Veerge can only be
                  authenticated if they originate from your provided email address.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  5.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You are solely responsible for maintaining the security of your Account and
                  password. Veerge will not be liable for any loss or damage resulting from your
                  failure to safeguard your Account and password. We may request additional security
                  measures at any time and reserve the right to adjust these requirements at our
                  discretion.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  6.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Technical support for the Services is exclusively provided to Veerge Users. For
                  any questions regarding the Terms of Service, please contact Veerge Support.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  7.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion
                  of the Service, the use of the Services, or access to the Services without the
                  express written permission of Veerge.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  8.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree not to bypass, work around, or circumvent any technical limitations of
                  the Services, use any tool to enable disabled features or functionalities in the
                  Services, or engage in the decompiling, disassembling, or reverse engineering of
                  the Services.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  9.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree not to access the Services or monitor any material or information from
                  the Services using any robot, spider, scraper, or other automated means.
                </Text>
              </HStack>
              <HStack align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  10.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`You understand that your Materials may be transferred unencrypted and may
                      involve (a) transmissions over various networks, and (b) changes to conform
                      and adapt to technical requirements of connecting networks or devices.
                      "Materials" refer to your trademarks, copyrighted content, any products or
                      services you offer through the Services (including descriptions and prices),
                      and any photos, images, videos, graphics, written content, or other data
                      provided or made available by you or your affiliates to Veerge or its
                      affiliates.`}
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              2.1 Veerge Owner
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`The person who signs up for the Service by opening an Account will be the
                      contracting party ("Veerge Owner") for the purposes of our Terms of Service
                      and will be authorized to use any corresponding Account provided by Veerge in
                      connection with the Service, subject to Section 2.1.2.`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  If you are signing up for the Services on behalf of your employer, your employer
                  will be the Veerge Owner. In such cases, you must use your employer-issued email
                  address and represent and warrant that you have the authority to bind your
                  employer to our Terms of Service.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {` Your Veerge account can only be associated with one Veerge Owner. You agree to
                      use Veerge Checkout for your web application. "Web Application" refers to the
                      online application or any Veergefront built on top of the Veergefront API.`}
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              2.2 Staff Accounts
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {` Depending on your Veerge pricing plan, you can create one or more staff
                      accounts ("Staff Accounts") to grant access to other individuals to your
                      Account. Each Staff Account must include a full legal name and a valid email
                      address. Through Staff Accounts, the Veerge Owner can set permissions and
                      control the level of access that Staff Accounts have to specific business
                      information (e.g., you can limit Staff Account access to sales information).`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {` The Veerge Owner is responsible for: (a) ensuring that their employees,
                      agents, and subcontractors, including those using Staff Accounts, comply with
                      these Terms of Service, and (b) any breach of these Terms of Service by the
                      Veerge Owner's employees, agents, or subcontractors. The Veerge Owner
                      acknowledges and agrees that they will be responsible for the performance of
                      all obligations under the Agreement, regardless of whether they sublicense or
                      subcontract any such obligations to third parties, including affiliates or
                      subsidiaries of the Veerge Owner.`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`The Veerge Owner and the users under Staff Accounts are collectively referred
                      to as "Veerge Users."`}
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              2.3 Domain Names
            </Text>
            <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
              When you purchase a domain name through Veerge, domain registration will be set to
              automatically renew each year as long as your Veerge Account remains active. You
              acknowledge that it is your sole responsibility to deactivate the auto-renewal
              function if you choose to do so.
              <br />
              <br />
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              3. Veerge Rights
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  The Services offer a range of features and functionalities. However, not all
                  Services or features will be available to all Property development companies at
                  all times, and we are under no obligation to make any Services or features
                  available in any jurisdiction. We reserve the right to modify the Services or any
                  part thereof for any reason, without prior notice and at any time.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Veerge does not pre-screen Materials, but we retain the sole discretion to refuse
                  or remove any Materials from any part of the Services. This includes situations
                  where we determine, at our sole discretion, that your offerings through the
                  Services or the Materials uploaded or posted to the Services violate these Terms
                  of Service.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Verbal or written abuse of any kind, including threats of abuse or retribution,
                  directed towards any Veerge employee, member, or officer will result in immediate
                  termination of your Account.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  4.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  We reserve the right to provide our Services to your competitors and make no
                  promise of exclusivity.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  5.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  In the event of a dispute regarding Account ownership, we reserve the right to
                  request documentation to determine or confirm Account ownership. Such
                  documentation may include, but is not limited to, a scanned copy of your business
                  license, government-issued photo ID, or confirmation of your employment status
                  with an entity.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  6.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Veerge reserves the right, in our sole discretion, to determine rightful Account
                  ownership and transfer an Account to the rightful Veerge Owner. If we are unable
                  to reasonably determine the rightful Veerge Owner, without prejudice to our other
                  rights and remedies, Veerge reserves the right to temporarily suspend or disable
                  an Account until the resolution has been determined between the disputing parties.
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              4. Your Responsibilities
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You acknowledge and agree to provide public-facing contact information, a refund
                  policy, and fulfilment timelines on your Web application.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Your Responsibilities You acknowledge and agree to provide public-facing contact
                  information, a refund policy, and fulfilment timelines on your Web application.
                  You acknowledge and agree that any contract of sale made through the Services is
                  directly between you and the customer. You are the seller of record for all
                  properties you sell through the Services. You are responsible for the creation and
                  operation of your Web application, your Materials, properties that you sell
                  through the Services, and all aspects of the transactions between you and your
                  customer(s). This includes, but is not limited to, authorising the charge to the
                  customer for their purchase, processing refunds, fulfilling any sales or customer
                  service obligations, handling fraudulent transactions, providing required legal
                  disclosures, ensuring regulatory compliance, addressing alleged or actual
                  violations of applicable laws (including consumer protection laws in any
                  jurisdiction where you offer your services), and complying with these Terms of
                  Service. You represent and warrant that your Web application, your Materials, and
                  the services you offer through the Services will be true, accurate, and complete,
                  and will not violate any applicable laws, regulations, or rights of third parties.
                  For the avoidance of doubt, Veerge will not be the seller of record and will have
                  no responsibility for your Web application or properties sold to customers through
                  the Services.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You are solely responsible for the properties that you sell through the Services,
                  including their descriptions, prices, fees, taxes you calculate, any defects,
                  required legal disclosures, regulatory compliance, offers, or promotional content.
                  You must ensure compliance with all applicable laws and regulations.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  4.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`You may not use the Veerge Services for any illegal or unauthorised purpose,
                      and you must not violate any laws in your jurisdiction (including copyright
                      laws) or the laws applicable to you in your customers' jurisdictions. You
                      agree to comply with all applicable laws, rules, and regulations, including
                      obtaining and complying with any necessary licenses or permits required to
                      operate your Web application. You are responsible for your use of the Service
                      and for performing your obligations under these Terms of Service.`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  5.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`You agree to use Veerge Checkout for any sales associated with your Web
                      application. "Veerge Checkout" refers to Veerge's checkout experience that
                      allows customers to enter their payment details.`}
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              5. Payment of Fees and Taxes
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {`We bill subscription fees and charge on a monthly basis. However, we may bill
                      you more frequently if we suspect fraudulent activity or a risk of
                      non-payment. You are responsible for paying the applicable fees and charges
                      for using the Services as described on the Veerge Site. Payments must be made
                      using one of the payment methods supported by Veerge. You agree to pay all
                      amounts without setoff, counterclaim, deduction, or withholding. Fees and
                      charges for new Services or features will be effective when we post updated
                      fees and charges on the Veerge Site, unless otherwise stated in a notice. We
                      may increase or add new fees and charges for any existing Services you are
                      using by providing at least 30 days' prior notice. Late payments may be
                      subject to interest at a rate of 1.5% per month (or the highest rate permitted
                      by law, if lower).`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Your users will be responsible for paying the applicable fees related to sales
                  made through your Web Application when using Veerge Checkout.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Veerge will charge the applicable fees from your Veerge wallet or any valid
                  payment method. The charges will continue until the Services are terminated, and
                  all outstanding fees have been paid in full. Unless otherwise specified, all fees
                  and charges are in U.S. dollars.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  4.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  If we are unable to process payment of fees using an Authorized Payment Method or
                  your Veerge wallet, we may make subsequent attempts to process payment using any
                  Authorized Payment Method. If payment is not successfully processed within 28 days
                  of our initial attempt, we may suspend and revoke access to your Account and the
                  Services. Your Account will be reactivated upon payment of any outstanding fees.
                  During any period of suspension, you may not be able to access your Account or
                  your Web Application. If outstanding fees remain unpaid for 60 days following the
                  suspension date, Veerge reserves the right to terminate your Account in accordance
                  with Section 14.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  5.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  {` You are responsible for all applicable taxes arising from your subscription to
                      or purchase of Veerge's products and services. If Veerge charges these taxes,
                      they will be calculated based on the tax rates applicable to the billing
                      address you provide. If you are exempt from such taxes, you must provide us
                      with evidence of your exemption, which may include an original certificate
                      satisfying legal requirements for tax-exempt status. Tax exemption will apply
                      only after we receive satisfactory evidence of your exemption. If Veerge does
                      not charge taxes, you are responsible for determining if taxes are payable
                      and, if so, self-remitting them to the appropriate tax authorities in your
                      jurisdiction.`}
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  6.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  All sums payable by you to Veerge under these Terms of Service will be paid
                  without any deductions or withholdings, except for taxes charged by Veerge and
                  remitted to the appropriate tax authorities on your behalf. Any deductions or
                  withholdings required by law will be your responsibility and must be paid
                  separately to the relevant taxation authority. Veerge will charge the full amount
                  of fees specified under these Terms of Service to your Authorized Payment Method,
                  disregarding any required deductions or withholdings.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  7.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You are solely responsible for determining, collecting, withholding, reporting,
                  and remitting any applicable taxes, duties, fees, surcharges, and additional
                  charges arising from sales made on your Web Application or your use of the
                  Services. Any contract of sale made through the Services is directly between you
                  and the customer.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  8.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You must maintain an accurate location in the administrative console of your
                  Veerge Store. If you change jurisdictions, you must promptly update your location
                  in the administrative console.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  9.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Veerge does not provide refunds.
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              6. Confidentiality
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  “Confidential Information” will include, but will not be limited to, any and all
                  information associated with a party’s business and not publicly known, including
                  specific business information, technical processes and formulas, software,
                  customer lists, prospective customer lists, names, addresses and other information
                  regarding customers and prospective customers, designs, sales, costs (including
                  any relevant processing fees), price lists, and other unpublished financial
                  information, business plans and marketing data, and any other confidential and
                  proprietary information, whether or not marked as confidential or proprietary.
                  Veerge’s Confidential Information includes all information that you receive
                  relating to us, or to the Services, that is not known to the general public
                  including information related to our security program and practices.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  Each party agrees to use the other party’s Confidential Information solely as
                  necessary for performing its obligations under these Terms of Service and in
                  accordance with any other obligations in these Terms of Service including this
                  Section 6. Each party agrees that it will take all reasonable steps, at least
                  substantially equivalent to the steps it takes to protect its own proprietary
                  information, to prevent the duplication, disclosure or use of any such
                  Confidential Information, other than (i) by or to its employees, agents and
                  subcontractors who must have access to such Confidential Information to perform
                  such party’s obligations hereunder, who each will treat such Confidential
                  Information as provided herein, and who are each subject to obligations of
                  confidentiality to such party that are at least as stringent as those contained
                  herein; or (ii) as required by any law, regulation, or order of any court of
                  proper jurisdiction over the parties and the subject matter contained in these
                  Terms of Service, provided that, if legally permitted, the receiving party will
                  give the disclosing party prompt written notice and use commercially reasonable
                  efforts to ensure that such disclosure is accorded confidential treatment.
                  Confidential Information will not include any information that the receiving party
                  can prove: (A) was already in the public domain, or was already known by or in the
                  possession of the receiving party, at the time of disclosure of such information;
                  (B) is independently developed by the receiving party without use of or reference
                  to the other party’s Confidential Information, and without breaching any
                  provisions of these Terms of Service; or (C) is thereafter rightly obtained by the
                  receiving party from a source other than the disclosing party without breaching
                  any provision of these Terms of Service.
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              7. Limitation of Liability and Indemnification
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              You expressly understand and agree that, to the extent permitted by applicable laws,
              Veerge will not be liable for any direct, indirect, incidental, special, consequential
              or exemplary damages, including but not limited to, damages for loss of profits,
              goodwill, use, data or other intangible losses arising out of or relating to the use
              of or inability to use the Service or these Terms of Service (however arising,
              including negligence).
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              You agree to indemnify and hold us and (as applicable) our parent, subsidiaries,
              affiliates, Veerge partners, officers, directors, agents, employees, and suppliers
              harmless from any claim or demand, including reasonable attorneys’ fees, made by any
              third party due to or arising out of (a) your breach of these Terms of Service or the
              documents it incorporates by reference; (b) or your violation of any law or the rights
              of a third party; or (c) any aspect of the transaction between you and your Customer,
              including but not limited to refunds, fraudulent transactions, alleged or actual
              violation of applicable laws (including but not limited to Federal and State consumer
              protection laws), or your breach of the Terms of Service.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              You will be responsible for any breach of the Terms of Service by your affiliates,
              agents or subcontractors and will be liable as if it were your own breach.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              Your use of the Services is at your sole risk. The Services are provided on an “as is”
              and “as available” basis without any warranty or condition, express, implied or
              statutory.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              Veerge does not warrant that the Services will be uninterrupted, timely, secure, or
              error-free.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              Veerge does not warrant that the results that may be obtained from the use of the
              Services will be accurate or reliable.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              Veerge is not responsible for any of your tax obligations or liabilities related to
              the use of Veerge’s Services.
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
              Veerge does not warrant that the quality of any products, services, information, or
              other materials purchased or obtained by you through the Services will meet your
              expectations, or that any errors in the Services will be corrected.
              <br />
              <br />
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              8. Intellectual Property and Your Materials
            </Text>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              8.1. Your Materials
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  We do not claim ownership of the Materials you provide to Veerge; however, we do
                  require a license to those Materials. You grant Veerge a non-exclusive,
                  transferable, sub-licensable, royalty-free, worldwide right and license to host,
                  use, distribute, expose, modify, run, copy, store, publicly perform, communicate
                  to the public (including by telecommunication), broadcast, reproduce, make
                  available, display, and translate, and create derivative works of any Materials
                  provided by you in connection with the Services. We may use our rights under this
                  license to operate, provide, and promote the Services and to perform our
                  obligations and exercise our rights under the Terms of Service. You represent,
                  warrant, and agree that you have all necessary rights in the Materials to grant
                  this license. You irrevocably waive any and all moral rights you may have in the
                  Materials in favour of Veerge and agree that this waiver may be invoked by anyone
                  who obtains rights in the materials through Veerge, including anyone to whom
                  Veerge may transfer or grant (including by way of license or sublicense) any
                  rights in the Materials.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  If you owned the Materials before providing them to Veerge then, despite uploading
                  them to your Web application they remain yours, subject to any rights or licenses
                  granted in the Terms of Service or elsewhere. You can remove your Web application
                  at any time by deleting your Account. Removing your Web application does not
                  terminate any rights or licenses granted to the Materials that Veerge requires to
                  exercise any rights or perform any obligations that arose during the Term.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree that Veerge can, at any time, review and delete any or all of the
                  Materials submitted to the Services, although Veerge is not obligated to do so.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  4.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You grant Veerge a non-exclusive, transferable, sub-licensable, royalty-free,
                  worldwide right and license to use the names, trademarks, service marks and logos
                  associated with your Store (“Your Trademarks”) to operate, provide, and promote
                  the Services and to perform our obligations and exercise our rights under the
                  Terms of Service. This license will survive any termination of the Terms of
                  Service solely to the extent that Veerge requires the license to exercise any
                  rights or perform any obligations that arose during the Term.
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
              8.2. Veerge Intellectual Property
            </Text>
            <ol>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  1.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree that you may not use any trademarks, logos, or service marks of Veerge,
                  whether registered or unregistered, unless you are authorized to do so by Veerge
                  in writing. You agree not to use or adopt any marks that may be considered
                  confusing with the Veerge Trademarks. You agree that any variations or
                  misspellings of the Veerge Trademarks would be considered confusing with the
                  Veerge Trademarks.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  2.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You agree not to purchase, register, or use search engine or other pay-per-click
                  keywords (such as Google Ads), trademarks, email addresses, social media names, or
                  domain names (including without limitation top-level domains, sub-domains, and
                  page URLs) that use or include Veerge or Veerge Trademarks or that use or include
                  any terms that may be confusing with the Veerge Trademarks.
                </Text>
              </HStack>
              <HStack ml="4px" align="start" spacing="2px">
                <Text as="span" fontSize="14px" fontWeight="400" color="#3D3D3D">
                  3.
                </Text>

                <Text as="li" fontSize="14px" color="#3D3D3D" fontWeight="400">
                  You acknowledge and agree that the Terms of Service do not give you any right to
                  implement Veerge patents.
                  <br />
                  <br />
                </Text>
              </HStack>
            </ol>
            <Stack id="betanine" p="0" pt="2px" m="0" bg="#DDFFC2">
              <Text fontSize="14px" color="#3D3D3D" fontWeight="700">
                9. Beta Services
              </Text>
              <Text fontSize="14px" color="#3D3D3D" fontWeight="400">
                From time to time, Veerge may, in its sole discretion, invite you to use, on a trial
                basis, pre-release or beta features that are in development and not yet available to
                all property development companies (“Beta Services”). Beta Services are not part of
                the Services, and Beta Services may be subject to additional terms and conditions,
                which Veerge will provide to you prior to your use of the Beta Services. Such Beta
                Services and all associated conversations and materials relating thereto will be
                considered Veerge Confidential Information and subject to the confidentiality
                provisions in this agreement. Without limiting the generality of the foregoing, you
                agree that you will not make any public statements or otherwise disclose your
                participation in the Beta Services without Veerge’s prior written consent. Veerge
                makes no representations or warranties that the Beta Services will function. Veerge
                may discontinue the Beta Services at any time in its sole discretion. Veerge will
                have no liability for any harm or damage arising out of or in connection with a Beta
                Service. The Beta Services may not work in the same way as a final version. Veerge
                may change or not release a final or commercial version of a Beta Service in our
                sole discretion.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter p="0px" px="33px" mb="16.3px">
        <HStack spacing="18px" mt="8px" w="full" justify="center">
          <Button
            w={'202px'}
            h="43.65px"
            borderRadius="9.619px"
            _hover={{
              opacity: '0.9',
            }}
            bg="transparent"
            onClick={handleScreen('manageApp')}
            border="solid 1px #FF6A6A"
            color="#FF6A6A"
          >
            Reject
          </Button>
          <Button
            w="223px"
            bg="#191919"
            color="#ffffff"
            h="43.65px"
            mt="0px"
            borderRadius="9.619px"
            isDisabled={isLoading}
            onClick={() => (mutation.mutate({param: patchParam, body: {}}), setIsLoading(true))}
            _hover={{
              opacity: '0.9',
            }}
          >
            {isLoading ? <Spinner color="#fff" /> : 'Accept'}
          </Button>
        </HStack>
      </DrawerFooter>
    </>
  );
};

export default TermsOfService;
