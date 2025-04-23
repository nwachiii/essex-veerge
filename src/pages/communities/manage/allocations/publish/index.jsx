import {Box, Spinner, Text, useToast, Stack, Flex} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from '../../../../../ui-lib/ui-lib.components';
import {useMutation} from '@tanstack/react-query';
import {createAllocations} from '../../../../../apis/listings';
import UnitInfoForAllocation from '../manage_allocated_units/UnitInfoForAllocation';
import AllocationImageGallery from '../manage_allocated_units/Gallery';
import usePublish from './usePublish';
import {clearLocalStorage} from 'utils/clearLocalStorage';
import keys from 'constants/listings/key';

export const Publish = ({uploads, setIsPersisting}) => {
  const [activeImg, setActiveImg] = useState(uploads[0]);
  const router = useRouter();
  const toast = useToast();
  const {unit_id} = router?.query;
  const totalArchive = router?.query?.archive;
  const unitQuantity = parseInt(router?.query?.qty);
  const id = router?.query?.unit_id;

  const mutation = useMutation(body => createAllocations(id, body), {
    onSuccess: res => {
      toast({
        title: `Allocations published successfully`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      clearLocalStorage(keys);
      setIsPersisting(false);
      router.push(`/listings/manage/unit_info/?unitId=${parseInt(unit_id)}`);
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Allocation creation failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {handlePublish} = usePublish(mutation, unit_id, uploads);

  const UNIT_ALLOCATIONS =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_data'));
  const allocationsArchived =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_archived'));

  const handleSubmit = () => {
    handlePublish();
    setIsPersisting(false);
  };

  return (
    <div>
      <Box
        px="43px"
        py="37px"
        bg="#fff"
        borderRadius="16px"
        border={'1px solid #E4E4E4'}
        mt={'30px'}
      >
        <Text fontSize="1.4rem" fontWeight="500" mb="2rem">
          Summary
        </Text>
        <Flex gap={'1rem'}>
          <Flex flex={1} direction={'column'}>
            <UnitInfoForAllocation unitQuantity={unitQuantity} totalArchive={totalArchive} />
            <AllocationImageGallery
              activeImg={activeImg}
              uploads={uploads}
              setActiveImg={setActiveImg}
            />
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
                Allocations
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
                  {allocationsArchived?.archived?.includes(allocation) ? (
                    <Text color="#919191" fontSize="0.875rem" fontWeight="400">
                      Archived
                    </Text>
                  ) : (
                    <Text color="#4545FE" fontSize="0.875rem" fontWeight="400">
                      Available
                    </Text>
                  )}
                </Flex>
              ))}
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
                onClick={() => router.back(-1)}
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
                onClick={handleSubmit}
                ml="28px"
                width="202px"
                height="55px"
                variant="primary"
                borderRadius='72px'
              >
                {mutation.isLoading ? <Spinner color="white" /> : 'Publish'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Publish;
