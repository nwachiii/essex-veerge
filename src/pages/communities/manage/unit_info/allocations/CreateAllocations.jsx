import {useRouter} from 'next/router';
import {useState} from 'react';
import {Button} from 'ui-lib/ui-lib.components';
import greenSwap from '/src/images/icons/swap-green.svg';
import blueSwap from '/src/images/icons/swap-blue.svg';
import starIcon from '/src/images/icons/orangeStar.svg';

import {
  Box,
  Image,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  Input,
  useToast,
  Spinner,
  Flex,
  Stack,
  Link,
  ModalFooter,
} from '@chakra-ui/react';
import infoIcon from '/src/images/icons/Info-circle.svg';
import bulbIcon from '/src/images/icons/bulbBlue.svg';
import {formatAmount, formatAmountWithDecimal} from 'utils';
import {formatToCurrency} from 'utils/formatAmount';

export const CreateAllocations = ({unitInfo, CREATE_ALLOCATIONS_MODAL}) => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [milestoneInput, setMilestoneInput] = useState(null);
  const {isOpen: isSecondOpen, onOpen: onSecondOpen, onClose: onSecondClose} = useDisclosure();

  const handleSelectAllocationType = arg => {
    CREATE_ALLOCATIONS_MODAL.onClose();
    localStorage.setItem('allocations_type', JSON.stringify(arg));
    onSecondOpen();
  };

  const handlePaymentMilestone = () => {
    localStorage.setItem('allocations_milestone', JSON.stringify(milestoneInput));
    milestoneInput && setIsLoading(true);
    milestoneInput
      ? router.push(
          `/listings/manage/allocations?unit_id=${unitInfo?.id}&qty=${unitInfo?.total_quantity}&archive=${unitInfo?.total_archive}`
        )
      : toast({
          title: 'Please enter a milestone for this allocation',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
  };

  const MILESTONE_TARGET_AMOUNT = unitInfo
    ? formatToCurrency(Number((milestoneInput / 100) * unitInfo?.price))
    : null;

  const UNIT_PRICE = unitInfo ? formatToCurrency(Number(unitInfo?.price)) : 'unit price';

  return (
    <div>
      <HStack justify="space-between" borderRadius="18px" px={''} alignItems="center">
        {unitInfo?.has_allocations ? (
          <Flex
            borderRadius="8px"
            background="#F9FAFB"
            align="center"
            justify={'space-between'}
            w="full"
            fontFamily="Euclid Circular B"
            gap={`20px`}
            border={`.5px solid`}
            borderColor={`#e4e4e4`}
            p={`16px`}
          >
            <Stack maxW={`270px`} gap={`4px`}>
              <Text fontSize={`16px`} fontWeight={`600`}>
                Unit Allocation
              </Text>
              <Text fontSize={'12px'} fontWeight={`400`} color={'#3D3D3D'}>
                {`Subscribers become eligible once they’ve reached ${unitInfo?.allocation_milestone}% of payment milestone`}
              </Text>
            </Stack>
            <Link href={`/listings/manage/unit_info/allocations/manage/?id=${unitInfo?.id}`}>
              <Button
                bg="#191919"
                color="#FFFFFF"
                variant="secondary"
                w="max-content"
                height="max-content"
                fontSize={`14px`}
                fontWeight={`400`}
                lineHeight={`normal`}
                p={`10px`}
                borderRadius={`72px`}
                m={`0px`}
              >
                Manage
              </Button>
            </Link>
          </Flex>
        ) : (
          <Flex
            w="full"
            align="center"
            borderRadius="8px"
            background="#F9FAFB"
            justify={'space-between'}
            fontFamily="Euclid Circular B"
            gap={`20px`}
            border={`.5px solid`}
            borderColor={`#e4e4e4`}
            p={`16px`}
          >
            <Stack maxW={`270px`} gap={`4px`}>
              <Text fontSize={`16px`} fontWeight={`600`}>
                Unit Allocation
              </Text>
              <Text color="#3D3D3D" fontWeight={400} fontSize="12px">
                {`Allocation has not been created for this unit yet`}
              </Text>{' '}
            </Stack>
            <Button
              bg="#191919"
              color="#FFFFFF"
              variant="secondary"
              w="max-content"
              height="max-content"
              fontSize={`14px`}
              fontWeight={`400`}
              lineHeight={`normal`}
              p={`10px`}
              borderRadius={`72px`}
              m={`0px`}
              onClick={CREATE_ALLOCATIONS_MODAL.onOpen}
            >
              Create
            </Button>
          </Flex>
        )}
      </HStack>
      <Modal
        isCentered
        h="636px"
        isOpen={CREATE_ALLOCATIONS_MODAL.isOpen}
        onClose={CREATE_ALLOCATIONS_MODAL.onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="754px" borderRadius="16px">
          <HStack w={'full'} justify={'space-between'} align={'center'}>
            <ModalHeader textTransform="capitalize" pt="20px" pb="0" fontSize={'24px'} flex={1}>
              Select allocation type
            </ModalHeader>
            <HStack gap={2} pr={4} pt={'20px'}>
              <ModalCloseButton fontSize="16x" position={'unset'} />
            </HStack>
          </HStack>
          <ModalBody pt="26px" pb="24px" px="31" h="max-content">
            <HStack spacing="24px" justify={'space-between'} align={'stretch'}>
              <Box
                cursor={'pointer'}
                onClick={() => handleSelectAllocationType('auto')}
                borderRadius="8px"
                border="1px solid #F5F5F5"
                background="#FAFAFA"
                display="flex"
                // width="692px"
                pos="relative"
                padding="16px"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gap="16px"
                h="200px"
              >
                <HStack
                  position="absolute"
                  top="16px"
                  right="16px"
                  spacing="8px"
                  borderRadius="16px"
                  bg="rgba(255, 145, 3, 0.10)"
                  h="23px"
                  px="8px"
                >
                  <Image boxSize="12px" src={starIcon.src} alt="star icon" />
                  <Text fontSize="12px" fontWeight="400" lineHeight="15.22px" color="#FF9103">
                    Recommended
                  </Text>
                </HStack>
                <Image boxSize="32px" src={greenSwap.src} alt="" />
                <Text
                  color="#191919"
                  fontFamily="Euclid Circular B"
                  fontSize="18px"
                  font-style="normal"
                  fontWeight="600"
                >
                  Smart Allocation
                </Text>
                <Text
                  color="#606060"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  font-style="normal"
                  fontWeight="400"
                >
                  A buyer can select an unallocated available unit after reaching a certain payment
                  milestone and it will be allocated in Real time without permission.
                </Text>
              </Box>
              <Box
                cursor={'pointer'}
                onClick={() => handleSelectAllocationType('manual')}
                borderRadius="8px"
                border="1px solid #F5F5F5"
                background="#FAFAFA"
                display="flex"
                // width="692px"
                padding="16px"
                flexDirection="column"
                justifyContent="start"
                alignItems="flex-start"
                gap="10px"
                minW="316.5px"
              >
                <Image boxSize="32px" src={blueSwap.src} alt="" />
                <Text
                  color="#191919"
                  fontFamily="Euclid Circular B"
                  fontSize="18px"
                  font-style="normal"
                  fontWeight="600"
                >
                  Manual Allocation
                </Text>
                <Text
                  color="#606060"
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  font-style="normal"
                  fontWeight="400"
                >
                  You will allocate units to buyers manually.
                </Text>
              </Box>
            </HStack>
          </ModalBody>
          <ModalFooter pt={0} pb="24px">
            <Link
              href={`https://veerge-support.myxellia.io/listings/overview#allocations`}
              target="_blank"
              textDecoration={'none'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <HStack
                p="0px"
                gap="8px"
                h="fit-content"
                color="#4545FE"
                fontSize="15px"
                fontWeight="400"
                m={0}
                textDecoration={'none'}
              >
                <Image src={bulbIcon.src} boxSize="16.185px" alt="bulb" />
                <Text textDecoration={'none'}>Learn more</Text>
              </HStack>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isCentered h="636px" isOpen={isSecondOpen} onClose={onSecondClose}>
        <ModalOverlay />
        <ModalContent maxW="39.5rem" borderRadius="16px">
          <HStack w={'full'} justify={'space-between'} align={'center'} px={2} pt={'5px'}>
            <ModalHeader
              fontWeight="700"
              fontSize="32px"
              lineHeight="41px"
              pt="20px"
              pb="0"
              flex={1}
            >
              Payment milestone
            </ModalHeader>
            <ModalCloseButton autoFocus="off" position={'relative'} />
          </HStack>
          <ModalBody pt="5px" pb="31px" px="31">
            <VStack width="100%" spacing="8px" align={'center'} pb={'10px'}>
              <Box w="full">
                <Text
                  mt="14px"
                  pb={milestoneInput ? '20px' : '35px'}
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="18px"
                >
                  At what payment milestone do you want allocation to take place
                </Text>
              </Box>

              <Input
                h="65px"
                color="#191919"
                w="full"
                borderRadius="10px"
                type="number"
                id="allocation_milestone"
                name="allocation_milestone"
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || (value <= 100 && value >= 1)) {
                    setMilestoneInput(value);
                  }
                }}
                value={milestoneInput}
                fontSize={'16px'}
                placeholder="Payment milestone (%)"
                max={3}
                border={'1px solid #191919'}
                px={8}
              />

              {milestoneInput ? (
                <Flex className="fade-in-animation" gap="4px" mt={4} alignItems="flex-start">
                  <Image alt="" filter="brightness(0) invert(0.65)" src={infoIcon.src} />
                  <Text
                    color="#606060"
                    fontFamily="Euclid Circular B"
                    fontSize="12px"
                    fontWeight="400"
                  >
                    {'This means when '}
                    {milestoneInput}
                    {'% ('}
                    <b>{MILESTONE_TARGET_AMOUNT}</b>
                    {') out of '}
                    <b>{UNIT_PRICE}</b>
                    {' has been paid for '}
                    {unitInfo?.unit_title}
                    {', A property subscriber will be eligible for allocation.'}
                  </Text>
                </Flex>
              ) : null}

              <Button
                isDisabled={!milestoneInput}
                onClick={handlePaymentMilestone}
                mt="23px"
                variant="primary"
                height="55px"
                w="full"
                maxW="unset"
                bg="#4545FE"
                borderRadius="72px"
              >
                {isLoading == true ? <Spinner color="white" /> : 'Proceed'}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateAllocations;
