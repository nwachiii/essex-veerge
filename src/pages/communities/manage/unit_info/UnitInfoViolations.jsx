import {Text, Flex, Stack, Image} from '@chakra-ui/react';
import {themeStyles} from '../../../../theme';
import {lightenHex} from 'utils/lightenHEx';
import infoIcon from '/src/images/icons/infoIconForDrawer.svg';
import {LuDot} from 'react-icons/lu';

const UnitInfoViolations = () => {
  return (
    <Stack gap="16px" mt="36px">
      <Flex w="full" justify="space-between">
        <Text
          gap="15px"
          fontSize="33px"
          color="#191919"
          fontWeight={500}
          lineHeight="30.43px"
          alignContent="center"
          mb="12px"
        >
          Violations
        </Text>
      </Flex>
      <Flex
        {...themeStyles.containerStyles}
        padding="13px 20px"
        maxW="100%"
        gap={{base: '16px', xl: '24px'}}
        alignItems="stretch"
      >
        {listViolations.map((violation, index) => {
          return (
            <Stack
              key={index}
              border="0.5px solid #E4E4E7"
              bg="#FBFCFC"
              p="12px"
              rounded="8px"
              maxW="256px"
              justify="space-between"
              flexGrow={1}
              flexBasis={0}
            >
              <Flex gap="8px" alignItems="center">
                <Flex
                  align="center"
                  justify="center"
                  p="10px"
                  boxSize="36px"
                  border="0.5px solid #E4E4E7"
                  bg="#FFF"
                  rounded="full"
                >
                  <Image src={infoIcon.src} alt={violation.name} />
                </Flex>
                <Text fontSize="15px" fontWeight={500}>
                  {violation.name}
                </Text>
              </Flex>
              <Text
                bg={lightenHex(90, violation.status.color)}
                color={violation.status.textColor ?? violation.status.color}
                p="2px 8px"
                rounded="20px"
                gap="8px"
                maxW="max-content"
                fontSize="14px"
                fontWeight={500}
                fontFamily="Inter"
                letterSpacing="0.26px"
              >
                {violation.status.text}
              </Text>
              <Flex align="center" gap="2px">
                <Text textTransform="uppercase" fontSize="12px" color="#52525B" fontWeight={500}>
                  {violation?.id}
                </Text>
                <LuDot />
                <Text fontSize="12px" color="#000" fontWeight={500}>
                  {violation?.date}
                </Text>
              </Flex>
            </Stack>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default UnitInfoViolations;

const listViolations = [
  {
    name: 'Trash Can',
    date: '20 APR',
    id: 'V - 1432',
    status: {
      text: 'Cured',
      color: '#116932',
      // textColor: '#13618F',
    },
  },
  {
    name: 'Late Night Noise',
    date: '22 APR',
    id: 'V - 1425',
    status: {
      text: 'Fined',
      color: '#991919',
      // textColor: '#13618F',
    },
  },
];
