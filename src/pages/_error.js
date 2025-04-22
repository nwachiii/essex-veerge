import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Center} from '@chakra-ui/react';
import {LayoutView} from '../components/PageLayout/LayoutView';
import {AnimatedLoader} from '../components/common/loaders/AnimatedLoader';
function Error({statusCode}) {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.back(-1);
    }, 1400);
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

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;
