import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  extendTheme,
  Flex,
  Grid,
  GridItem,
  Image,
  HStack,
  Stack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {allocateUnitToEquity, fetchAllocatedEquityInfo} from '../../../../apis/customers';
import {theme, themeStyles} from '../../../../theme';
import {Spinner} from '../../../../components/common/loaders/AnimatedLoader';
import UnitInfoForAllocation from '../../../customers/manage/allocations/manage_allocated_units/UnitInfoForAllocation';
import AllocationImageGallery from '../../../customers/manage/allocations/manage_allocated_units/Gallery';
import emptyIcon from '/src/images/icons/emptyIcon.png';

const styles = extendTheme({...theme});

export default function AllocateCustomerUnit({subPages, handleProgress}) {
  const toast = useToast();
  const [allocatedEquityInfo, setAllocatedEquityInfo] = useState(null);
  const equityIDs =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('equity'));
  const equityDetails =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('equityDetails'));
  const [isAllocated, setIsAllocated] = useState('not-allocated');
  const [allocationInfo, setAllocationInfo] = useState('');
  const [note, setNote] = useState('');
  const [archive, setArchive] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const UNIT_ALLOCATIONS = [];

  const FETCH_EQUITY_ALLOCATION_INFO = useMutation(formData => fetchAllocatedEquityInfo(formData), {
    onSuccess: res => {
      console.log(res);
      setAllocatedEquityInfo(res.data.data);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `An error occured while fetching`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const mutation = useMutation(formData => allocateUnitToEquity(formData), {
    onSuccess: res => {
      console.log(res);
      localStorage.setItem('allocationDetails', JSON.stringify(formData));
      // setTimeout(() => {
      // 		handleProgress((val) => val + 1);
      // 	}, 1200);
    },
    onError: err => {
      console.log(err);
      toast({
        title: 'Request failed',
        description: `An error occured while allocating unit(s)`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  useEffect(() => {
    FETCH_EQUITY_ALLOCATION_INFO.mutate({equities: equityIDs});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNote = note.length > 0;

  const handleSubmitAllocation = () => {
    const info = {
      allocation: !isNote ? allocationInfo : false,
      note: isNote ? note : false,
      equity_id: equityIDs,
    };
    isAllocated === 'not-allocated'
      ? setTimeout(() => {
          handleProgress(val => val + 1);
        }, 1200)
      : mutation.mutate(info);
    console.log(info);
  };

  const selectedAllocations = archive
    .filter(item => item.is_checked === true)
    .map(item => item.allocation_name);

  const handleCheckedAllocations = (bool, position, e) => {
    if (e.cancelable) e.preventDefault();
    const copy = [...archive];
    for (let i = 0; i < copy?.length; i++) {
      if (copy[i].id === position) {
        copy.splice(i, 1);
        i = copy?.length;
      }
      setArchive(copy);
    }
    setArchive(prevVal => [
      ...prevVal,
      {
        id: position,
        is_checked: bool,
        allocation_name: UNIT_ALLOCATIONS.data[position],
      },
    ]);
  };
  // console.log('===>>', allocatedEquityInfo);
  // useEffect(() => {}, [allocatedEquityInfo]);

  return (
    <>
      {FETCH_EQUITY_ALLOCATION_INFO.isLoading ? (
        <Center w="full" h="50vh">
          <Spinner />
        </Center>
      ) : (
        <Box py="37px" borderRadius="16px">
          <Stack spacing="106px">
            {allocatedEquityInfo?.length > 0
              ? allocatedEquityInfo.map((item, index) => (
                  <Grid key={index} templateColumns="repeat(9, 1fr)" gap={'56px'}>
                    <GridItem colSpan={5} maxW="665px" w="full">
                      <UnitInfoForAllocation
                        unitQuantity={equityDetails[index]?.unit?.total_quantity}
                        totalArchive={equityDetails[index]?.unit?.total_archive}
                      />
                      <AllocationImageGallery
                        activeImg={activeImg ?? item?.images[0]?.image_file}
                        uploads={item?.images?.map(entry => entry.image_file)}
                        setActiveImg={setActiveImg}
                      />
                    </GridItem>
                    <GridItem colSpan={4}>
                      {item?.allocations?.length > 0 ? (
                        Array(item?.allocations?.length)
                          ?.fill(false)
                          ?.map((checked, i) => (
                            <Flex
                              key={i}
                              onChange={e => handleCheckedAllocations(e.target.checked, i, e)}
                              borderBottom="1px solid #E3E3E3"
                              w="full"
                              pb="18px"
                              direction="row"
                              mb="23px"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text
                                fontSize="18px"
                                fontWeight="500"
                                lineHeight="23px"
                                color="#191919"
                              >{`${item?.allocations[i]?.name}`}</Text>
                              <Checkbox
                                checked={
                                  selectedAllocations?.length <= item?.allocations?.length
                                    ? checked
                                    : false
                                }
                                fontSize="18px"
                              />
                            </Flex>
                          ))
                      ) : (
                        <Center h="full" w="full" bg="gray.200" borderRadius="25px">
                          <VStack spacing="25px">
                            {/* <ImFilesEmpty style={{height: '70px', width: '75px', color: '606060'}} /> */}
                            <Image alt="empty table icon" src={emptyIcon.src} />
                            <Text
                              textAlign="center"
                              maxW="300px"
                              color="#191919"
                              fontSize="18px"
                              fontWeight="500"
                            >
                              {`Allocations haven't been created for this unit`}
                            </Text>
                          </VStack>
                        </Center>
                      )}
                    </GridItem>
                  </Grid>
                ))
              : null}
            <Flex pt="60px" justify={'flex-end'} w="full">
              <Button
                onClick={() => handleProgress(val => val + 1)}
                bg="#FFFFFF"
                fontSize="18px"
                fontWeight="500px"
                w="202px"
                h="55px"
                borderRadius="72px"
                border="1px solid #FF3636"
                color="#FF3636"
              >
                Skip
              </Button>
              {allocatedEquityInfo ? (
                <Button
                  onClick={() => handleProgress(val => val + 1)}
                  bg="#4545FE"
                  fontSize="18px"
                  fontWeight="500px"
                  w="202px"
                  h="55px"
                  borderRadius="72px"
                  border="1px solid #4545FE"
                  color="#FFFFFF"
                >
                  Proceed
                </Button>
              ) : null}
            </Flex>
          </Stack>
        </Box>
      )}
    </>
  );
}
