import {useQuery} from '@tanstack/react-query';
import {toastForError} from '../../../utils/toastForErrors';
import {Box, HStack, Stack, useToast, Image, Button, Text, StackDivider} from '@chakra-ui/react';
import historyTimeIcon from '/src/images/icons/historyTimeIcon.svg';
import {LayoutView} from '../../../components';
import {useRouter} from 'next/router';
import {fetchInspection} from '../../../apis/veerge_menu';
import Link from 'next/link';
import backButton from '/src/images/icons/backButton.svg';
import VeergeMenuInspectionRequest from '@/components/veergeMenu/inspection/VeergeMenuInspectionRequest';

const Inspection = () => {
  const router = useRouter();
  const routeQueries = router.query;

  const mergedQuery = status => ({
    ...routeQueries,
    page: 1,
    status,
  });

  const convertToApiQuery = () => {
    return `${Object.entries(routeQueries)
      .map(item =>
        item?.[0] === 'status'
          ? `${item?.[0]}=${item?.[1].toLowerCase().replace(' ', '_')}`
          : `${item?.[0]}=${item?.[1]}`
      )
      .join('&')}`;
  };

  const param = convertToApiQuery();

  const {data, isError, isLoading, error, refetch} = useQuery(
    ['inspectionForVeergeMenu', param],
    () => fetchInspection(param)
  );

  const toast = useToast();
  toastForError(error, isError, toast);

  return (
    <Box position="relative" bg="#FAFAFA" w="full">
      <LayoutView
        px={{base: '0px', xl: '30px'}}
        tabPanelStyle={{pb: '0px'}}
        pb="0px"
        activePage="request"
        bg="#FAFAFA"
      >
        <Box
          mt="clamp(52px,calc(11.4vh + 40px),96px)"
          px={{base: '0px', xl: '30px'}}
          maxW="full"
          w="full"
          mx="auto"
        >
          <Box align="center" pb={8}>
            <HStack
              spacing="24px"
              w="full"
              position="relative"
              // p={`0px 20px`}
              align="start"
            >
              <Stack
                spacing="10px"
                position="sticky"
                top={`calc(44px + clamp(52px,calc(11.4vh + 40px),96px))`}
              >
                <Box py="10px" w="fit-content">
                  {router?.query?.status === 'Completed' ? (
                    <Link
                      prefetch={false}
                      href={{pathname: '/veerge_menu/inspection', query: mergedQuery('dashboard')}}
                    >
                      <Button
                        leftIcon={<Image src={backButton.src} alt="history icon" />}
                        fontSize="16px"
                        fontWeight="500"
                        iconSpacing="8px"
                        color="#475467"
                        _hover={{bg: 'transparent'}}
                        _active={{bg: 'transparent'}}
                        _focus={{bg: 'transparent'}}
                        p="0px"
                        h="fit-content"
                        variant="ghost"
                      >
                        Back
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      prefetch={false}
                      href={{pathname: '/veerge_menu/inspection', query: mergedQuery('Completed')}}
                    >
                      <Button
                        mx="16px"
                        leftIcon={
                          <Image src={historyTimeIcon.src} alt="history icon" boxSize="18px" />
                        }
                        fontSize="14px"
                        iconSpacing="8px"
                        _hover={{bg: 'transparent'}}
                        _active={{bg: 'transparent'}}
                        _focus={{bg: 'transparent'}}
                        fontWeight="500"
                        p="0px"
                        h="fit-content"
                        color="#4545FE"
                        variant="ghost"
                      >
                        Inspection History
                      </Button>
                    </Link>
                  )}
                </Box>

                <Stack
                  as="ul"
                  spacing="none"
                  py="0px"
                  overflow="hidden"
                  px="0px"
                  maxW="258px"
                  w="258px"
                  borderRadius="8px"
                  border="1px solid #EAECF0"
                  boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                  divider={<StackDivider my="0px" />}
                >
                  <HStack cursor="pointer" spacing="8px" px="16px" py="10px" bg={'#F5F5F5'}>
                    <Box boxSize="10px" borderRadius="full" bg="#191919" />
                    <HStack position="relative">
                      <Text as="li" fontSize="14px" color={'#191919'} fontWeight={'600'}>
                        {router?.query?.status === 'Completed'
                          ? `Inspection History`
                          : `Upcoming Inspections`}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Stack>
              <Stack flex={`1`} borderRadius={`8px`}>
                <VeergeMenuInspectionRequest
                  response={data?.data}
                  refetch={refetch}
                  isLoading={isLoading}
                  isError={isError}
                />
              </Stack>
            </HStack>
          </Box>
        </Box>
      </LayoutView>
    </Box>
  );
};

export default Inspection;
