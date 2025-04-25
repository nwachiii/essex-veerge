import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, {Fragment, useState} from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../theme';
import backArrow from '/src/images/icons/back-arrow.png';
import {LayoutView} from '../../../../components';
import UnitPropertyInformation from './UnitPropertyInformation';
import {
  AnimateImagePresence,
  renderArrow,
} from '../ListingInfo.components/ListingInfo.details/BasicInfo';

import ViewImage from '../ListingInfo.components/ListingInfo.details/ViewImage';
import ReactElasticCarousel from 'react-elastic-carousel';
import UnitInfoReservations from './UnitInfoReservations';
import UnitInfoViolations from './UnitInfoViolations';
import UnitInfoRequests from './UnitInfoRequests';
import UnitInfoDocuments from './UnitInfoDocuments';
import UnitInfoPetVehicles from './UnitInfoPetVehicles';
import UnitMoreOption from '@/components/Drawers/unitMoreOptions';

export const UnitInformation = () => {
  const router = useRouter();
  const [viewId, setViewId] = useState(0);
  const VIEW_IMAGE = useDisclosure();
  const [direction, setDirection] = useState(0);
  const [photoViewSrc, setPhotoViewSrc] = useState(null);
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(photos?.[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const drawerDisclosure = useDisclosure();
  
  const resetCurrentImageIndex = () => {
    setPhotoViewSrc(bigPhotoViewSrc);
  };

  const handleBack = () => {
    router.back(-1);
  };

  return (
    <Box bg="#FAFAFA" minH="100vh" h="fit-content">
      <LayoutView tabPanelStyle={{px: '0px', pb: '0px'}} px="0px" pb="0px" activePage="communities">
        <Box pb={6} w="full" mx="auto" mt="clamp(52px,calc(10.4vh + 40px),82px)">
          <Fragment>
            <HStack
              px={{base: '16px', xl: '78px'}}
              mx="auto"
              w="100%"
              justify="space-between"
              my={4}
            >
              <HStack onClick={handleBack} zIndex={10}>
                <Image
                  cursor="pointer"
                  mr={2}
                  boxSize="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading {...themeStyles.textStyles.h3}>Back</Heading>
              </HStack>
              <Flex justify="space-between" columnGap="18px" zIndex={10} align="center">
                <Button
                  rounded="full"
                  bg="#191919"
                  w="214px"
                  fontSize="16px"
                  fontWeight={400}
                  color="#FFF"
                  p="16px 40px"
                  _hover={{
                    opacity: 1,
                  }}
                  h="54px"
                  onClick={() => router.push('/transactions')}
                >
                  Transactions
                </Button>
                <UnitMoreOption drawerDisclosure={drawerDisclosure} />
              </Flex>
            </HStack>
            <Box w="full" px={{base: '0px', xl: '78px'}}>
              <Container
                {...themeStyles.containerStyles}
                maxW="full"
                mx="auto"
                padding="24px"
                border={'1px solid #E4E4E4'}
                borderBottomRadius={{base: '0px', xl: '16px'}}
                mt="25px"
              >
                <Flex direction={{base: 'column', lg: 'row'}} gap="33px">
                  <Stack w={{base: 'full', lg: '53%'}} minW={{lg: '400px'}}>
                    <Heading
                      display={{lg: 'none', base: 'initial'}}
                      textAlign={'left'}
                      alignSelf="flex-start"
                    >
                      12-B
                    </Heading>
                    <AnimateImagePresence
                      layoutId={viewId}
                      sourceUrl={bigPhotoViewSrc}
                      onClick={VIEW_IMAGE.onOpen}
                      direction={direction}
                      w="full"
                      maxW="full"
                      h="570px"
                      objectFit="cover"
                      cursor={'zoom-in'}
                    />

                    <ReactElasticCarousel
                      itemsToShow={4}
                      pagination={false}
                      renderArrow={renderArrow} // Use the custom renderArrow function
                    >
                      {photos?.map((photo, index) => {
                        return (
                          <Image
                            src={photo}
                            key={index}
                            alt="photo"
                            rounded="12px"
                            w="112.785px"
                            h="108.769px"
                            border={bigPhotoViewSrc === photo ? '1.5px solid #4545FE' : 'none'}
                            cursor="pointer"
                            onClick={() => setBigPhotoViewSrc(photo)}
                          />
                        );
                      })}
                    </ReactElasticCarousel>
                    <ViewImage
                      modal={VIEW_IMAGE}
                      src={photoViewSrc}
                      currentImageIndex={currentImageIndex}
                      photos={photos}
                      setPhotoViewSrc={setPhotoViewSrc}
                      setCurrentImageIndex={setCurrentImageIndex}
                      resetCurrentImageIndex={resetCurrentImageIndex}
                    />
                  </Stack>
                  <UnitPropertyInformation />
                </Flex>
              </Container>
            </Box>
            <Box w="full" px={{base: '16px', xl: '78px'}}>
              <UnitInfoRequests />
              <UnitInfoViolations />
              <UnitInfoReservations />
              <UnitInfoDocuments />
              <UnitInfoPetVehicles />
            </Box>
          </Fragment>
        </Box>
      </LayoutView>
    </Box>
  );
};
export default UnitInformation;

const photos = [
  'https://d1x2tneac0i3nn.cloudfront.net/UnitProfile-Image+(2).jpg',
  'https://d1x2tneac0i3nn.cloudfront.net/UnitProfile-Image+(1).jpg ',
  'https://d1x2tneac0i3nn.cloudfront.net/UnitProfile-Image+(5).jpg ',
  'https://d1x2tneac0i3nn.cloudfront.net/UnitProfile-Image+(4).jpg ',
  'https://d1x2tneac0i3nn.cloudfront.net/UnitProfile-Image+(3).jpg ',
];
