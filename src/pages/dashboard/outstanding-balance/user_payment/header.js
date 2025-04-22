import {Box, Divider, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';
import defaultAvatar from '/src/images/avatar.svg';
import Carousel from 'react-elastic-carousel';
import arrowRight from '/src/images/icons/Iconly/Bulk/Arrow - Right 2.svg';
import {themeStyles} from '../../../../theme';

export const CoownershipHeader = ({pastPayment, isIndividual}) => {
  return (
    <>
      {isIndividual ? (
        <IndividualCoOwnerHeader pastPayment={pastPayment} />
      ) : (
        <VStack>
          <Box position="relative" boxSize={`115.69px`}>
            <Box
              p="3px 8px"
              fontSize={'20px'}
              borderRadius={'full'}
              bg="#4545FE"
              color="#FFFFFF"
              position={'absolute'}
              right={'-4.7%'}
            >
              {'+' + pastPayment[0]?.equity?.co_owners?.length}
            </Box>
            <Image
              alt=""
              src={pastPayment[0]?.customer?.avatar ?? defaultAvatar.src}
              borderRadius="full"
              boxSize={`105.69px`}
            />
          </Box>

          <Flex pr="7px" fontWeight={700} fontSize="32px" lineHeight="41px">
            <Text textTransform={'capitalize'} wordWrap={'break-word'} pr={2}>
              {`${pastPayment[0]?.customer?.first_name}`}
            </Text>
            <Text>{`& ${pastPayment[0]?.equity?.co_owners?.length} others`}</Text>
          </Flex>
        </VStack>
      )}
    </>
  );
};

export default CoownershipHeader;

const IndividualCoOwnerHeader = ({pastPayment}) => {
  const [slider, setSlider] = useState('');
  const breakPoints = [{width: 1, itemsToShow: 1}];
  const co_ownersLength = pastPayment[0]?.equity?.co_owners?.length;
  return (
    <Box position="relative" maxW={'535px'} mx="auto">
      <Image
        alt=""
        src={arrowRight.src}
        boxSize={'40px'}
        transform="scale(-1, -1)"
        pos="absolute"
        left={'5%'}
        bottom={'50%'}
        zIndex={99}
        onClick={() => slider.slidePrev()}
      />
      <Carousel
        showArrows={false}
        pagination={false}
        itemPadding={[0, 2]}
        enableAutoPlay={false}
        autoPlaySpeed={1500}
        breakPoints={breakPoints}
        ref={slider => setSlider(slider)}
      >
        {pastPayment[0]?.equity?.co_owners?.map((item, index) => (
          <VStack key={index} position="relative">
            <Box
              px="8px"
              fontSize={'20px'}
              borderRadius={'full'}
              bg="transparent"
              border="1px solid #4545FE"
              color="#4545FE"
              position={'absolute'}
              right={'-8.7%'}
            >
              {`${index + 1} / ${co_ownersLength}`}
            </Box>
            <Image
              alt=""
              src={item?.avatar ?? defaultAvatar.src}
              borderRadius="full"
              boxSize={`105.69px`}
            />

            <Flex pr="7px" fontWeight={700} fontSize="32px" lineHeight="41px">
              <Text textTransform={'capitalize'} wordWrap={'break-word'} pr={2}>
                {`${item?.first_name}`}
              </Text>
              <Text>{`${item?.last_name}`}</Text>
            </Flex>
          </VStack>
        ))}
      </Carousel>
      <Image
        src={arrowRight.src}
        boxSize={'40px'}
        alt=""
        pos="absolute"
        zIndex={99}
        right={'5%'}
        bottom={'50%'}
        onClick={() => slider.slideNext()}
      />
    </Box>
  );
};

export const UserHeader = ({pastPayment, ACCOUNT_DETAILS}) => {
  return (
    <VStack>
      <Image
        alt=""
        src={pastPayment[0]?.customer?.avatar ?? defaultAvatar.src}
        borderRadius="full"
        boxSize={`105.69px`}
      />
      <Text fontWeight={700} fontSize="32px" lineHeight="41px">{`${
        pastPayment[0]?.customer?.first_name ?? ''
      } ${pastPayment[0]?.customer?.last_name ?? 'No name'}`}</Text>
      <Text as="small">{pastPayment[0]?.customer?.phone ?? 'No phone number'}</Text>
      <Text as="small" color={'#4545FE'}>
        <a href={`mailto:${pastPayment[0]?.customer?.email}`}>
          {' '}
          {pastPayment[0]?.customer?.email ?? 'No email'}
        </a>
      </Text>
      <Flex gap="4px" align="center">
        {ACCOUNT_DETAILS ? (
          <Text as="small" color={'#191919'} fontWeight={'600'}>
            {`${ACCOUNT_DETAILS?.account_number} (${ACCOUNT_DETAILS?.bank_name})`}
          </Text>
        ) : (
          <Text as="small" color={'#3D3D3D'} fontWeight={'400'}>
            No Account information available
          </Text>
        )}
      </Flex>
    </VStack>
  );
};

export const UpcomingPaymentsHeader = ({paymentData, pastPayment}) => {
  return (
    <div>
      {paymentData.length > 0 && (
        <>
          <Text mt="50px" mb="15px" fontWeight={500} fontSize="xl" ml={2}>
            Upcoming payments
          </Text>
          {!pastPayment[0]?.equity?.co_owners?.length && (
            <HStack
              mb="15px"
              px="18px"
              py="13px"
              minW="328px"
              w="fit-content"
              height="62px"
              background="rgba(69, 69, 254, 0.05)"
              borderRadius="16px"
            >
              {pastPayment[0]?.equity?.auto_pay == true && (
                <Flex gap="10px">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#191919">
                    Auto-pay
                  </Text>
                  <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#4545FE">
                    ON
                  </Text>
                </Flex>
              )}
              {pastPayment[0]?.equity?.auto_debit == true &&
                pastPayment[0]?.equity?.auto_pay == true && (
                  <Divider orientation="vertical" h="80%" border="1px solid #7255CB9a" />
                )}
              {pastPayment[0]?.equity?.auto_debit == true && (
                <Flex gap="10px">
                  <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#191919">
                    Recurring
                  </Text>
                  <Text fontWeight="600" fontSize="16px" lineHeight="20px" color="#4545FE">
                    ON
                  </Text>
                </Flex>
              )}

              <Divider orientation="vertical" h="80%" border="1px solid #7255CB9a" />
              <Flex gap="10px">
                <Text fontWeight="400" fontSize="16px" lineHeight="20px" color="#191919">
                  Fund Source
                </Text>
                <Text
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="20px"
                  color="#4545FE"
                  textTransform={'capitalize'}
                >
                  {pastPayment[0]?.equity?.auto_debit_source}
                </Text>
              </Flex>
            </HStack>
          )}
        </>
      )}
    </div>
  );
};
