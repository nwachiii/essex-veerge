const {Text, HStack, Stack, Flex} = require('@chakra-ui/react');
const {IoArrowBackSharp} = require('react-icons/io5');
const {FormatToColorfulAdaptiveCurrency} = require('utils/formatAmount');
const {changeDateFormat} = require('utils/formatDate');

const Header = ({headerText, onClose}) => (
  <HStack
    boxShadow="0px 3.206px 6.413px 0px rgba(0, 0, 0, 0.02)"
    py="12px"
    bg="#F5F5F5"
    h="49.7px"
    px="23.2px"
    justify="space-between"
    align="center"
    width="full"
  >
    <Flex alignItems="center" gap={2}>
      <IoArrowBackSharp fontSize="20px" cursor="pointer" onClick={onClose} />
      <Text fontSize="20px" fontWeight="600" color="#191919">
        {headerText}
      </Text>
    </Flex>
  </HStack>
);

const BreakdownItem = ({amount, label, date, color}) => (
  <Stack
    w="full"
    border="#e4e4e4 1px solid"
    p="16px"
    spacing="8px"
    borderRadius="8px"
    align="center"
    justifyContent="center"
  >
    <FormatToColorfulAdaptiveCurrency
      amount={amount}
      lens={24}
      color={color}
      maxSize={14}
      baseSize={14}
      minSize={10}
      pow={0.93}
      fontWeight="600"
      decimalStyle={{fontWeight: '600'}}
    />
    <HStack>
      <Text fontSize="10px" color="#606060" fontWeight="400">
        {label}
      </Text>
      {date && (
        <>
          <Text fontSize="10px" color="#606060" fontWeight="400">
            |
          </Text>
          <Text fontSize="10px" color="#606060" fontWeight="400">
            {changeDateFormat(date)}
          </Text>
        </>
      )}
    </HStack>
  </Stack>
);

const FeeItem = ({name, amount}) => (
  <HStack w="full" justify="space-between">
    <Text fontSize="14px" fontWeight="400" color="#3d3d3d" maxW="200px">
      {name}
    </Text>
    <FormatToColorfulAdaptiveCurrency
      amount={amount}
      lens={24}
      color="#191919"
      maxSize={14}
      baseSize={14}
      minSize={10}
      pow={0.93}
      fontWeight="500"
      decimalStyle={{fontWeight: '400'}}
    />
  </HStack>
);

export {Header, BreakdownItem, FeeItem};
