import {Badge, Card, CardBody, CardFooter, Center, Image, Text, VStack} from '@chakra-ui/react';

export const MobileAppBenefits = ({data}) => {
  return (
    <Card
      borderRadius={'24px'}
      border={'1.5px solid #0C2841'}
      background={'linear-gradient(115deg, #061520 5.77%, rgba(6, 21, 32, 0.71) 117.72%)'}
      color={'white'}
      padding={'29px'}
    >
      <CardBody padding={'0px'} flex={'1.5'}>
        <Center padding={'48.58px'}>
          <Center
            width={'182px'}
            height={'182px'}
            borderRadius={'50%'}
            backgroundColor={'#031B2E'}
            border={'10px solid #0C2841'}
          >
            <Image src={data.image_src} alt="Partner Image" />
          </Center>
        </Center>
      </CardBody>
      <CardFooter
        // padding={'14px 16px'}
        flex={'1'}
        padding={'0px'}
        textAlign={'left'}
        pb={'14px'}
      >
        <VStack gap={'16px'} align='flex-start'>
          <Text fontSize={'28px'} fontFamily={'Syne'} fontWeight={'600'}>
            {data.title}
          </Text>
          <Text fontSize={'18px'} color={'#CBCBCB'} textAlign={'justify'}>
            {data.text}
          </Text>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default MobileAppBenefits;
