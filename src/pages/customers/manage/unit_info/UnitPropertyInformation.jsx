import {
  Heading,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  useToast,
  Spinner,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../theme';
import switchIsTrue from '/src/images/icons/switch-icon-true.svg';
import switchIsFalse from '/src/images/icons/switch-icon-off.svg';
import {useMutation} from '@tanstack/react-query';
import {EditUnitInfo} from '../../../../apis/listings';
import {formatAmountWithDecimal, formatNumberWithCommas} from '../../../../utils/formatAmount';
import {useRouter} from 'next/router';
import CreateAllocations from './allocations/CreateAllocations';
import {ChevronRightIcon} from '@chakra-ui/icons';
// import {Button} from 'ui-lib';

export const UnitPropertyInformation = ({unitDetail, refetch, CREATE_ALLOCATIONS_MODAL}) => {
  const toast = useToast();
  const BUILDING_TYPE = unitDetail?.project?.building_type?.toLowerCase();
  const OUTRIGHT_CONTRACT_LINK = unitDetail?.property_document[0]?.document_file;

  const mutation = useMutation(body => EditUnitInfo(unitDetail?.id, body), {
    onSuccess: async res => {
      console.log(res);
      await refetch();
      toast({
        title: 'Successfully updated',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Request failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const handleDisplayPriceSwitch = () => {
    unitDetail?.display_price == true
      ? mutation.mutate({display_price: false})
      : mutation.mutate({display_price: true});
  };
  const boxStyle = {
    maxW: {base: 'full', lg: '480px'},
    w: '100%',
    height: '70px',

    background: '#F8F8F8',
    borderRadius: '12px',
  };

  return (
    <VStack
      align={`stretch`}
      w="full"
      maxW={{base: 'full', lg: '520px'}}
      ml={{base: '', lg: 'auto'}}
      spacing="20px"
    >
      <Heading
        display={{base: 'none', lg: 'initial'}}
        textAlign={'left'}
        alignSelf="flex-start"
        fontSize={`32px`}
        fontWeight={`500`}
        lineHeight={`normal`}
      >
        {unitDetail?.unit_title}
      </Heading>
      <Flex
        p="20px 26px"
        w={`100%`}
        h="96px"
        justify="space-between"
        borderRadius={`8px`}
        border={`0.5px solid`}
        borderColor={`#E4E4E4`}
        background={`#F9FAFB`}
      >
        <Stack spacing="1px">
          <Text
            display="flex"
            fontWeight="600"
            fontSize="25px"
            color={themeStyles.color.primary}
            lineHeight="36px"
          >
            {formatAmountWithDecimal(unitDetail?.price)}
          </Text>
          <Text fontWeight=" 400" fontSize="14px" lineHeight="18px" color="#606060">
            Unit Price
          </Text>
        </Stack>
        {
          <HStack
            justify={'center'}
            bg="rgba(69, 69, 254, 0.1)"
            w="141px"
            h="38px"
            borderRadius={'16px'}
          >
            <Text fontSize={'12px'} color="#606060">
              Display price
            </Text>
            {mutation?.isLoading ? (
              <Spinner color="#191919" />
            ) : unitDetail?.display_price == true ? (
              <Image
                alt=""
                cursor={'pointer'}
                onClick={handleDisplayPriceSwitch}
                h="18px"
                w="34px"
                src={switchIsTrue.src}
              />
            ) : (
              <Image
                alt=""
                cursor={'pointer'}
                onClick={handleDisplayPriceSwitch}
                justifySelf="flex-end"
                h="18px"
                w="34px"
                src={switchIsFalse.src}
              />
            )}
          </HStack>
        }
      </Flex>

      <Stack
        w="100%"
        borderRadius={`8px`}
        border={`0.5px solid`}
        borderColor={`#E4E4E4`}
        background={`#F9FAFB`}
        p={`8px 20px`}
        gap={`0px`}
      >
        {unitDetail?.unit_type && (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Unit type
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.unit_type}
            </Text>
          </HStack>
        )}

        {BUILDING_TYPE.includes('land') || BUILDING_TYPE.includes('mall') ? null : (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              No of bedroom
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.no_of_bedrooms}
            </Text>
          </HStack>
        )}

        <HStack justify="space-between" py={`12px`}>
          <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
            Unit size
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {unitDetail?.unit_size}
          </Text>
        </HStack>
        <HStack justify="space-between" py={`12px`}>
          <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
            Total quantity
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {formatNumberWithCommas(unitDetail?.total_quantity)}
          </Text>
        </HStack>
        {unitDetail?.total_purchased_units && (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Purchased units
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {formatNumberWithCommas(unitDetail?.total_purchased_units)}
            </Text>
          </HStack>
        )}
        <HStack justify="space-between" py={`12px`}>
          <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
            Units left
          </Text>
          <Text
            fontWeight={500}
            fontSize="14px"
            lineHeight="18px"
            textAlign="right"
            color="#191919"
          >
            {formatNumberWithCommas(unitDetail?.quantity)}
          </Text>
        </HStack>
        {unitDetail?.open_house_date && (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Open house date
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.open_house_date}
            </Text>
          </HStack>
        )}
        {unitDetail?.total_archive ? (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Archived units
            </Text>
            <Text
              fontWeight={500}
              fontSize="14px"
              lineHeight="18px"
              textAlign="right"
              color="#191919"
            >
              {unitDetail?.total_archive}
            </Text>
          </HStack>
        ) : null}
        {OUTRIGHT_CONTRACT_LINK ? (
          <HStack justify="space-between" py={`12px`}>
            <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
              Outright Terms of Agreement
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
              href={OUTRIGHT_CONTRACT_LINK}
              rightIcon={<ChevronRightIcon />}
              iconSpacing="1px"
            >
              View
            </Button>
          </HStack>
        ) : null}
      </Stack>
      {!(unitDetail?.project?.building_type == 'Semi Detached') && (
        <CreateAllocations
          unitInfo={unitDetail}
          CREATE_ALLOCATIONS_MODAL={CREATE_ALLOCATIONS_MODAL}
        />
      )}
    </VStack>
  );
};

export default UnitPropertyInformation;
