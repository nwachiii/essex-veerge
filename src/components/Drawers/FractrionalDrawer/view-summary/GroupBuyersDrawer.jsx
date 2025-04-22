import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Flex,
  DrawerOverlay,
  Drawer,
  useDisclosure,
  AbsoluteCenter,
  useToast,
} from '@chakra-ui/react';
import {Button} from 'ui-lib/ui-lib.components';
import MakeDividendPayment from '../pay-dividend/MakeDividendPayment';
import {useMutation} from '@tanstack/react-query';
import {payFractionalDividend} from 'apis/listings';
import {EmptyStateComponent} from '@/components/common/EmptyDataComponent';
import {toastForError} from 'utils/toastForErrors';
import {MatadorCustomToast} from 'pages/veerge_menu/loop';

export const GroupBuyersView = ({
  customScrollbarStyles,
  handleScreen,
  unitInfo,
  isDividend,
  selectedGroup,
  DrawerDisclosure,
}) => {
  const toast = useToast();
  const handleClose = () => {
    handleScreen('options');
    DrawerDisclosure.onClose();
  };
  const MakePaymentDisclosure = useDisclosure();

  const mutation = useMutation(
    {mutationFn: formData => payFractionalDividend(formData), retry: 0},
    {
      onSuccess: async res => {
        DrawerDisclosure.onClose();
        MakePaymentDisclosure.onClose();
        return toast({
          render: () => <MatadorCustomToast description={'Dividend paid successfully'} />,
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        });
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const initiatePaymentOnSubmit = arg => {
    mutation.mutate({...arg, equity_group: selectedGroup?.equityId});
  };

  return (
    <>
      <Drawer
        autoFocus={false}
        isOpen={DrawerDisclosure.isOpen}
        onClose={DrawerDisclosure.onClose}
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          p="0px"
          bg="#fff"
          zIndex={100}
          mt="65.12px"
          position="relative"
          minW="fit-content"
          sx={customScrollbarStyles}
        >
          <HStack
            py="30px"
            px="25px"
            h="49.699px"
            bg="#F5F5F5"
            align="center"
            position="relative"
            justify="space-between"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              {`Unit ${selectedGroup?.id}`}
            </Heading>
            <HStack spacing="15px">
              <VStack
                w="30px"
                h="30px"
                _hover={{
                  width: '30px',
                  height: '30px',
                }}
                align="center"
                justify="center"
                position="relative"
                borderRadius="5px"
                transition="0.3s ease-in-out"
              >
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody
            mr="2px"
            w="400px"
            paddingTop="1rem"
            position="relative"
            sx={customScrollbarStyles}
          >
            <Stack>
              {selectedGroup?.group?.length > 0 ? (
                selectedGroup?.group?.map((item, idx) => (
                  <Flex
                    key={idx}
                    width="350px"
                    padding="24px"
                    cursor={'pointer'}
                    alignItems="center"
                    borderRadius="8px"
                    background="#F8F8F8"
                    justify="space-between"
                    // onClick={() => handleSelectGroup(idx, item?.fractional_cowners)}
                  >
                    <HStack>
                      <Image
                        boxSize={'32px'}
                        borderRadius={'full'}
                        src={item?.avatar}
                        alt={`${item?.first_name} ${item?.last_name}`}
                      />
                      <Text
                        color="#191919"
                        fontSize="14px"
                        fontWeight="500"
                        fontStyle="normal"
                        lineHeight="normal"
                      >
                        {`${item?.first_name} ${item?.last_name}`}
                      </Text>
                    </HStack>
                    <Stack
                      color="#3D3D3D"
                      fontStyle="normal"
                      lineHeight="normal"
                      align={'flex-end'}
                      textAlign={'right'}
                    >
                      <Text fontSize="10px">Total fractions bought</Text>
                      <Text fontSize="14px" fontWeight="600">
                        {item?.fractions}
                      </Text>
                    </Stack>
                  </Flex>
                ))
              ) : (
                <AbsoluteCenter>
                  <EmptyStateComponent
                    title={'No buyers'}
                    description="No purchase details found"
                  />
                </AbsoluteCenter>
              )}
            </Stack>

            {isDividend ? (
              <Button
                bottom="8%"
                color="#000"
                width="350px"
                fontWeight="400"
                fontStyle="normal"
                position="absolute"
                fontSize="14.617px"
                variant={'secondary'}
                borderRadius="9.745px"
                border="1px solid #000"
                fontFamily="Euclid Circular B"
                onClick={MakePaymentDisclosure.onOpen}
              >
                Pay All
              </Button>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <MakeDividendPayment
        mutation={mutation}
        handleScreen={handleScreen}
        DrawerDisclosure={MakePaymentDisclosure}
        paymentSource={`Unit ${selectedGroup?.id}`}
        initiatePaymentOnSubmit={initiatePaymentOnSubmit}
        payload={{unitId: unitInfo?.id, equityId: selectedGroup?.equityId}}
      />
    </>
  );
};

export default GroupBuyersView;
