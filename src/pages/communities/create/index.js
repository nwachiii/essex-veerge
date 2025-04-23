import React, {Fragment, useEffect, useState} from 'react';
import {Image, extendTheme, Heading, HStack, Progress, Stack, Text, Box} from '@chakra-ui/react';

import Publish from './Publish';
import Amenities from './Amenities';
import {theme} from '../../../theme';
import WholeUnits from './WholeUnits';
import {LayoutView} from '../../../components';
import {ListingDetails} from './ListingDetails';
import ScrollToTop from '../../../utils/scrollToTop';
import backArrow from '../../../images/icons/back-arrow.png';
import {useRouter} from 'next/router';
import {isRoleRestricted} from 'ui-lib/ui-lib.hooks/isRoleRestricted';
import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';

const styles = extendTheme({...theme});

export const CreateListing = ({currentStep}) => {
  let subPages = [];
  const router = useRouter();
  const [step, setStep] = useState(currentStep || 0);
  const [isSFH, setSFH] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();
  const handleProgress = value => {
    setStep(value);
  };
  const lastStep = 3;

  const links = ['Listings Details', Boolean(isSFH) == false && 'Unit Type', 'Amenities'];

  subPages = [
    <ListingDetails
      key={1}
      setSFH={setSFH}
      isSFH={isSFH}
      subPages={subPages}
      propertyType={propertyType}
      handleProgress={handleProgress}
      setPropertyType={setPropertyType}
    />,
    Boolean(isSFH) == false && (
      <WholeUnits key={2} handleProgress={handleProgress} subPages={subPages} />
    ),
    <Amenities key={3} handleProgress={handleProgress} subPages={subPages} />,
    // <Publish key={4} step={step} handleProgress={handleProgress} subPages={subPages} />,
  ];
  const progressValue = ((step + 1) / (subPages.length - (Boolean(isSFH) ? 1 : 0))) * 100;

  // 10 + step * parseInt(124 / subPages.length - 1);
  useEffect(() => {
    isRoleRestricted('create listings').check ? router.back() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ScrollToTop();
  }, [step, propertyType]);

  //TEMPORARILY COMMENTING THIS OUT - AHMED SAID THIS IS CAUSING MORE HARM THAN GOOD.
  // useEffect(() => {
  //   const newProjectId =
  //     typeof window !== 'undefined' &&
  //     localStorage &&
  //     JSON.parse(localStorage.getItem('newProjectId'));

  //   const wholeUnitsHaveBeenAdded =
  //     typeof window !== 'undefined' &&
  //     localStorage &&
  //     JSON.parse(localStorage.getItem('WholeUnitsHaveBeenAdded'));

  //   const amenitiesHaveBeenAdded =
  //     typeof window !== 'undefined' &&
  //     localStorage &&
  //     JSON.parse(localStorage.getItem('AmenitiesHaveBeenAdded'));

  //   amenitiesHaveBeenAdded
  //     ? router.push(`/listings/manage/?listingId=${newProjectId}&isCreate=true`)
  //     : wholeUnitsHaveBeenAdded
  //       ? setStep(2)
  //       : newProjectId
  //         ? setStep(1)
  //         : setStep(currentStep || 0);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Fragment>
      {currentStep == lastStep ? (
        <Stack
          mx="auto"
          mb="27px"
          mt={'30px'}
          px="42px"
          h="100px"
          bg="#FFFFFF"
          spacing={1}
          maxW="1284px"
          justify="center"
          borderRadius="16px"
          border={'1px solid #E9E9E9'}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
        >
          <HStack spacing={6} justify="space-between">
            {links.map((link, index) => (
              <Text fontWeight={600} fontSize="18px" color="#191919" lineHeight="23px" key={index}>
                {link}
              </Text>
            ))}
          </HStack>
          <Progress colorScheme="blackAlpha" value={100} {...styles.progressBar} />
        </Stack>
      ) : (
        <Box minH={'100vh'} bg="#FAFAFA" pb="55px" h={isSmallerLaptop ? '60vh' : ''}>
          <LayoutView activePage={'listings'} />
          <Box
            mx="auto"
            zIndex={1000}
            overflow="auto"
            maxW={'1285px'}
            className="main-app"
            mt="clamp(-100vh , -86vh, calc(-100vh + 130px))"
          >
            {propertyType ? (
              <HStack onClick={() => (step > 0 ? setStep(step - 1) : router.back(-1))} py="20px">
                <Image
                  mr={2}
                  height="50px"
                  w="50px"
                  alt="back_arrow"
                  src={backArrow.src}
                  style={{cursor: 'pointer'}}
                />
                <Heading {...styles.textStyles.h3}>{`Create Listing`}</Heading>
              </HStack>
            ) : null}
            {!propertyType ? null : (
              <Stack
                mx="auto"
                mb="47px"
                px="42px"
                h="100px"
                bg="#FFFFFF"
                spacing={1}
                maxW="1284px"
                justify="center"
                borderRadius="16px"
                border={'1px solid #E9E9E9'}
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
              >
                <HStack spacing={6} justify="space-between">
                  {links.map((link, index) => (
                    <Text
                      fontWeight={600}
                      fontSize="18px"
                      color="#191919"
                      lineHeight="23px"
                      key={index}
                    >
                      {link}
                    </Text>
                  ))}
                </HStack>
                <Progress colorScheme="blackAlpha" value={progressValue} {...styles.progressBar} />
              </Stack>
            )}
            <Box w="full" pb={isSmallerLaptop ? '3em' : '1em'}>
              {subPages[step]}
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default CreateListing;
