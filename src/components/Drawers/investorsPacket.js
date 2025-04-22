import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from '@chakra-ui/react';
import check from '../../images/check-circle.svg';

const InvestorsPacket = ({drawerModal}) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose}>
      <DrawerOverlay />
      <DrawerContent marginTop="65px" py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            h="36px"
            w="36px"
            alt=""
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Investor&apos;s Packet
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="15px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            An &quot;investor packet&quot; typically refers to a collection of documents and information that
            is prepared and provided to potential investors or stakeholders in a real estate or
            investment opportunity. This packet is designed to provide potential investors with
            comprehensive information about the investment, project, or property to help them make
            informed decisions. The contents of an investor packet can vary depending on the nature
            of the investment, but it generally includes the following:
          </Text>
          <OrderedList>
            <ListItem>
              Investment Overview: An introductory section that outlines the purpose and goals of
              the investment, including the expected returns and investment timeline.
            </ListItem>
            <ListItem>
              Property or Project Details: Detailed information about the property or project being
              offered for investment. This may include property specifications, location details,
              architectural plans, and project renderings.
            </ListItem>
            <ListItem>
              Financial Projections: Projections of the expected financial performance of the
              investment, including income forecasts, expense estimates, and potential return on
              investment (ROI).
            </ListItem>
            <ListItem>
              Legal Documents: Any legal agreements, contracts, or disclosures related to the
              investment. This may include partnership agreements, subscription agreements, and
              regulatory disclosures.
            </ListItem>
            <ListItem>
              Market Analysis: An analysis of the local real estate market, including current market
              conditions, trends, and competitive analysis.
            </ListItem>
            <ListItem>
              Property Management Plan: Information about how the property or project will be
              managed, including details about property management companies, maintenance plans, and
              tenant leasing strategies.
            </ListItem>
            <ListItem>
              Risks and Mitigations: A section outlining potential risks associated with the
              investment and strategies for mitigating those risks. This may include market risks,
              construction risks, or regulatory risks.
            </ListItem>
            <ListItem>
              Investment Structure: Details about how the investment is structured, including
              information about equity ownership, debt financing, or any other financial
              arrangements.
            </ListItem>
            <ListItem>
              Exit Strategy: Information on how investors can exit the investment, including options
              for selling their ownership stake or receiving returns on their investment.
            </ListItem>
            <ListItem>
              Due Diligence Materials: Supporting documents such as appraisals, inspection reports,
              environmental assessments, and any other due diligence materials that validate the
              investment opportunity.
            </ListItem>
            <ListItem>
              Team Profiles: Profiles of key individuals involved in the investment, such as
              developers, project managers, and property managers, highlighting their experience and
              qualifications.
            </ListItem>
            <ListItem>
              Contact Information: Contact details for the investment team or company responsible
              for the offering, so potential investors can reach out with questions or expressions
              of interest.
            </ListItem>
          </OrderedList>
          <Text>
            Investor packets are typically prepared with the intention of providing potential
            investors with a comprehensive and transparent view of the investment opportunity. They
            are often used in the fundraising process to attract investors and build trust by
            providing a thorough and well-documented overview of the investment. Investors can
            review these packets to assess the viability and attractiveness of the opportunity
            before deciding to invest their capital.
          </Text>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};

export default InvestorsPacket;
