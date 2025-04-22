import {HStack, Heading, Image, Stack, Text, VStack, useBoolean} from '@chakra-ui/react';
import React from 'react';
import {Toggle} from '../../../../../ui-lib/ui-lib.components/toggle';
import infoCircle from '/src/images/icons/manageAppInfoIcon.svg';
import joinBetaIcon from '/src/images/icons/starsIconForJoinBeta.svg';
import joinedBetaIcon from '/src/images/icons/joinedBetaIcon.svg';

export const CustomiseApp = ({
  _isCoownershipActive,
  _isAgentPortalActive,
  _isSmartplanActive,
  _isSecondaryMarketActive,
  navToTermsOfService,
  _hasAccessToAgents,
  manageAppPatchHandler,
}) => {
  const [_SWITCH, setSwitch] = useBoolean();

  return _hasAccessToAgents ? (
    <Stack spacing="8px" w="full">
      <Heading fontSize="12px" color="#191919" fontWeight="300">
        Customise your application features to suit your preferences.
      </Heading>
      <VStack
        bg={'#F9FAFB'}
        border="1px solid #E4E4E4"
        borderRadius="12px"
        spacing="18.48px"
        justify={'start'}
        w="full"
        p="12px"
      >
        {/* <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="14px" fontWeight="400" color="#191919">
              Co-ownership
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#919191" fontSize="10px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <Toggle
            value={_isCoownershipActive}
            onChange={manageAppPatchHandler(`?co_ownership=${!_isCoownershipActive}`)}
          />
        </HStack> */}
        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="14px" fontWeight="400" color="#191919">
              {" Realtor's portal"}
            </Heading>
            <HStack
              onClick={() =>
                window.open('https://veerge-support.myxellia.io/agent/portal', '_blank')
              }
              spacing="5px"
            >
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#919191" fontSize="10px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <Toggle
            value={_isAgentPortalActive}
            onChange={manageAppPatchHandler(`?agent=${!_isAgentPortalActive}`)}
          />
        </HStack>

        {/* <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="14px" fontWeight="400" color="#191919">
              Smart Payment Plan
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#919191" fontSize="10px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <HStack
            h="full"
            spacing="5.89px"
            cursor={!_isSmartplanActive ? 'pointer' : 'default'}
            onClick={
              !_isSmartplanActive ? navToTermsOfService('termsofService', '?smart_plan=true') : null
            }
          >
            <Image
              alt="learn more icon"
              src={(!_isSmartplanActive ? joinBetaIcon : joinedBetaIcon).src}
            />
            <Text
              fontSize="10px"
              fontWeight="500"
              color={!_isSmartplanActive ? '#4545FE' : '#242526'}
            >
              {!_isSmartplanActive ? 'Join Beta' : 'waitlist Joined'}
            </Text>
          </HStack>
        </HStack>
        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="14px" fontWeight="400" color="#191919">
              Secondary Market
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#919191" fontSize="10px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <HStack
            h="full"
            spacing="5.89px"
            cursor={!_isSecondaryMarketActive ? 'pointer' : 'default'}
            onClick={
              !_isSecondaryMarketActive
                ? navToTermsOfService('termsofService', '?smart_plan=true')
                : null
            }
          >
            <Image
              alt="learn more icon"
              src={(!_isSecondaryMarketActive ? joinBetaIcon : joinedBetaIcon).src}
            />
            <Text
              fontSize="10px"
              fontWeight="500"
              color={!_isSecondaryMarketActive ? '#4545FE' : '#242526'}
            >
              {!_isSecondaryMarketActive ? 'Join Beta' : 'waitlist Joined'}
            </Text>
          </HStack>
        </HStack> */}
      </VStack>
    </Stack>
  ) : null;
};

export default CustomiseApp;
