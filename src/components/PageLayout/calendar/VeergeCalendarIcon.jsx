import {HStack, Image, Text, VStack} from '@chakra-ui/react';

export const VeergeCalendarIcon = ({item, isPending, onOpen, btnRef}) => {
  return (
    <VStack opacity={isPending ? 0.8 : 1} position="relative">
      {item?.count > 0 ? (
        <HStack
          position="absolute"
          top="-5%"
          right="10%"
          pt="3.62px"
          pb="2.87px"
          pl="6.03px"
          color="#fff"
          pr="6.46px"
          minW="17.486px"
          minH="17.486px"
          bg="#FF6A6A"
          borderRadius="full"
        >
          <Text fontSize="8.442px" color="#fff" fontWeight="500">
            {item?.count}
          </Text>
        </HStack>
      ) : null}
      <Image
        h={'71.211px'}
        objectFit={'cover'}
        src={item?.image.src}
        alt={item?.text}
        cursor={isPending ? 'not-allowed' : 'pointer'}
        ref={btnRef}
        onClick={isPending ? null : onOpen}
      />
      <Text
        color="#606060"
        textAlign="center"
        fontFamily="Euclid Circular B"
        fontSize="12px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="normal"
        cursor={'pointer'}
        ref={btnRef}
        onClick={onOpen}
      >
        {item?.text}
      </Text>
    </VStack>
  );
};

export default VeergeCalendarIcon;
