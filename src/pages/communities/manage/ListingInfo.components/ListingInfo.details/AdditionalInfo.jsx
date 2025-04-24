import {
  Button,
  Flex,
  HStack,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '../../../../../theme';
import {ChevronRightIcon} from '@chakra-ui/icons';
import { IoMdStar } from 'react-icons/io';

export const AdditionalInfo = ({pageQueryId, listingDetail}) => {
  const router = useRouter();
  const isCreate = router?.query?.isCreate;


  const getDocumentType = name =>
    listingDetail?.property_document?.find(item => item.purpose === name);
  const brochureDoc = getDocumentType('brochure')?.document_url;

  const OVERVIEWINFO = [
    {
      title: 'Number of Units',
      value: 180,
    }, 
    {
      title: 'Available for Lease',
      value: listingDetail?.total_units,
    },
    {
      title: 'Resident Satisfaction Score',
      component: <Flex gap='1px' align='center'>
        <Text fontSize='16px' fontWeight={500} color='#191919'>5</Text>
        <IoMdStar size='20px' color='#FF9103' />
      </Flex>
    },
    {
      title: 'Assessment Collection Rate',
      value: '33%',
    },
    {
      title: 'Rental - Cap Remaining',
      value: listingDetail?.total_units,
    },
    {
      title: 'Total Liveable Square Footage',
      value: 33
    },
    {
      title: 'Common ‑ Area Acreage / Sq ft',
      value: 53
    },
    {
      title: 'Average Year Built',
      value: 2008
    }
  ]

  return (
    <>
      <VStack w="full" maxW={{base: 'full', lg: 'full'}} spacing="20px">
        <Stack spacing="22.5px" w="full">
          <Flex alignItems="center" flexWrap="wrap" gap="8px">
            <Text fontSize={'32px'} fontWeight={500} color="#191919" textTransform='capitalize' lineHeight={'40.58px'}>
              {listingDetail?.name}
            </Text>
            {isCreate ? null : listingDetail?.payment_plan_is_available ? (
              <Tag borderRadius="48px" bg="#e7fbf5" w="129px" p="8px 12px" h="36px">
                <TagLabel color="#060623" mx="auto">
                  Payment Plan
                </TagLabel>
              </Tag>
            ) : null}
          </Flex>
        </Stack>
        <Stack w="100%" {...themeStyles.card_container}>
         {OVERVIEWINFO?.map((item, index) => (
            <Fragment key={index}>
              <Flex justify="space-between" alignItems="center" w="full" py="12px">
                <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#3F3F46">
                  {item?.title}
                </Text>
                {item?.component ? (
                  item?.component
                ) : (
                  <Text fontSize="16px" lineHeight="20.29px" fontWeight="500" color="#000">
                    {item?.value}
                  </Text>
                )}
              </Flex>
            </Fragment>
          ))}
          {brochureDoc ? (
            <HStack py="12px" justify="space-between">
              <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#3F3F46">
                Community Guideline
              </Text>

              <Button
                as="a"
                fontWeight={500}
                fontSize="14px"
                lineHeight="18px"
                target="_blank"
                variant="link"
                color="#4545FE"
                cursor="pointer"
                href={brochureDoc}
                rightIcon={<ChevronRightIcon />}
                iconSpacing="1px"
              >
                View
              </Button>
            </HStack>
          ) : null}
        </Stack>
      </VStack>
    </>
  );
};

export default AdditionalInfo;


