import {useState} from 'react';
import {HStack, Image, Text, useDisclosure} from '@chakra-ui/react';
import avatar from '/src/images/avatar.svg';

import RealtorDrawer from '@/components/Drawers/realtorDrawer';

const CommissionAgentDrawer = ({info, text}) => {
  const agentsDrawer = useDisclosure();
  const [agentId, setAgentId] = useState();
  const [runQuery, setRunQuery] = useState(false);

  const OpenAgentModal = item => {
    agentsDrawer.onOpen();
    setAgentId(item);
    setRunQuery(true);
  };

  return (
    <>
      {/* <HStack spacing="10px" cursor="pointer" onClick={() => OpenAgentModal(info?.agent?.id)}>
        <Image
          alt="avatar"
          borderRadius="full"
          boxSize="47.29px"
          src={info?.agent?.avatar ?? avatar.src}
        />
        <Text
          as="span"
          w="fit-content"
          whiteSpace="break-spaces"
          textAlign="start"
          textTransform="capitalize"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          _hover={{textDecoration: 'underline'}}
          cursor="pointer"
        >
          {`${info?.agent?.first_name} ${info?.agent?.last_name}`}
        </Text>
      </HStack> */}

      <Text
        as="span"
        color="#4545FE"
        cursor="pointer"
        _hover={{textDecoration: 'underline'}}
        onClick={() => OpenAgentModal(info?.agent?.id)}
        textTransform="capitalize"
      >
        {' '}
        {text}
      </Text>

      <RealtorDrawer modalDisclosure={agentsDrawer} agentId={agentId} runQuery={runQuery} />
    </>
  );
};

export default CommissionAgentDrawer;
