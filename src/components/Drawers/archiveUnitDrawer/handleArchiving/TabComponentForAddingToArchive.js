import {useState} from 'react';
import infoIcon from '/src/images/icons/infoIconArchiveUnit.svg';
import {Button, HStack, Image, Input, Stack, Text, useToast} from '@chakra-ui/react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addUnitsToArchive, allocateUnit} from '../../../../apis/listings';
import UpdatingAllocation from '../updateAllocation';
import {useRouter} from 'next/router';
import {fetchAllocationForArchiving} from 'apis/customers';

export const TabComponentForAddingToArchive = ({
  refetch,
  unitInfo,
  infoText,
  handleScreen,
  bundleId,
  labelText,
  numberToDisplay,
  value,
  setValue,
  toRemoving,
  archiveUnitModal,
}) => {
  const [allocations, setAllocation] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const unit_id = router.query.unitId;

  const isAllocation = unitInfo?.has_allocations;

  const param = `?unit_id=${unit_id}&${toRemoving ? 'archived' : 'available'}=true`;

  const {data} = useQuery(['allocationforUnit', param], () => fetchAllocationForArchiving(param), {
    enabled: !!unit_id,
  });

  const unitTense = value > 1 ? 'units' : 'unit';

  const allocationText = toRemoving
    ? `You are about to remove ${value} ${unitTense} from archive. kindly check the boxes of the ${value} ${unitTense} you intend to remove from Archive.`
    : `Kindly select the ${value} units you intend to add to archive.`;

  const arrayOfAllocation = data?.data?.data;

  const prefixZero = val => (Number(val) > 9 || Number(val) === 0 ? `${val || 0}` : `0${val}`);

  const {mutateAsync, isLoading: isMutationLoading} = useMutation(allocateUnit);

  const mutation = useMutation(formData => addUnitsToArchive(bundleId, formData), {
    onSuccess: async () => {
      await refetch();
      toast({
        title: toRemoving ? 'Units removed from archive' : 'Units added to archive',
        status: 'success',
        duration: 3000,
        position: 'top-right',
      });
      archiveUnitModal.onClose();
    },
    onError: () => {
      toast({
        title: 'Request failed',
        description: `An error occured while archiving was in progress`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    const status = toRemoving ? false : true;
    const newData = {
      archived: toRemoving ? false : true,
    };
    const newObj = id => ({
      id,
      body: newData,
    });
    const handleSelectedAllocation = async () => {
      try {
        const promises = allocations.map(id => mutateAsync(newObj(id)));

        await Promise.all(promises);
        await refetch();
        // handleScreen(forScreen);
      } catch (error) {
        toast({
          title: 'Request failed',
          description: `something went wrong while allocation was in progress`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    };
    if (value) {
      handleSelectedAllocation();
      return mutation.mutate({
        status,
        amount: Number(value),
      });
    } else {
      return;
    }
  };

  const isValid = isAllocation
    ? value &&
      value <= numberToDisplay &&
      isAllocation &&
      allocations.length &&
      allocations.length == Number(value)
    : value && value <= numberToDisplay;

  const handleInput = e => {
    const isValid = val => {
      return Number(val) > Number(numberToDisplay ?? 0)
        ? Number(numberToDisplay ?? 0)
        : Number(val);
    };
    const inputedValue = e.target.value;
    let newValue = inputedValue.replace(/[^0-9]/g, '');
    setValue(isValid(newValue));
  };

  return (
    <Stack spacing={{base: '25px', '2xl': '40px'}} w="full" position="relative">
      <>
        {/* <HStack align="start" spacing="10px" bg="#F5F5F5" p="6px 8px" borderRadius={'12px'}>
          <Image src={infoIcon.src} alt="info icon" />
          <Text textAlign="start" fontSize="14px" fontWeight="300" color="#191919">
            {infoText}
          </Text>
        </HStack> */}
        <Stack spacing="34px" w="full" pr="10px">
          <Stack as="form" px="2px" onSubmit={handleSubmit} w="full" spacing="6px">
            <Text textAlign="start" as="label" htmlFor="archId" fontSize="14px" fontWeight="400">
              {labelText}
            </Text>
            <Input
              w="full"
              id="archId"
              value={value}
              padding="10px 14px"
              fontSize="14px"
              fontWeight="400"
              onChange={handleInput}
              _focusVisible={{
                borderColor: '#3182ce',
                boxShadow: '0 0 0 1px #3182ce',
              }}
            />

            <Text textAlign="start" color="#919191" fontSize="14px" fontWeight="400">
              {numberToDisplay ? `${prefixZero(value)}/${prefixZero(numberToDisplay)}` : null}
            </Text>
          </Stack>
        </Stack>
      </>
      {value && value <= numberToDisplay && isAllocation ? (
        <UpdatingAllocation
          value={value}
          refetch={refetch}
          unitInfo={unitInfo}
          bundleId={bundleId}
          toRemoving={toRemoving}
          isAllocation={isAllocation}
          allocationText={allocationText}
          arrayOfAllocation={arrayOfAllocation}
          handleScreen={handleScreen}
          setAllocation={setAllocation}
          // customScrollbarStyles={customScrollbarStyles}
        />
      ) : null}
      <Button
        w="full"
        h="52.5px"
        py="16px"
        bg="#191919"
        type="submit"
        color="#fff"
        fontSize="16px"
        fontWeight="400"
        borderRadius="full"
        isDisabled={!isValid || mutation.isLoading}
        onClick={handleSubmit}
        _hover={{opacity: '1'}}
        setAllocation={setAllocation}
        isLoading={isMutationLoading || mutation.isLoading}
      >
        Proceed
      </Button>
    </Stack>
  );
};

export default TabComponentForAddingToArchive;
