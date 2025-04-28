import {HStack, VStack, Button as ChakraButton} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import ResidentProfileDrawerOptions from '@/components/Drawers/resident/profile';
import Portfolio from './sections/portfolio';
import Request from './sections/request';
import Violation from './sections/violation';
import UpcomingReserve from './sections/upcoming';
import Documents from './sections/documents';
import KYC from './sections/KYC';
import Pets from './sections/pets';
import Board from './sections/board';
import ResidentAdditionalInfo from './sections/residentAdditionalInfo';
import NextOfKin from './sections/nextOfKin';

const Button = ({children, ...rest}) => (
  <ChakraButton _hover={{opacity: 1}} _active={{opacity: 1}} h="55px" {...rest}>
    {children}
  </ChakraButton>
);

const DetailsBar = () => {
  const router = useRouter();

  return (
    <VStack spacing={'28px'} align={'stretch'} w="full">
      <HStack spacing={'35px'} alignSelf={'flex-end'}>
        <Button
          py="16px"
          px="40px"
          bg="#000"
          color="#fff"
          borderRadius="full"
          fontSize="16px"
          fontWeight="500"
          lineHeight="140%"
          letterSpacing="0.16px"
          onClick={() => router.push('/transactions')}
        >
          Transaction
        </Button>
        <ResidentProfileDrawerOptions />
      </HStack>

      <Portfolio />
      <Request />
      <Violation />
      <UpcomingReserve />
      <Documents />
      <KYC />
      <Pets />
      <Board />
      <ResidentAdditionalInfo />
      <NextOfKin />
    </VStack>
  );
};

export default DetailsBar;
