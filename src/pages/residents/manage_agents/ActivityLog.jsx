import {useEffect} from 'react';
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {activityLog} from 'apis/account';
import {generateID} from 'utils/generateId';
import ActivityLogList from '@/components/Drawers/activitylogDrawer/ActivityLogList';

const ActivityLog = ({isOpen, onClose, id}) => {
  const {data, refetch, isLoading, isError, error} = useQuery(['activity-log', id], () =>
    activityLog({id})
  );

  const log = data?.data?.data;

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent position="relative" zIndex={100} mt="65.12px" minW="450px" bg="#fff" p="0px">
          <HStack
            py="30px"
            h="49.699px"
            bg="#F5F5F5"
            px="25px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Activity Log
            </Heading>
            <HStack spacing="15px">
              <VStack
                position="relative"
                justify="center"
                align="center"
                w="30px"
                h="30px"
                borderRadius="5px"
                transition="0.3s ease-in-out"
                _hover={{
                  width: '30px',
                  height: '30px',
                }}
              >
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody marginTop="1rem" padding="0">
            <ActivityLogList data={data} isLoading={isLoading} isError={isError} error={error} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ActivityLog;
