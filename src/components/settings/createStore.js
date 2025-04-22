import {
  Modal,
  Button,
  Image,
  Stack,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import bgImage from '/src/images/create_store_gif.gif';
import {createStoreTab} from '../../constants/settings/createStoreTab';

const CreateStore = ({hasBeenSchedule, business_id, demo_link}) => {
  const create = useDisclosure();
  const [StoreTab, setCreateStoreTab] = useState(
    hasBeenSchedule ? 'viewAfterScheduledMeeting' : 'endToEnd'
  );

  console.log(StoreTab, hasBeenSchedule);

  const forTabs = {
    onClose: create.onClose,
    setCreateStoreTab: setCreateStoreTab,
    business_id,
    demo_link,
    hasBeenSchedule,
  };
  return (
    <>
      <Button
        onClick={create.onOpen}
        bg="transparent"
        borderRadius="12px"
        border="1px solid #ffffff"
        fontWeight="400"
        fontSize="18px"
        h="55px"
        w="199px"
        _hover={{
          opacity: '1',
        }}
        color="#ffffff"
      >
        Get Started
      </Button>

      <Modal
        borderRadius="19.308px"
        // isCentered
        isOpen={create.isOpen}
        onClose={() => (
          setCreateStoreTab(hasBeenSchedule ? 'viewAfterScheduledMeeting' : 'endToEnd'),
          create.onClose()
        )}
      >
        <ModalOverlay />
        <ModalContent mt="20vh" minW="767px" minH="fit-content" borderRadius="19.308px" p="0px">
          <ModalCloseButton color="#ffffff" />
          <ModalBody h="full" p="0px">
            <Stack
              borderRadius="19.308px 19.308px 0 0"
              w="full"
              h="287px"
              bg="#4545FE"
              align="center"
              justify="center"
            >
              <Image
                h="287px"
                w="500px"
                alt="create store image gif"
                objectFit="cover"
                objectPosition="0px 37%"
                src={bgImage.src}
              />
            </Stack>
            {createStoreTab[StoreTab](forTabs)}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateStore;
