import {STOREINFOQUERYKEY} from '@/components/PageLayout/VeergeFeatureMenu';
import {useQueryClient} from '@tanstack/react-query';

export const useIsGatewayDisabled = () => {
  const queryClient = useQueryClient();

  const isGateWayDisabled = queryClient.getQueryData(STOREINFOQUERYKEY)?.data?.gateway_disabled;
  return isGateWayDisabled;
};
