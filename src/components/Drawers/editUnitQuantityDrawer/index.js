import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  DrawerContent,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {useRouter} from 'next/router';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {EditUnitQuantity} from 'apis/listings';

export default function EditUnitQuantityDrawer({
  unitInfo,
  refetch,
  bundleId,
  modalDisclosure,
  handleMainScreen,
}) {
  const router = useRouter();
  const [isQuantityUpdated, setQuantityUpdated] = useState(false);
  const [quantInput, setQuantInput] = useState(unitInfo?.quantity);
  const [quantityIncrease, setQuantityIncrease] = useState(false);
  const [difference, setDifference] = useState(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleChange = e => {
    setQuantInput(e.target.value);
  };

  const mutation = useMutation(body => EditUnitQuantity(unitInfo?.id, body), {
    onSuccess: (res, variables) => {
      if (variables.quantity === 0) {
        modalDisclosure.onClose();
        toast({
          title: 'Unit successfully updated',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        router.push(`/listings/manage?listingId=${unitInfo?.project?.id}`);
      } else {
        modalDisclosure.onClose();
        toast({
          title: 'Unit quantity updated Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        queryClient.invalidateQueries('payment_plan');
      }
    },
    onError: err => {
      console.log(err);
      toast({
        title: `${err?.response?.data?.message || 'Editing process failed'}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleQuantity = () => {
    if (quantInput > unitInfo?.quantity) {
      setQuantityIncrease(true);
    } else {
      setQuantityIncrease(false);
    }
    sessionStorage.setItem('editedQuantity', quantInput);
    if (unitInfo?.has_allocations == true && unitInfo?.quantity !== quantInput) {
      router.push(
        `/listings/manage/unit_info/allocations/edit/?unitId=${bundleId}&qtyStatus=${quantityIncrease}&qtyAmount=${difference}`
      );
      setQuantityUpdated(true);
    } else if (quantInput > unitInfo?.quantity || quantInput < unitInfo?.quantity) {
      mutation.mutate({
        quantity: parseInt(quantInput),
      });
    } else {
      setQuantityUpdated(false);
      modalDisclosure.onClose();
    }
  };

  useEffect(() => {
    const calculatedDifference = quantInput - unitInfo?.quantity;
    const absoluteDifference = Math.abs(calculatedDifference);
    const sign = calculatedDifference < 0 ? '-' : '';
    setDifference(`${sign}${absoluteDifference}`);
  }, [quantInput, unitInfo?.quantity]);

  return (
    <div>
      <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="410px" bg="#fff">
        <HStack
          py="12px"
          px="29px"
          bg="#F5F5F5"
          align="center"
          position="relative"
          justify="space-between"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
        >
          <HStack>
            <Image
              alt="back icon"
              cursor="pointer"
              src={backIcon.src}
              onClick={() => handleMainScreen('options')}
            />
            <Text fontSize="20px" fontWeight={600} color="#191919">
              Modify Quantity
            </Text>
          </HStack>
        </HStack>
        <Box>
          <VStack align="flex-start" px="8" mt="5">
            <label style={{fontSize: '12px', fontWeight: 550}}>
              What quantity would you like to update it to?
            </label>
            <Input
              w="full"
              h="44px"
              borderRadius="6px"
              id="quantity"
              name="quantity"
              color="#191919"
              pl="3"
              _focus={{
                outline: 'none',
                border: '0.8px solid #191919',
                boxShadow: '0px 0.802px 1.603px 0px rgba(16, 24, 40, 0.05)',
              }}
              _hover={{outline: 'none', border: '0.8px solid #191919'}}
              border="0.8px solid #191919"
              boxShadow="0px 0.802px 1.603px 0px rgba(16, 24, 40, 0.05)"
              onChange={handleChange}
              value={quantInput}
            />
          </VStack>
          <Flex justifyContent="center" mt="10" px="8">
            <Button
              py={4}
              w="full"
              bg="#191919"
              fontWeight={400}
              color="#FFFFFF"
              h="45.5px"
              cursor={'pointer'}
              textAlign={'center'}
              borderRadius={'full'}
              _hover={{
                background: '',
              }}
              onClick={handleQuantity}
              disabled={mutation?.isLoading}
            >
              {mutation?.isLoading ? <Spinner /> : 'Proceed'}
            </Button>
          </Flex>
        </Box>
      </DrawerContent>
    </div>
  );
}
