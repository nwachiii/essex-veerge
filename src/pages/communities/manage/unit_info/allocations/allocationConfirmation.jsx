import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {IoArrowBackSharp} from 'react-icons/io5';
import allocation_house from '/src/images/icons/allocation_house.svg';
import capitalizeFirstLetterOfWords from 'utils/capitalizeFirstLetterOfWords';

export const activeBtnStyle = {
  gap: '5px',
  mt: '0',
  w: 'fit-content',
  h: 'fit-content',
  color: '#FFF',
  fontSize: '14px',
  display: 'flex',
  fontWeight: '500',
  padding: '.6rem 1rem',
  borderRadius: '12px',
  textAlign: 'center',
  alignItems: 'center',
  background: '#4545FE',
  justifyContent: 'center',
  border: '0.5px solid #FFF',
};

export const inActiveBtnStyle = {
  mt: '0',
  gap: '5px',
  fontSize: '14px',
  fontWeight: 500,
  display: 'flex',
  color: '#4545FE',
  w: 'fit-content',
  h: 'fit-content',
  padding: '.6rem 1rem',
  borderRadius: '12px',
  lineHeight: 'normal',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #4545FE',
  background: 'none',
};

export const AllocationConfirmation = ({
  confirmationScreen,
  allocation,
  customerInfo,
  handleSubmitAllocation,
  mutation,
  previousAllocation,
  deleteAllocation,
}) => {
  const handleAllocation = () => {
    if (!allocation) {
      return deleteAllocation()
    } 
    return handleSubmitAllocation()
  }
  return (
    <Drawer isOpen={confirmationScreen?.isOpen} onClose={confirmationScreen?.onClose}>
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent mt="65px" maxW="450px" bg="#fff" py="15.23px" pt="0px">
        <DrawerCloseButton />
        <DrawerHeader bg="#f5f5f5">
          <Flex alignItems={'center'} gap={'1rem'}>
            <IoArrowBackSharp
              fontSize="20px"
              cursor="pointer"
              onClick={confirmationScreen?.onClose}
            />
            <Text>Unit Allocation</Text>
          </Flex>
        </DrawerHeader>
        <Flex
          gap={'.75rem'}
          justifyContent={'center'}
          direction={'column'}
          alignItems={'center'}
          height={'50%'}
        >
          <Image alt="allocation_house_icon" src={allocation_house.src} width={50} height={50} />
          <Text align={'center'} fontSize={20} width={'75%'} fontWeight={600}>
            Are you sure you want to{' '}
            {!allocation ? `unassign ${previousAllocation} from` : `allocate ${allocation} to`}{' '}
            {capitalizeFirstLetterOfWords(customerInfo?.first_name ?? customerInfo)}{' '}
            {capitalizeFirstLetterOfWords(customerInfo?.last_name)}?
          </Text>
          <Flex alignItems={'center'} gap={'1rem'} padding={'0 2rem'} width={'100%'}>
            <Button
              padding="1.5rem"
              onClick={confirmationScreen?.onClose}
              border={'1px solid #FF6A6A'}
              margin="0"
              fontSize="16px"
              color="#FF6A6A"
              fontWeight="400"
              background={'transparent'}
              width={'100%'}
              _hover={{
                background: 'none',
              }}
              rounded='full'
            >
              Cancel
            </Button>
            <Button
              margin="0"
              background={'#191919'}
              padding="1.5rem"
              fontWeight="400"
              fontSize="16px"
              width={'100%'}
              onClick={handleAllocation}
              color={'white'}
              _hover={{
                background: '',
              }}
              rounded='full'
            >
              {mutation.isLoading ? <Spinner color="#FFFFFF" /> : `Yes`}
            </Button>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

export default AllocationConfirmation;
