import {Box, Button, HStack, Image, Menu, Stack, Text, useDisclosure} from '@chakra-ui/react';
import arrowIcon from '/src/images/icons/arrow-down.svg';
import uncheckIcon from '/src/images/icons/broadcast-uncheck.svg';
import checkIcon from '/src/images/icons/broadcast-check.svg';

export const InnerMenu = ({item, options, setOptions, menuClose}) => {
  const {isOpen, onToggle} = useDisclosure();
  const handleChoice = (option) => {
    const ifOptionExists = options?.includes(option)
    if (ifOptionExists) {
      setOptions(prev => prev.filter(opt => opt !== option ));
    } else {
      setOptions(prev => [...prev, option]);
    }
  }

  return (
    <>
      <HStack onClick={item?.subOptions?.length ? onToggle: () => handleChoice('Everyone')} w="full" justify="space-between" cursor="pointer">
        <HStack>
          <Image boxSize={'16px'} src={item.leftIcon.src} alt={item.label} />
          <Text>{item.label}</Text>
        </HStack>
        {item?.subOptions?.length ? (
          <Image src={arrowIcon.src} alt="arrow icon" transform={isOpen ? 'rotate(180deg)' : ''} />
        ): <Image
        cursor="pointer"
        src={options?.includes('Everyone') ? checkIcon.src : uncheckIcon.src}
        boxSize="18px"
        alt=""
      />}
      </HStack>
      {isOpen && (
        <Stack p="8px" gap="8px">
          {item?.subOptions?.length ? (
            <>
              {item?.subOptions?.map((option, i) => {
                return (
                  <Box
                    _hover={{bg: '#FFF !important'}}
                    key={i}
                    onClick={() => handleChoice(option)}
                  >
                    <HStack w="full" align="center" justify="space-between">
                      <Text>{option}</Text>
                      <Image
                        cursor="pointer"
                        src={options?.includes(option) ? checkIcon.src : uncheckIcon.src}
                        boxSize="18px"
                        alt=""
                      />
                    </HStack>
                  </Box>
                );
              })}
            </>
          ) : null}
        </Stack>
      )}
    </>
  );
};
