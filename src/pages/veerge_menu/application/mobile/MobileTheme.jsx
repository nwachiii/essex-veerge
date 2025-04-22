import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import play_theme from '/src/images/create-mobile-app/play_theme.svg';

export const MobileTheme = ({data}) => {
  return (
    <Card
      borderRadius={'12px'}
      border={'1px solid #0C2841'}
      background={'#031B2E'}
      color={'white'}
      padding={'0px'}
      position={'relative'}
    >
      <Flex
        position={'absolute'}
        top={'0px'}
        left={'0px'}
        width={'100%'}
        height={'100%'}
        background={'rgba(0, 0, 0, 0.40)'}
        opacity={'0'}
        transition={'.2s'}
        _hover={{opacity: '1'}}
        cursor={'pointer'}
        zIndex={'1'}
      >
        <CardBody display={'flex'} padding={'0px'} flexDirection={'column'}  position={'relative'}>
        <Center flex={'1'} mb={'70px'} >
          <Image  src={play_theme.src}  alt="Theme Image" />
        </Center>
        {data.payment_plan && (
          <Badge
            position={'absolute'}
            bottom={'140px'}
            right={'18px'}
            textTransform={'capitalize'}
            padding={'6px'}
            borderRadius={'8px'}
            background="rgba(243, 244, 246, 0.08)"
            color={'#F3F4F6'}
            fontSize={'10px'}
            fontWeight={'500'}
          >
            Payment Plan Available
          </Badge>
        )}
        </CardBody>
      </Flex>
      <CardBody padding={'0px'}>
          <Image src={data.image_src} alt="Theme Image" />

      </CardBody>
      <CardFooter></CardFooter>
      <CardFooter
        display={'flex'}
        justifyContent={'space-between'}
        padding={'14px 16px'}
        alignItems={'center'}
      >
        <Text fontFamily={'Syne'} fontSize={'24px'} fontWeight={'600'}>
          {data.name}
        </Text>
        <VStack gap={'7px'} justify={'flex-end'} align={'flex-end'}>
          <Text color={'#CBCBCB'} fontSize={'18px'}>
            $
            {Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(data.price || 0)}
          </Text>
          {data.payment_plan && (
            <Badge
              textTransform={'capitalize'}
              padding={'6px'}
              borderRadius={'8px'}
              background="rgba(243, 244, 246, 0.08)"
              color={'#F3F4F6'}
              fontSize={'10px'}
              fontWeight={'500'}
            >
              Payment Plan Available
            </Badge>
          )}
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default MobileTheme;
