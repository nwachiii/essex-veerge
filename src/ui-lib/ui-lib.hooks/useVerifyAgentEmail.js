import {useDisclosure} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {verifyAgentEmail} from 'apis/manageAgent';
import React, {useEffect, useRef, useState} from 'react';

export const useVerifyAgentEmail = ({
  setIsAgentEmail,
  fieldName,
  setFieldValue,
  index,
  defaultEmail,
  defaultName,
  preventSubmissionWhenEmpty,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [agentName, setAgentName] = useState(defaultName);
  const {onToggle, onOpen, isOpen} = useDisclosure();
  const mutationTimeout = useRef(null);

  const {refetch, isError, isLoading, data} = useQuery(
    [email, 'verify-agent-email'],
    () => verifyAgentEmail(email),
    {
      retry: 0,
      enabled: false,
    }
  );

  const updateAgentEmailState = value => prev => {
    const updatedState =
      index === null
        ? {...prev, ...value}
        : (() => {
            const newState = [...prev];
            newState[index] = {...prev[index], ...value};
            return newState;
          })();

    return updatedState;
  };

  useEffect(() => {
    const agentInfo = data?.data;

    if (isError) {
      setFieldValue(fieldName, null);
      setAgentName('');
      setIsAgentEmail(updateAgentEmailState({available: false, loading: false}));
    } else if (!isLoading && agentInfo) {
      setIsAgentEmail(updateAgentEmailState({available: true, loading: false}));
      setFieldValue(fieldName, agentInfo?.id ?? null);

      setAgentName(`${agentInfo?.first_name ?? ''} ${agentInfo?.last_name ?? ''}`);
    }
  }, [isError, isLoading]);

  const toggleAgentEmail = () => {
    setIsAgentEmail(updateAgentEmailState({available: isOpen, loading: false}));

    onToggle();

    setEmail('');

    setAgentName('');

    return setFieldValue(fieldName, null);
  };

  const handleReset = () => {
    setIsAgentEmail(
      updateAgentEmailState({available: preventSubmissionWhenEmpty ? false : true, loading: false})
    );

    setEmail('');

    setAgentName('');

    return setFieldValue(fieldName, null);
  };

  const handleInput = event => {
    const value = event.target.value;
    setEmail(value);

    if (value !== email) {
      clearTimeout(mutationTimeout.current);
    }
    if (value.trim() === '') {
      setIsAgentEmail(
        updateAgentEmailState({
          available: preventSubmissionWhenEmpty ? false : true,
          loading: false,
        })
      );
      setAgentName('');
      setFieldValue(fieldName, null);
    } else {
      setIsAgentEmail(updateAgentEmailState({loading: true}));
      mutationTimeout.current = setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  return {
    agentName,
    onOpen,
    handleInput,
    toggleAgentEmail,
    handleReset,
    isOpen,
    isError,
    email,
  };
};
