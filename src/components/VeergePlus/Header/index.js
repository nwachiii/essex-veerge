import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Show,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {GiHamburgerMenu} from 'react-icons/gi';
import React, {useRef} from 'react';
import Link from 'next/link';
import {VeergePlusLeftSideNav} from '../LeftSideNav';
import VeergePlusSearchbar from '../SearchBar';

export const VeergePlusHeader = ({
  headerText,
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
  scrollToSection,
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
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  return (
    <>
      <Show breakpoint="(min-width: 769px)">
        <Flex
          direction="row"
          justify="space-between"
          m="0 auto"
          w="100%"
          maxW="1500px"
          px="78px"
          height="82px"
          position="fixed"
          zIndex="1"
          bg="#191919"
          align="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        >
          <Box>
            <Link href={token ? '/dashboard' : '/'}>
              <Text
                lineHeight={'49px'}
                fontFamily={'Syne'}
                fontSize={'47px'}
                fontWeight={'700'}
                textAlign={'left'}
                color="#FFFFFF"
              >
                Veerge
              </Text>
            </Link>
            <Text pl={3} mt={-2} color="#FFFFFF" fontSize="12px" fontWeight="400">
              powered by Myxellia
            </Text>
          </Box>
        </Flex>
        <VeergePlusSearchbar headerText={headerText} />
      </Show>
      <Show breakpoint="(max-width: 768px)">
        <Flex
          direction="row"
          justify="space-between"
          maxW="770px"
          w="100%"
          position="fixed"
          zIndex="1"
          m="0 auto"
          px="20px"
          height="72px"
          bg="#191919"
          align="center"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        >
          <Link href={token ? '/dashboard' : '/'}>
            {' '}
            <Text
              lineHeight={'39px'}
              fontFamily={'Syne'}
              fontSize={'27px'}
              fontWeight={'600'}
              textAlign={'left'}
              color="#FFFFFF"
            >
              Veerge
            </Text>
          </Link>
          <GiHamburgerMenu onClick={onOpen} style={{color: '#ffffff'}} />

          <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody>
                <Text
                  color="#000000"
                  fontSize="24px"
                  letterSpaceing="0.13em"
                  lineHeight="30px"
                  mt="50px"
                  textAlign="center"
                >
                  {headerText ?? 'Veerge Plus'}
                </Text>
                <VeergePlusSearchbar headerText={headerText} />
                <VeergePlusLeftSideNav
                  scrollToSection={scrollToSection}
                  termination={termination}
                  veergeRights={veergeRights}
                  accountTerms={accountTerms}
                  accountActivation={accountActivation}
                  yourResponsibilities={yourResponsibilities}
                  feesAndTaxes={feesAndTaxes}
                  confidentiality={confidentiality}
                  limitationOfLiability={limitationOfLiability}
                  intellectualProperty={intellectualProperty}
                  betaServices={betaServices}
                  feedback={feedback}
                  privacyPolicy={privacyPolicy}
                  modifications={modifications}
                  generalConditions={generalConditions}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Show>
    </>
  );
};
export default VeergePlusHeader;
