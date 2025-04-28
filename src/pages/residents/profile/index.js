import {LayoutView} from '../../../components/PageLayout/LayoutView';
import {HStack, Box} from '@chakra-ui/react';

import {useSmallerLaptopsBreakpoint} from 'ui-lib/ui-lib.hooks';
import ProfileBar from '@/components/resident/profileBar';
import DetailsBar from '@/components/resident/detailsBar';

export const SingleCustomerPage = ({userId}) => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint();

  return (
    <Box w="full" minH="100vh" bg="#FAFAFA" h={isSmallerLaptop ? '60vh' : ''}>
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="users"
      >
        <HStack
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
          // mt="18px"
          spacing={'41.5px'}
          align={'flex-start'}
        >
          <ProfileBar />
          <DetailsBar />
        </HStack>

        <NotesDrawer modalDisclosure={modalDisclosure} />
      </LayoutView>
    </Box>
  );
};

export default SingleCustomerPage;

export async function getServerSideProps(context) {
  const {query} = context;
  const userId = query.userId;

  return {
    props: {
      userId,
    },
  };
}
