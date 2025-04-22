import {Button, HStack, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {RiAccountPinBoxFill} from 'react-icons/ri';

export const RealtorsPortalToggle = ({
  _isAgentPortalActive,
  _hasAccessToAgents,

  mutation,
}) => {
  const [realtorPortalIsLoading, setRealtorPortalLoading] = useState(false);

  useEffect(() => {
    !mutation.isLoading ? setRealtorPortalLoading(false) : null;
  }, [mutation.isLoading]);

  const manageAppPatchHandler =
    (param, body = {}) =>
    () => {
      const prop = {
        body,
        param,
      };
      mutation.mutate(prop);
      setRealtorPortalLoading(true);
    };

  return (
    _hasAccessToAgents && (
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
        <RiAccountPinBoxFill fontSize={`20px`} />

        <Text flex={`1`} fontSize={`14px`} color={`#191919`}>
          Realtor&apos;s Portal
        </Text>
        <Button
          p={`8px 12px`}
          borderRadius={`4px`}
          border={`0.5px solid #191919`}
          borderColor={_isAgentPortalActive ? '#FF6A6A' : `#191919`}
          bg={`transparent`}
          _hover={{bg: `transparent`}}
          _active={{bg: `transparent`}}
          _focus={{bg: `transparent`}}
          _focusVisible={{bg: `transparent`}}
          h={`100%`}
          onClick={manageAppPatchHandler(`?agent=${!_isAgentPortalActive}`)}
          color={_isAgentPortalActive ? `#FF6A6A` : `#191919`}
          isDisabled={realtorPortalIsLoading}
        >
          <Text fontSize={`10px`} fontWeight={`400`} lineHeight={`100%`}>
            {_isAgentPortalActive ? `Disable` : `Enable`}
          </Text>
        </Button>
      </HStack>
    )
  );
};
