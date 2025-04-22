import React from 'react';
import {VStack, Text, Flex, Image, HStack, Box} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import StoreBackground from '/src/images/devPortal_onboardImgBG.jpg';
import {MdPerson, MdFacebook} from 'react-icons/md';
import {BsLinkedin, BsInstagram} from 'react-icons/bs';
import {FaTwitter} from 'react-icons/fa';

const PreviewStore = ({headerText, storeImage, storeDetails}) => {
  const address =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedinUser')) &&
    JSON.parse(localStorage.getItem('loggedinUser')).company_address;
  return (
    <VStack
      bg={themeStyles.color.matador__white}
      border={'0.5px solid #333333'}
      alignItems={'strech'}
      w={'100%'}
      borderRadius={'5px'}
    >
      <HeaderBox />

      <div>
        <Image
          src={storeImage || storeDetails?.header_image || StoreBackground.src}
          w={'100%'}
          opacity={'0.8'}
          alt={'Image'}
        />
        {/* <Box position={'absolute'} top={'40%'} px={'100px'}>
					<Text fontSize={'50px'} fontWeight={'400'} color={'#000000'} maxW={'537px'}>
						{headerText || storeDetails?.header_text || 'Header Text'}
					</Text>
					<Button variant={'secondary'} bg='#FFF' mt={'40px'} h={'44px'}>
						<Text fontSize={'22px'} fontWeight={'400'}>
							Explore
						</Text>
					</Button>
				</Box> */}
      </div>

      <Footer address={address} />
    </VStack>
  );
};

const HeaderBox = () => {
  const companyLogo =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('loggedinUser')) &&
    JSON.parse(localStorage.getItem('loggedinUser')).company_image;
  return (
    <Flex justify="space-between" w="full" h={'75px'} px={'41px'}>
      {companyLogo ? (
        <Image
          h="60px"
          alignSelf={'center'}
          border="2px solid lightgray"
          borderRadius={'xl'}
          w="80px"
          src={companyLogo}
          alt="development_company_logo"
        />
      ) : null}
      <HStack justify={'end'} cursor={'pointer'}>
        <MdPerson height={'24px'} width={'24px'} color={themeStyles.color.matador__greySec} />
        <Text {...themeStyles.textStyles.sl6} color={themeStyles.color.matador__greySec}>
          Login
        </Text>
      </HStack>
    </Flex>
  );
};
const Footer = ({address}) => {
  return (
    <HStack px={'20px'} py={'37px'} gap={'100px'} justify={'end'}>
      <VStack gap={'10px'} alignItems={'start'} h={'100%'}>
        <Text {...themeStyles.textStyles.sl5}> Follow us :</Text>
        <HStack gap={'34px'}>
          <MdFacebook height={'24px'} width={'24px'} />
          <FaTwitter height={'24px'} width={'24px'} />
          <BsInstagram height={'24px'} width={'24px'} />
          <BsLinkedin height={'24px'} width={'24px'} />
        </HStack>
      </VStack>
      <VStack gap={'10px'} alignItems={'start'} h={'100%'} minW={'350px'} maxW={'max-content'}>
        <Text {...themeStyles.textStyles.sl5}> Office Address :</Text>
        <Text {...themeStyles.textStyles.r5} color={themeStyles.color.matador__greySec}>
          {address}
        </Text>
      </VStack>
    </HStack>
  );
};

export default PreviewStore;
