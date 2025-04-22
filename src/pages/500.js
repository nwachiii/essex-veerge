import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AnimatedLoader } from '../components/common/loaders';
import { LayoutView } from '../components/PageLayout/LayoutView';
import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();
  useEffect(() => {
    router.back(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{color: '#FAFAFA', minHeight: '100vh'}}>
      <LayoutView hideProgressBarLoader initial_status="true" isActive="" isPending="true">
        <Center bg="#FAFAFA" w="100vw">
          <AnimatedLoader />
        </Center>
      </LayoutView>
    </div>
  );
}
