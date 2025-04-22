import {Stack, Flex, Skeleton} from '@chakra-ui/react';

export const GraphLoader = ({height, ...rest}) => {
  return (
    <Stack
      w="100%"
      justifySelf="end"
      spacing="2px"
      pb="10px"
      h={height ?? '165px'}
      justifyContent="flex-end"
      px="10px"
      {...rest}
    >
      <Flex
        h="80%"
        gap="15px"
        align="end"
        borderLeft="1px solid #E9E9E9"
        borderBottom="1px solid #E9E9E9"
        pl={4}
      >
        <Skeleton width="7px" height="20%" />
        <Skeleton width="7px" height="30%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="50%" />
        <Skeleton width="7px" height="73%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="27%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="78%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="48%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="78%" />
        <Skeleton width="7px" height="full" />
        <Skeleton width="7px" height="48%" />
        <Skeleton width="7px" height="80%" />
        <Skeleton width="7px" height="48%" />
      </Flex>
      <Skeleton width="full" height="20px" />
    </Stack>
  );
};
