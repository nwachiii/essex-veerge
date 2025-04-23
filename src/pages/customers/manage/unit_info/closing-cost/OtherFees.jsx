import {useState} from 'react';
import {Container, Image, useDisclosure, Text, Stack, Box, Tooltip, Flex} from '@chakra-ui/react';
import {themeStyles} from '../../../../../theme';
import {
  formatAmountWithDecimal,
  handleLastTwoDigits,
  removeLastTwoDigits,
  truncateLongText,
} from '../../../../../utils';

import lockIcon from '/src/images/icons/black-icon.svg';
import Carousel from 'react-elastic-carousel';
import FeesDeleteModal from '../payment_plan/FeesDeleteModal';
import {InfoOutlineIcon} from '@chakra-ui/icons';
import {handleDateFormat} from 'utils/formatDate';
import TruncatedTextWithPopup from 'ui-lib/ui-lib.components/hoverOnText/TruncatedTextWithPopup';
import carrouselArrow from '/src/images/icons/paymentplanNavArrow.svg';
import {Button} from '/src/ui-lib/ui-lib.components';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
    display: 'none',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px #fafafa',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#cbcbcb',
  },
};

export const UnitOtherFees = ({otherFeesData, wrapper, containerStyle, refetch, unitInfo}) => {
  const breakPoints = [
    {width: 1, itemsToShow: 2},
    {width: 1288, itemsToShow: 3},
  ];
  const POP_OVER = useDisclosure();

  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
  const [feeToUse, setFeeToUse] = useState(null);
  const [planText, setPlanText] = useState('Make private');
  const [feeId, setFeeId] = useState();
  const openDeleteModal = fee => {
    setFeeToUse(fee);
    onDeleteOpen();
  };

  const handleButtonClick = fee => {
    setFeeId(fee?.id);
    openDeleteModal(fee);
  };

  return (
    <Box
      margin="10px 0 80px"
      zIndex="300"
      width="100%"
      px="0"
      display="flex"
      justify="flex-start"
      gap="22px"
      position={'relative'}
      // flexWrap="wrap"
      overflowX="auto"
      sx={customScrollbarStyles}
      minW="420px"
      w="full"
      {...wrapper}
    >
      {/* <Carousel
        showArrows={otherFeesData?.length > 2 ? true : false}
        pagination={false}
        itemPadding={[0, 1]}
        enableAutoPlay={false}
        autoPlaySpeed={1500}
        breakPoints={breakPoints}
        showEmptySlots={true}
        disableArrowsOnEnd={true}
        renderArrow={props => {
          return (
            <Image
              boxSize={'20px'}
              style={{cursor: 'pointer'}}
              display={props.isEdge ? 'none' : 'block'}
              transform={props.type === 'PREV' ? '' : 'rotate(180deg)'}
              onClick={props.onClick}
              src={carrouselArrow.src}
              alt={props.type === 'PREV' ? 'left arrow' : 'right arrow'}
              my={'auto'}
            />
          );
        }}
      > */}
      {otherFeesData && otherFeesData.length > 0 ? (
        otherFeesData.map((fee, index) => {
          return (
            <Stack
              key={index}
              maxW={'371px'}
              minW="371px"
              w="full"
              px="15px"
              pb="10px"
              justify={'space-around'}
              borderRadius="8px 8px 0px 0px"
              border="1px solid #EAECF0"
              fontFamily="Euclid Circular B"
              justifyContent={'space-between'}
              background={fee?.private == true ? '#F5F5F5' : '#FFF'}
            >
              <Box w="full" display={'flex'} alignItems={'center'} position="relative">
                <Text
                  w="full"
                  gap={'8px'}
                  maxW="343px"
                  color="#475467"
                  fontSize="14px"
                  fontWeight="400"
                  display={'flex'}
                  fontStyle="normal"
                  lineHeight="20px"
                >
                  <TruncatedTextWithPopup
                    h="auto"
                    maxLength={23}
                    textProps={{
                      textTransform: 'capitalize',
                    }}
                  >
                    {fee?.name ?? ''}
                  </TruncatedTextWithPopup>
                  {fee?.private == false ? null : (
                    <Tooltip
                      hasArrow
                      arrowSize={20}
                      arrowShadowColor="#f5f5f5"
                      borderRadius={'md'}
                      label={
                        <Text
                          maxW={225}
                          padding={'15px 5px'}
                          color="#344054"
                          fontSize="12px"
                          fontWeight="500"
                          lineHeight="16.5px"
                        >
                          {`${fee?.privated_by?.first_name} ${fee?.privated_by?.last_name} made this payment plan private on ${handleDateFormat(fee?.privated_at)}`}
                        </Text>
                      }
                      bg="#FFF"
                      color="black"
                    >
                      <InfoOutlineIcon
                        cursor={'pointer'}
                        color="#191919"
                        fontWeight="300"
                        fontSize={'20px'}
                      />
                    </Tooltip>
                  )}
                </Text>

                {fee?.private == true ? null : (
                  <Button
                    leftIcon={
                      <Image
                        filter={'brightness(0)'}
                        src={lockIcon.src}
                        fontSize="8px"
                        alt="lock icon"
                      />
                    }
                    fontWeight="500"
                    _hover={{
                      opacity: 1,
                    }}
                    onClick={() => handleButtonClick(fee)}
                    color="#191919"
                    fontSize="14px"
                    background="transparent"
                    padding={`8px 16px`}
                    borderRadius={`72px`}
                    border={`1px solid`}
                    borderColor={`#D6D6D6`}
                    boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
                    fontFamily={'Euclid Circular B'}
                    lineHeight={`150%`}
                    h={`max-content`}
                    maxW={`max-content`}
                  >
                    Make Private
                  </Button>
                )}
              </Box>
              <Text
                color="#191919"
                fontSize="24px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
              >
                {formatAmountWithDecimal(Number(fee?.amount))}
              </Text>
            </Stack>
          );
        })
      ) : (
        <Container
          {...themeStyles.containerStyles}
          maxW="1284px"
          padding="19px 36px"
          mt="25px"
          bg="#FFFFFF"
        >
          <Text fontSize="18px" fontWeight={500}>
            N/A
          </Text>
        </Container>
      )}
      {/* </Carousel> */}
      <FeesDeleteModal
        refetch={refetch}
        setPlanText={setPlanText}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        data={otherFeesData}
        unitInfo={unitInfo}
        feeId={feeId}
      />
    </Box>
  );
};

export default UnitOtherFees;
