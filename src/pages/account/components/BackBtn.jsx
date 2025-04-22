import { useRouter } from 'next/router';
import backArrow from '/src/images/icons/back-arrow.png';
import { Text } from '@chakra-ui/react';
import { Flex, Image } from '@chakra-ui/react';

export const BackBtn = ({name, ...rest}) => {
  const router = useRouter();

  return (
    <Flex
      w="fit-content"
      minW="300px"
      alignItems="center"
      justifyContent="start"
      direction="row"
      onClick={router.back}
      {...rest}
    >
      <Image
        style={{cursor: 'pointer'}}
        mr={2}
        height="50px"
        src={backArrow.src}
        alt="back_arrow"
      />
      <Text color="#191919" fontWeight="800" fontSize="19px" lineHeight="26px">
        {name}
      </Text>
    </Flex>
  );
};

export default BackBtn;
