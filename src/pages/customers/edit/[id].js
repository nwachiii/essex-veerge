import React, {useEffect, useState} from 'react';
import {
  Image,
  extendTheme,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

import Amenities from './Amenities';
import {theme} from '../../../theme';
import {AnimatedLoader, LayoutView} from '../../../components';
import {ListingDetails} from './ListingDetails';
import ScrollToTop from '../../../utils/scrollToTop';
import backArrow from '/src/images/icons/back-arrow.png';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {fetchListings} from '../../../apis/listings';

const styles = extendTheme({...theme});

export default function EditListing() {
  let subPages = [];
  const toast = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const {data, isError, isLoading} = useQuery(['listings', ''], () => fetchListings(''));
  const {id} = router?.query;

  useEffect(() => {
    ScrollToTop();
  }, [step]);

  const listingDetailArr = data && data.data.project.filter(list => list?.id == id);
  const listingDetail = listingDetailArr ? listingDetailArr[0] : {};
  const handleProgress = value => {
    setStep(value);
  };
  subPages = [
    <ListingDetails
      key={1}
      defaultData={listingDetail}
      handleProgress={handleProgress}
      subPages={subPages}
    />,
    <Amenities
      key={2}
      defaultData={listingDetail}
      handleProgress={handleProgress}
      subPages={subPages}
    />,
  ];
  const progressValue = 10 + step * parseInt(190 / subPages.length - 1);

  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    return toast({
      title: 'Request failed',
      description: `An error occured while fetching`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <LayoutView activePage={'listings'}>
      <HStack onClick={() => (step > 0 ? setStep(step - 1) : router.back(-1))} py="20px" mt="8vh">
        <Image
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          w="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading {...styles.textStyles.h3}>Edit Listing</Heading>
      </HStack>
      <Stack
        pb=".5em"
        mx="auto"
        mb="47px"
        px="42px"
        h="100px"
        bg="#FFFFFF"
        spacing={15}
        maxW="1284px"
        justify="center"
        borderRadius="16px"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
      >
        <HStack spacing={6} justify="space-between">
          {links.map((link, index) => (
            <Text fontWeight={600} fontSize="18px" color="#191919" lineHeight="23px" key={index}>
              {link}
            </Text>
          ))}
        </HStack>
        <Progress colorScheme="green" value={progressValue} {...styles.progressBar} />
      </Stack>

      {subPages[step]}
    </LayoutView>
  );
}

const links = ['Listings Details', 'Amenities'];
