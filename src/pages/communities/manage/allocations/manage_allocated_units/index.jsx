import {Box, Flex, Grid, GridItem, Text, Input, Stack, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';

import AllocationImageGallery from './Gallery';
import UnitInfoForAllocation from './UnitInfoForAllocation';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import {RiCheckboxBlankFill} from 'react-icons/ri';

export const ManageAllocatedUnits = ({uploads, handleProgress}) => {
  const router = useRouter();
  const [selectedAllocations, setSelectedAllocations] = useState([]);

  const unitQuantity = parseInt(router?.query?.qty);
  const totalArchive = router?.query?.archive;

  const allocations_data =
    typeof window !== 'undefined' &&
    localStorage.getItem('allocations_data') !== 'undefined' &&
    JSON.parse(localStorage.getItem('allocations_data'));
  const UNIT_ALLOCATIONS = allocations_data;

  const handleCheckboxChange = allocation => {
    if (selectedAllocations.includes(allocation)) {
      setSelectedAllocations(selectedAllocations.filter(selected => selected !== allocation));
    } else if (selectedAllocations.length < Number(totalArchive)) {
      setSelectedAllocations([...selectedAllocations, allocation]);
    }
  };

  const handleNext = () => {
    localStorage.setItem(
      'allocations_archived',
      JSON.stringify({...UNIT_ALLOCATIONS, archived: selectedAllocations})
    );
    handleProgress(val => val + 1);
  };

  return (
    <div>
      <Box
        bg="#FFFFFF"
        px="43px"
        py="37px"
        borderRadius="16px"
        border={'1px solid #E4E4E4'}
        mt={'30px'}
      >
        <Text fontSize="1.4rem" fontWeight="500" mb={'2rem'}>
          Manage Allocation
        </Text>
        <Flex gap={'1rem'}>
          <Flex flex={1} direction={'column'}>
            <UnitInfoForAllocation unitQuantity={unitQuantity} totalArchive={totalArchive} />
            <AllocationImageGallery uploads={uploads} />
          </Flex>

          <Flex direction={'column'} flex={1}>
            <Stack background="#F8F8F8" padding="1rem" borderRadius="1rem">
              <Text
                borderBottom="2px solid #E3E3E3"
                fontSize="1.125rem"
                pb="18px"
                fontWeight="500"
                mb="23px"
                lineHeight="23px"
              >
                Select {totalArchive} units you would like to archive
              </Text>
              {UNIT_ALLOCATIONS?.map((allocation, i) => (
                <Flex
                  key={i}
                  borderBottom="1px solid #EDEDED"
                  w="full"
                  pb="18px"
                  direction="row"
                  mb="23px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="1rem" fontWeight="400" lineHeight="23px" color="#191919">
                    {allocation}
                  </Text>
                  {selectedAllocations.includes(allocation) ? (
                    <BsFillCheckSquareFill
                      className="fade-in-animation"
                      onClick={() => handleCheckboxChange(allocation)}
                      color="#4545FE"
                      fontSize={30}
                      cursor={'pointer'}
                    />
                  ) : (
                    <RiCheckboxBlankFill
                      className="fade-in-animation"
                      color="#D9D9D9"
                      onClick={() => handleCheckboxChange(allocation)}
                      fontSize={30}
                      cursor={'pointer'}
                    />
                  )}
                </Flex>
              ))}

              <Stack padding="1.3rem" background="#fff" borderRadius="1rem">
                <Text fontSize="0.875rem">
                  {' '}
                  By checking the boxes, these units would not be available for allocation
                </Text>
              </Stack>
            </Stack>
            <Flex
              mt="50px"
              direction={'row'}
              justifyContent={'flex-end'}
              width="100%"
              alignItems="center"
            >
              <Button
                mt={0}
                fontSize="16px"
                fontWeight="500"
                onClick={() => setSelectedAllocations([])}
                width="202px"
                height="55px"
                border="1px solid #FF3636"
                color="#FF3636"
                borderRadius='72px'
              >
                Discard
              </Button>
              <Button
                mt={0}
                type="submit"
                isDisabled={selectedAllocations.length !== Number(totalArchive)}
                onClick={handleNext}
                ml="28px"
                width="202px"
                height="55px"
                variant="primary"
                borderRadius='72px'
              >
                Proceed
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default ManageAllocatedUnits;
