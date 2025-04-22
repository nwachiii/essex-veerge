import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import check from '../../images/check-circle.svg';

const Strategy = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
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
            Strategy
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
            &apos;<b>Buy to flip</b>&apos; and &apos;<b>buy to hold</b>&apos; are two distinct investment strategies within the realm of real estate, including fractional real estate ownership:
          </Text>
          <Text>
            <Text pb={2} fontWeight={600}>Buy to Flip</Text>
            Objective: The primary aim of the buy-to-flip strategy is to acquire a property with the
            intent of promptly renovating or enhancing it and then selling it at a higher price,
            ideally yielding a profit within a relatively short timeframe. In some instances, it
            could be for fractional owners to target off-plan development projects that are
            undervalued at their launch but are anticipated to appreciate significantly or reach
            market value upon completion. Their goal is to acquire shares of these projects during
            the early stages, hold them through the construction phase, and then rapidly sell to
            individuals or investors seeking ownership in a finished unit within the development.
          </Text>
          <Text>
            Timeframe: Investors adopting this strategy typically have a relatively short investment
            horizon, often spanning just a few months.
          </Text>
          <Text>
            Risks: This strategy can carry increased risks due to its reliance on precise market
            timing, renovation costs, and the need to locate a buyer willing to pay a higher price.
            If the property doesn&apos;t sell swiftly or renovation expenses exceed expectations, profits
            may be diminished or even turn into losses.
          </Text>
          <Text>
            <Text pb={2} fontWeight={600}>Buy to Hold</Text>
            Objective: Buy-to-hold investors procure properties with the intention of retaining
            ownership for an extended period, often spanning years or even decades. Their primary
            goals are to generate rental income and potentially benefit from long-term property
            appreciation.
          </Text>
          <Text>
            Timeframe: Investors employing this strategy possess a longer investment horizon and are
            less perturbed by short-term market fluctuations.
          </Text>
          <Text>
            Risks: Although buy-to-hold strategies are generally viewed as less risky than flipping,
            they still entail potential risks, including property maintenance costs, market
            volatility, and the possibility of vacancies. Fractional real estate ownership allows
            multiple investors to pool their resources and collaboratively invest in real estate
            properties.
          </Text>
          <Text>
            Whether one chooses the buy-to-flip or buy-to-hold strategy, fractional ownership
            confers key advantages, including reduced individual financial commitment,
            diversification, and access to real estate investments that may otherwise be beyond
            individual investors&apos; reach.
          </Text>
          <Text>
            Investors should meticulously assess their financial objectives, risk tolerance, and
            investment timeline when deciding between these two strategies.
          </Text>
          <Text>
            Additionally, enlisting the expertise of seasoned professionals, such as real estate
            agents and financial advisors, can provide invaluable guidance in executing these
            strategies effectively.
          </Text>
        </VStack>
      </DrawerContent>
    </Drawer >
  );
};

export default Strategy;
