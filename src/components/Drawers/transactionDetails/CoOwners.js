import {useState} from 'react';
import {Box, Text, Image, Flex, HStack, Center, Stack} from '@chakra-ui/react';
import avatarFallback from '/src/images/avatar.svg';
import Carousel from 'react-elastic-carousel';
import {ArrowRightIcon} from '@chakra-ui/icons';
import {FaAngleDoubleRight} from 'react-icons/fa';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';

const CoOwners = ({
  equityInfo,
  equityVal,
  showIndividualCo_owner,
  toggleView,
  handleUserIdSwitch,
}) => {
  const [slider, setSlider] = useState('');
  const breakPoints = [{width: 1, itemsToShow: 1}];

  const openIndividualCoownerShipTransactionInfo = () => {
    toggleView();
    handleUserIdSwitch(equityInfo?.co_owners?.[0]?.id);
  };

  return (
    <>
      {showIndividualCo_owner == false ? null : (
        <></>
        // <Flex align="center" justify="flex-start" w="full">
        //   {/* <Text
        //     color="#191919"
        //     fontSize="13px"
        //     fontWeight="500"
        //     alignItems="center"
        //     textTransform="capitalize"
        //     textAlign="end"
        //     cursor="pointer"
        //   >
        //     View general payments
        //   </Text>
        //   <MdOutlineKeyboardArrowRight /> */}
        //   <RefreshIcon onClick={toggleView} />
        // </Flex>
      )}
      {showIndividualCo_owner == true ? (
        <Box
          p="16px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          borderRadius="12px"
          border="1px solid #E4E4E4"
          display="flex"
          flexDirection="column"
          gap="10px"
          // as={motion.div}
          // whileHover={{scale: 0.9}}
          // whileTap={{scale: 0.7}}
          // transition="0.2s linear"
        >
          <Carousel
            showArrows={false}
            pagination={false}
            itemPadding={[0, 2]}
            enableAutoPlay={false}
            autoPlaySpeed={1500}
            breakPoints={breakPoints}
            disableArrowsOnEnd={true}
            ref={slider => setSlider(slider)}
          >
            {equityInfo?.co_owners?.map((item, index) => (
              <Stack spacing="12px" key={index} w="full">
                <Flex justify={'space-between'} w="full">
                  <HStack>
                    <Image
                      src={item?.avatar ?? avatarFallback.src}
                      alt="user img"
                      w="50px"
                      h="50px"
                      alignSelf="center"
                      borderRadius={50}
                    />
                    <Text fontSize="16px" fontStyle="normal" fontWeight="400" color="#191919">
                      {`${item.first_name} ${item.last_name}`}
                    </Text>
                  </HStack>
                  <Center
                    alignSelf={'center'}
                    flexDirection={'column'}
                    w="43px"
                    h="23px"
                    borderRadius="10.378px"
                    border="0.649px solid #4545FE"
                    color="#4545FE"
                    fontWeight={'500'}
                    fontSize={'14px'}
                  >
                    {`${index + 1} / ${equityInfo?.co_owners?.length}`}
                  </Center>
                </Flex>
                <Flex justify={'space-between'} w="full" alignItems={'center'}>
                  <HStack spacing="17px">
                    {' '}
                    <Text
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="400"
                      color="#191919"
                      pl={3}
                    >
                      {equityVal + ' %'}
                    </Text>
                    {index == 0 ? (
                      <Text border="1px solid #1919194A" borderRadius="12px" p="3px 15px">
                        Host
                      </Text>
                    ) : null}
                  </HStack>
                  {equityInfo?.co_owners?.length <= 1 ? null : (
                    <HStack>
                      <FaAngleDoubleRight
                        alt=""
                        boxSize={'40px'}
                        cursor={index == 0 ? 'not-allowed' : 'pointer'}
                        src={ArrowRightIcon}
                        isDisabled={index == 0}
                        opacity={index == 0 ? 0.5 : 1}
                        transform="scale(-1, -1)"
                        onClick={() => {
                          if (index !== 0) {
                            slider.slidePrev();
                            handleUserIdSwitch(equityInfo?.co_owners?.[index - 1]?.id);
                          }
                        }}
                      />
                      <FaAngleDoubleRight
                        alt=""
                        boxSize={'40px'}
                        cursor={
                          equityInfo?.co_owners?.length - 1 == index ? 'not-allowed' : 'pointer'
                        }
                        isDisabled={equityInfo?.co_owners?.length - 1 == index}
                        opacity={equityInfo?.co_owners?.length - 1 == index ? 0.5 : 1}
                        src={ArrowRightIcon}
                        onClick={() => {
                          if (equityInfo?.co_owners?.length - 1 !== index) {
                            slider.slideNext();
                            handleUserIdSwitch(equityInfo?.co_owners?.[index + 1]?.id);
                          }
                        }}
                      />
                    </HStack>
                  )}
                </Flex>
              </Stack>
            ))}
          </Carousel>
        </Box>
      ) : (
        <Flex align="center" justify="flex-end" w="full">
          <Text
            color="#191919"
            fontSize="13px"
            fontWeight="500"
            alignItems="center"
            textTransform="capitalize"
            textAlign="end"
            cursor="pointer"
            onClick={openIndividualCoownerShipTransactionInfo}
          >
            View Individual Payment
          </Text>
          <MdOutlineKeyboardArrowRight />
        </Flex>
      )}
    </>
  );
};

export default CoOwners;
