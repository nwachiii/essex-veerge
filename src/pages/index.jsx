import {Box, Center, Heading, Image, Stack, Text, useToast} from '@chakra-ui/react';
import Dashboard from './dashboard';
import veergeLogo from '/src/images/icons/veergeLogo.svg';
import {CURRENT_YEAR} from '@/components/Navbar';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchDevelopersStatus} from 'apis/settings';

const Index = () => {
  const router = useRouter();
  const toast = useToast();
  const [isHold, setHold] = useState(true);
  const IS_USER_TOKEN_AVAILABLE =
    (typeof window !== 'undefined' && JSON?.parse(localStorage?.getItem('devToken'))) ?? null;

  const IS_DEVELOPER_APPROVED =
    typeof window !== 'undefined' &&
    localStorage.getItem('IS_DEVELOPER_APPROVED') !== 'undefined' &&
    JSON.parse(localStorage.getItem('IS_DEVELOPER_APPROVED'));

  const pathsCanBeAccessedWithOutToken = ['/auth/role-signup'];

  const isAccessibleWithOutToken = pathsCanBeAccessedWithOutToken?.includes(router.pathname);

  useEffect(() => {
    console.log('effect');
    const timeOut = setTimeout(() => {
      setHold(false);
    }, 5800);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    IS_DEVELOPER_APPROVED == true && localStorage.clear();
  }, [IS_DEVELOPER_APPROVED]);

  return (
    <>
      {!!((!IS_USER_TOKEN_AVAILABLE && !isAccessibleWithOutToken) || isHold) ? (
        <Center
          minH="100vh"
          bg="#191919"
          w="full"
          gap={4}
          objectFit={'contain'}
          position={'relative'}
          bgRepeat={'no-repeat'}
          bgImage="/new-banner-myxellia.svg"
          backgroundSize={`cover`}
          backgroundPosition="center"
          pb={'140px'}
        >
          <Image src={veergeLogo.src} w="40px" h="60px" alt="veerge logo" />

          <Heading size={'2xl'} fontWeight={400} className="veerge_header">
            Veerge by Myxellia
          </Heading>
          <Box position="absolute" bottom={'3%'} left={'3%'}>
            <Stack
              position="absolute"
              color="#FFFFFF"
              left="10%"
              right="5%"
              bottom="3%"
              w="max-content"
            >
              <Text display={'flex'} gap="6px" fontSize="12px" fontWeight={400}>
                <a target="_blank" href="https://veerge-support.myxellia.io/privacy">
                  <u>Privacy Policy</u>
                </a>{' '}
                &{' '}
                <a target="_blank" href="https://veerge-support.myxellia.io/terms">
                  <u>Terms of Use</u>
                </a>
              </Text>
              <Text fontSize="12px" fontWeight={400}>
                {`Copyright © ${CURRENT_YEAR} Myxellia Inc. All rights reserved.`}
              </Text>
            </Stack>
          </Box>
        </Center>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Index;
