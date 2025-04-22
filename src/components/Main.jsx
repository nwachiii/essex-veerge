import {Flex, Heading} from '@chakra-ui/react';
import {useEffect} from 'react';
import {DarkModeSwitch} from './DarkModeSwitch';

export function Main({title, aside}) {
  useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
      h="full"
      maxW={900}
    >
      <Heading fontSize="7vw" align="center">
        {title}
      </Heading>
      <Heading mt={4} fontSize="2vw" alignSelf="flex-end">
        {aside}
      </Heading>
      <DarkModeSwitch />
    </Flex>
  );
}

Main.defaultProps = {
  title: 'Veerge for Property Developers',
  aside: '=> Admin dashboard',
};
