import {Button, HStack, Image, Stack, Text} from '@chakra-ui/react';
import addIcon from '/src/images/icons/addIcon.svg';
import cancelIcon from '/src/images/icons/cancelIconRequest.svg';

import {FormatToColorfulCurrency} from 'utils/formatAmount';
import AddIcon from '@/components/assets/addIcon';

export const DisplayClosingCost = ({values, handleScreen, setFieldValue, scrollStyle}) => {
  const deleteClosingCost = index => {
    const filteredClosingCostArray = values.closing_costs.filter((item, idx) => item.id !== index);
    return setFieldValue('closing_costs', filteredClosingCostArray);
  };
  return (
    <>
      <HStack mb="1px" justify="space-between" w="full">
        <Text fontSize="14px" fontWeight="500" color="#191919">
          Does this unit come with a{' '}
          <Text as="span" color="#4545FE">
            closing costs
          </Text>{' '}
          option?
        </Text>

        <Button
          bg="#ffffff"
          // border="1px solid #4545FE"
          // color="#4545FE"
          variant="md-outline-radius"
          borderColor="#a3a3a3"
          fontSize="12px"
          fontWeight="400"
          w="fit-content"
          type="button"
          p="9.7px 9.71px"
          h="33.1px"
          _hover={{
            opacity: '1',
            boxShadow: 'none',
          }}
          _focus={{
            opacity: '1',
          }}
          _active={{
            opacity: '1',
          }}
          // borderRadius="6.85px"
          onClick={() => handleScreen('setClosingCost')}
          leftIcon={
            <AddIcon alignSelf="center" alt="add icon" src={addIcon.src} boxSize="13.69px" />
          }
          iconSpacing="11.42px"
          // color="#191919"
        >
          Add
        </Button>
      </HStack>
      {values?.closing_costs?.length ? (
        <Stack spacing="12px" mt="16px" maxH="150px" py="4px" overflowY="scroll" sx={scrollStyle}>
          {values?.closing_costs.map((item, idx) => {
            return (
              <HStack
                p="12.61px"
                key={idx}
                justify="space-between"
                w="full"
                bg="#F5F5F5"
                borderRadius="12.613px"
              >
                <Text fontSize="12px" fontWeight="400" color="#3D3D3D">
                  {item?.name}
                </Text>
                <HStack spacing="12.61px">
                  <FormatToColorfulCurrency
                    amount={item?.amount}
                    decimalStyle={{color: '#919191', fontSize: '11.036px'}}
                    fontSize="11.036px"
                    fontWeight="500"
                  />

                  <Image
                    src={cancelIcon.src}
                    cursor="pointer"
                    onClick={() => deleteClosingCost(item.id)}
                    alt="cancel icon "
                    boxSize="18.9px"
                  />
                </HStack>
              </HStack>
            );
          })}
        </Stack>
      ) : null}
    </>
  );
};

export default DisplayClosingCost;
