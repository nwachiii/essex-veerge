import {LayoutView} from '@/components/index';
import {Box, Stack} from '@chakra-ui/react';
import WholeUnits from '../WholeUnits';
import {useRouter} from 'next/router';
import BackBtn from 'pages/account/components/BackBtn';

const NewSingleUnitCreation = () => {
  const router = useRouter();
  return (
    <Box minH="100vh" bg="#FAFAFA">
      <LayoutView activePage="listings" />
      <Stack mt="-84vh" maxW="1150px" mx="auto">
        <Box my={2}>
          <BackBtn name="Back" />
        </Box>
        <WholeUnits listingId={router?.query?.listingId} isLand={router?.query?.isLand} />
      </Stack>
    </Box>
  );
};

export default NewSingleUnitCreation;
