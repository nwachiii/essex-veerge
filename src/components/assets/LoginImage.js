import {Flex, Stack, Image} from '@chakra-ui/react';
import frame_1 from '../../images/frame_1.png';
import frame_2 from '../../images/frame_2.png';
import frame_3 from '../../images/frame_3.png';
import frame_4 from '../../images/frame_4.png';

export const LoginImage = () => {
  return (
    <Stack
      direction="row"
      gap={6}
      minH="520px"
      h="fit-content"
      my="auto"
      display={{base: 'none', lg: 'flex'}}
      mr="66px"
    >
      <Stack gap={8} alignItems="flex-end" direction="column" justifyContent="center">
        <Image maxW={398} minH={218} src={frame_1.src} alt="frame_1" />
        <Image maxW={69} minH={67} src={frame_4.src} alt="frame_4" />
      </Stack>
      <Flex direction="column" justifyContent="space-between">
        <Image maxW={334} minH={212} src={frame_2.src} alt="frame_2" />
        <Image minH={189} minW={253} src={frame_3.src} alt="frame_3" />
      </Flex>
    </Stack>
  );
};
