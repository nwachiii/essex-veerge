import React, {useState} from 'react';
import {
  Box,
  Stack,
  Text,
  HStack,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import {Input} from 'ui-lib';
import ContactPerson from '@/components/Drawers/contactPerson';
import Commission from '@/components/Drawers/commission';
import {LuInfo} from 'react-icons/lu';
import { themeStyles } from '/src/theme';

export const Commissions = ({
  setInternalCommission,
  setExternalCommission,
  externalCommission,
  internalCommission,
  checkedContacts,
  handleRemove,
  ADD_CONTACT_PERSONS,
}) => {
  const [commissionType, setCommissionType] = React.useState('manual');
  const commissionInfo = useDisclosure();

  const numberInputOnWheelPreventChange = e => {
    const inputValue = e.target.value;
    const regex = !/^[0-9]+(\.[0-9]+)?$/; // Regular expression to match only positive numbers

    if (
      !regex.test(inputValue) ||
      parseFloat(inputValue) < 0 ||
      /[+\-*/^%]/.test(inputValue) ||
      /[+\-]/.test(inputValue)
    ) {
      e.preventDefault();
      return;
    }

    e.target.blur();
    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  function handleKeyDown(event) {
    // Prevent '-' character
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  function handlePaste(event) {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (pasteData.startsWith('-')) {
      event.preventDefault();
    }
  }

  const handleInputChange = e => {
    const val = e.target.value;
    const name = e.target.name;

    const setValue = () =>
      name === 'internalCommission'
        ? setInternalCommission(Number(val) >= 100 ? 100 : val)
        : name === 'externalCommission'
          ? setExternalCommission(Number(val) >= 100 ? 100 : val)
          : null;

    return setValue();
  };

  return (
    <>
      <Box
        px={6}
        py={3}
        mt={10}
        w="full"
        color="gray.900"
        {...themeStyles.card_container}
      >
        {/* <Box pb={3} mb={3} borderBottom={'1px solid #E5E5E5'}>
        <HStack pb="14px" justify="space-between" w="full">
            <span>
              <Text
                pb={0}
                mb={0}
                textAlign={'left'}
                fontWeight={'600'}
                fontSize={'18px'}
                color="#191919"
              >
                Contact Person
              </Text>
              <Text
                cursor={'pointer'}
                display={'flex'}
                align="center"
                gap="3px"
                textAlign={'left'}
                fontWeight={'400'}
                fontSize={'12px'}
                color="#191919"
                onClick={contactPersonInfo.onOpen}
              >
                <Image boxSize={'24px'} src={learnMoreIcon.src} alt="" />
                <span style={{marginTop: '3px'}}>Learn more</span>
              </Text>
            </span>
            {!(checkedContacts?.length > 0) ? (
              <Button
                variant="dark"
                mt={0}
                onClick={ADD_CONTACT_PERSONS.onOpen}
                height="38px"
                w="104px"
                bg="#191919"
                fontWeight="400"
                color="#FFFFFF"
              >
                Add
              </Button>
            ) : (
              <Button
                variant="dark"
                bg="transparent"
                mt={0}
                onClick={ADD_CONTACT_PERSONS.onOpen}
                height="38px"
                w="104px"
                color="#191919"
                border="1px solid #191919"
              >
                Select
              </Button>
            )}
          </HStack>
          {checkedContacts?.length > 0 ? (
            <>
              {checkedContacts.map((i, idx) => (
                <VStack
                  key={idx}
                  px="14px"
                  align="flex-start"
                  justify="center"
                  mb="24px"
                  w="510px"
                  h="72px"
                  borderRadius="12px"
                  bg="#FFFFFF"
                >
                  <Flex w="full" align="center" justify="space-between">
                    <Box>
                      <Text fontSize={'14px'}>{i?.name}</Text>
                      <Text fontSize={'16px'}>{i?.phone_number}</Text>
                    </Box>
                    <Image
                      cursor={'pointer'}
                      onClick={() => handleRemove(i)}
                      src={removeIcon.src}
                      alt=""
                    />
                  </Flex>
                </VStack>
              ))}
            </>
          ) : null}
        </Box>
        <ContactPerson drawerModal={contactPersonInfo} /> */}
        <Commission drawerModal={commissionInfo} />
        <HStack w="full" justify={'space-between'} align="center" pb="15px">
          <span>
            <Text
              display={'flex'}
              gap={2}
              align={'center'}
              fontWeight={'600'}
              fontSize={'18px'}
              color="#191919"
            >
              <span>Commission</span>
              <Tooltip
                bg="#fff"
                color="#191919"
                label="Learn More"
                borderRadius="16px"
                placement={'top'}
                hasArrow
                aria-label="Learn More"
              >
                <Text
                  fontWeight={'400'}
                  fontSize={'12px'}
                  color="#191919"
                  my={'auto'}
                  cursor={'pointer'}
                  onClick={commissionInfo.onOpen}
                >
                  <LuInfo fontSize={20} color="#606060" />
                </Text>
              </Tooltip>
            </Text>
          </span>
        </HStack>
        {commissionType == 'manual' ? (
          <Stack direction="row" spacing="30px" justify="space-between" w="100%">
            <div>
              <Text pb={2} fontSize="12px" fontWeight="400">
                {`For Internal sales team (%)`}
              </Text>
              <Input
                mx={1}
                noLabel
                min="0"
                type="number"
                pattern="^[0-9]*$"
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                id="internalCommission"
                name="internalCommission"
                value={internalCommission}
                onWheel={numberInputOnWheelPreventChange}
                onChange={handleInputChange}
                border="1px solid lightgray"
                placeholder="3%"
                _placeholder={{
                  color: 'gray.300',
                }}
              />
            </div>
            <div>
              <Text pb={2} fontSize="12px" fontWeight="400">
                {`For External registered realtors (%)`}
              </Text>
              <Input
                mx={1}
                noLabel
                min="0"
                type="number"
                pattern="^[0-9]*$"
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                id="externalCommission"
                name="externalCommission"
                value={externalCommission}
                border="1px solid lightgray"
                onWheel={numberInputOnWheelPreventChange}
                onChange={handleInputChange}
                placeholder="5%"
                _placeholder={{
                  color: 'gray.300',
                }}
              />
            </div>
          </Stack>
        ) : (
          <Stack direction="row" spacing="30px" justify="space-between" w="50%">
            <div>
              <Text fontSize="12px" fontWeight="400">
                Internal sales team
              </Text>
              <Text fontSize={'24px'} py="12px" fontWeight={400}>
                3%
              </Text>
            </div>
            <div>
              <Text fontSize="12px" fontWeight="400">
                External registered realtors
              </Text>
              <Text fontSize={'24px'} py="12px" fontWeight={400}>
                5%
              </Text>
            </div>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Commissions;
