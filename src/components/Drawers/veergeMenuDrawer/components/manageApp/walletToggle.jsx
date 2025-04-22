import {Button, HStack, Image, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import enableWalletIcon from '/src/images/icons/enableWalletIcon.svg';

export const WalletToggle = ({
  isWalletActive,
  hasAccessToWallet,

  mutation,
}) => {
  const [walletIsLoading, setWalletIsLoading] = useState(false);

  useEffect(() => {
    !mutation.isLoading ? setWalletIsLoading(false) : null;
  }, [mutation.isLoading]);
  const manageAppPatchHandler =
    (param, body = {}) =>
    () => {
      const prop = {
        body,
        param,
      };
      mutation.mutate(prop);
      setWalletIsLoading(true);
    };
  return (
    hasAccessToWallet && (
      <HStack
        width={`100%`}
        padding={`20px 12px`}
        gap={`6px`}
        borderRadius={`4px`}
        border={`1px solid #E4E4E4`}
        background={`#F9FAFB`}
        justify={`space-between`}
        color={`#191919`}
      >
        <Image src={enableWalletIcon.src} boxSize={`20px`} />

        <Text flex={`1`} fontSize={`14px`} color={`#191919`}>
          Wallet
        </Text>
        <Button
          p={`8px 12px`}
          borderRadius={`4px`}
          border={`0.5px solid #191919`}
          borderColor={isWalletActive ? '#FF6A6A' : `#191919`}
          bg={`transparent`}
          _hover={{bg: `transparent`}}
          _active={{bg: `transparent`}}
          _focus={{bg: `transparent`}}
          _focusVisible={{bg: `transparent`}}
          h={`100%`}
          onClick={manageAppPatchHandler(`?wallet_features=${!isWalletActive}`)}
          color={isWalletActive ? `#FF6A6A` : `#191919`}
          isDisabled={walletIsLoading}
        >
          <Text fontSize={`10px`} fontWeight={`400`} lineHeight={`100%`}>
            {isWalletActive ? `Disable` : `Enable`}
          </Text>
        </Button>
      </HStack>
    )
  );
};
