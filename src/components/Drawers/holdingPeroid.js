import {
  Drawer,
  DrawerBody,
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
import React from 'react';
import check from '../../images/check-circle.svg';

const HoldingPeriod = ({ drawerModal }) => {
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
            Holding Period
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
            In fractional real estate ownership, the holding period refers to the length of time an
            individual or entity holds their ownership stake or share in a fractional ownership
            property.
          </Text>
          <Text>
            Fractional real estate ownership allows multiple investors to collectively own a portion
            of a property, such as a residential unit, vacation home or a commercial building,
            without owning the entire property outright.
          </Text>
          <Text>
            {`Each investor holds a fraction or share of the property, which is typically represented
            as a percentage.The holding period is important because it can impact the investor's
            financial and legal obligations, as well as their ability to sell or transfer their
            ownership stake.`}
          </Text>
          <Text>
            Here are some key points related to the holding period in fractional real estate
            ownership:
            <OrderedList>
              <ListItem>
                Investment Duration: The holding period can vary depending on the terms and
                agreements set forth by the fractional ownership arrangement. Some fractional
                ownership structures have a predetermined holding period, which means investors
                commit to holding their shares for a specific number of years. This can be designed
                to ensure stability and a sense of shared responsibility among the owners.
              </ListItem>
              <ListItem mt="20px">
                Exit Options: Investors may have different exit options when it comes to selling or
                transferring their ownership stake. The holding period may dictate when an investor
                is allowed to sell or transfer their share. Some agreements may require investors to
                hold their shares for a minimum period before they can exit the investment.
              </ListItem>
              <ListItem mt="20px">
                Restrictions and Rules: The fractional ownership agreement or contract typically
                outlines the rules and restrictions related to the holding period. It may include
                penalties for early exit, conditions for selling shares to other investors within
                the group, and procedures for handling the sale or transfer of shares.
              </ListItem>
              <ListItem mt="20px">
                {`  Liquidity: The holding period can affect the liquidity of an investment. Longer
                holding periods may limit an investor's ability to quickly sell or cash out their
                fractional ownership share, while shorter holding periods may provide more
                flexibility.`}
              </ListItem>
              <ListItem mt="20px">
                {` Legal Considerations: The holding period may also have legal implications,
                especially if there are disputes or disagreements among fractional owners. It's
                important for investors to understand the legal aspects of the holding period as
                outlined in the ownership agreement.`}
              </ListItem>
            </OrderedList>
          </Text>
          <Text>
            {`It's crucial for individuals interested in fractional real estate ownership to
            thoroughly review the terms and conditions of the investment, including the holding
            period, before committing to the arrangement.`}
          </Text>
          <Text>
            Additionally, seeking legal and financial advice can help investors make informed
            decisions about their participation in fractional ownership opportunities.
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default HoldingPeriod;
