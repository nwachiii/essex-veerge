import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import check from '../../images/check-circle.svg';

const DealStructure = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        {/* <DrawerBody> */}
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            alt=""
            h="36px"
            w="36px"
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Deal Structure
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="20px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            {` In fractional ownership, various terms related to deal structure, equity, debt, debt +
            equity, and mezzanine play important roles in shaping the financial arrangement and
            ownership dynamics. Here's an explanation of each of these terms:`}
          </Text>
          <Text>
            <b>1. Deal Structure:</b>
            <UnorderedList>
              <ListItem>
                Deal structure refers to the specific arrangement and terms governing the investment
                in a property or project. It outlines how ownership, financing, and profits are
                distributed among the participants or investors.
              </ListItem>
              <ListItem>
                Components: A deal structure may include details about the type and percentage of
                ownership, the allocation of profits and losses, voting rights, exit strategies, and
                the combination of equity and debt financing, among other elements.
              </ListItem>
              <ListItem>
                Purpose: Establishing a clear deal structure is crucial to ensure that all parties
                involved in fractional ownership understand their roles, responsibilities, and the
                financial implications of the investment.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>2. Equity:</b>
            <UnorderedList>
              <ListItem>
                {`Equity represents ownership in a property or project. When an investor holds equity
                in a fractional ownership arrangement, they have a share of ownership that may
                entitle them to a portion of the profits, a say in decision-making, and potential
                appreciation in the property's value.`}
              </ListItem>
              <ListItem>
                Equity Financing: Investors who contribute equity typically invest their capital in
                exchange for ownership shares. They are considered equity investors.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>3. Debt:</b>
            <UnorderedList>
              <ListItem>
                Debt involves borrowing money to finance a property or project. Investors who
                provide debt capital are essentially lending money to the project and expect
                repayment with interest.
              </ListItem>
              <ListItem>
                Debt Financing: Debt financing can take the form of loans, bonds, or other debt
                instruments. It is a form of financing that comes with an obligation to repay the
                borrowed funds over a specified period.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>4. Debt + Equity:</b>
            <UnorderedList>
              <ListItem>
                Debt + equity, also known as a hybrid financing structure, combines both debt and
                equity capital in a fractional ownership arrangement. In this structure, investors
                use a combination of their own capital (equity) and borrowed funds (debt) to finance
                the project.
              </ListItem>
              <ListItem>
                Benefits: This approach allows investors to leverage their capital by borrowing
                money, potentially increasing their investment capacity and overall returns.
                However, it also comes with the risk of debt repayment and interest costs.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>5. Mezzanine:</b>
            <UnorderedList>
              <ListItem>
                Mezzanine is a type of capital that sits between debt and equity. It is often used
                in real estate to bridge the gap between the equity provided by investors and the
                senior debt (traditional mortgage) on a property.
              </ListItem>
              <ListItem>
                Characteristics: Mezzanine financing can be structured as subordinated debt,
                preferred equity, or a combination of both. It typically carries a higher interest
                rate or a share of profits in exchange for the increased risk it represents.
              </ListItem>
              <ListItem>
                Risk and Reward: Mezzanine investors have a higher risk tolerance and, in return,
                seek potentially higher returns compared to traditional debt or equity investors.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            {` In fractional ownership, investors and developers can use various combinations of these
            financial structures to tailor the investment to their specific goals and risk profiles.
            The choice of deal structure, equity, debt, or mezzanine financing depends on factors
            such as the project's financial needs, the risk tolerance of participants, and the
            overall investment strategy. It's important for all parties involved to carefully
            negotiate and document the terms of the fractional ownership arrangement to ensure
            transparency and alignment of interests.`}
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default DealStructure;
